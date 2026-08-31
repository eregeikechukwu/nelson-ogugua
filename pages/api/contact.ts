import type { NextApiRequest, NextApiResponse } from "next";
// @ts-expect-error nodemailer doesnt have any type definitions
import nodemailer from "nodemailer";

// ---- Types -----------------------------------------------------------
interface ContactRequestBody {
  firstName?: string;
  lastName?: string;
  email?: string;
  message?: string;
  // Honeypot field: a real user never fills this in (it's hidden via CSS
  // on the frontend). Bots that auto-fill every input will trip it.
  website?: string;
}

interface ApiResponse {
  message: string;
}

// ---- Very lightweight in-memory rate limiter --------------------------
// Caveat: this only works per serverless-function *instance*. On Vercel/
// most serverless hosts, cold starts and multi-region deployment mean this
// resets often and isn't shared across instances. It stops the most naive
// spam-bot loops, but for real protection at scale, swap this for a
// durable store (Upstash Redis, Vercel KV) or add hCaptcha/reCAPTCHA on
// the frontend instead. Keeping it in-memory here so the file has zero
// extra infra dependencies to get you started.
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  entry.count += 1;
  return entry.count > RATE_LIMIT_MAX_REQUESTS;
}

// ---- Validation --------------------------------------------------------
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Newlines in any field that ends up in an email header (from, subject)
// let an attacker inject extra headers (e.g. "Bcc: spamlist@x.com") --
// this is the classic "email header injection" vulnerability. Reject
// any control characters outright rather than trying to strip them.
const HEADER_INJECTION_PATTERN = /[\r\n]/;

function validateBody(body: ContactRequestBody): string | null {
  const { firstName, lastName, email, message, website } = body;

  // Honeypot tripped -> silently pretend success so the bot doesn't learn
  // its submission was rejected and try to adapt.
  if (website) return "HONEYPOT";

  if (
    !firstName?.trim() ||
    !lastName?.trim() ||
    !email?.trim() ||
    !message?.trim()
  ) {
    return "All fields are required";
  }

  // Only check fields that actually end up in email HEADERS (from, subject).
  // `message` goes into the email body text, where newlines are normal and
  // expected -- checking it here was a false positive that blocked anyone
  // writing more than one line/paragraph.
  if (
    [firstName, lastName, email].some((f) => HEADER_INJECTION_PATTERN.test(f))
  ) {
    return "Invalid characters in submission";
  }

  if (!EMAIL_REGEX.test(email)) {
    return "Enter a valid email address";
  }

  // Cap lengths -- prevents someone from POSTing a multi-MB "message" to
  // waste your email-sending quota / storage, and guards against basic
  // payload-size abuse before it ever reaches nodemailer.
  if (firstName.length > 60 || lastName.length > 60) {
    return "Name is too long";
  }
  if (message.length > 3000) {
    return "Message is too long";
  }

  return null; // valid
}

// ---- Handler -----------------------------------------------------------
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>,
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ message: "Method not allowed" });
  }

  // Fail fast with a clear error if env vars are missing, instead of
  // letting nodemailer throw a confusing low-level auth error later.
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error("Missing EMAIL_USER or EMAIL_PASS environment variables");
    return res.status(500).json({ message: "Server is misconfigured" });
  }

  // Basic IP-based rate limiting. `x-forwarded-for` is how most hosting
  // platforms (Vercel, etc.) pass the real client IP through proxies.
  const ip =
    (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() ||
    req.socket.remoteAddress ||
    "unknown";

  if (isRateLimited(ip)) {
    return res
      .status(429)
      .json({ message: "Too many requests. Please try again shortly." });
  }

  const body = req.body as ContactRequestBody;
  const validationError = validateBody(body);

  if (validationError === "HONEYPOT") {
    // Return a fake success so bots don't get a signal to adjust their approach.
    return res.status(200).json({ message: "Email sent successfully!" });
  }
  if (validationError) {
    return res.status(400).json({ message: validationError });
  }

  const { firstName, lastName, email, message } = body;

  try {
    // Only log the essentials, and only outside production -- avoid
    // writing user PII (full message content, email) into production
    // logs, which is both a privacy concern and often against your
    // hosting provider's data-handling terms.
    if (process.env.NODE_ENV !== "production") {
      console.log("Contact form submission from:", email);
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
    });

    const mailOptions = {
      // Use your own authenticated address as `from` -- Gmail (and most
      // providers) will often silently rewrite or reject a `from` set to
      // an arbitrary external address anyway, since it looks like spoofing
      // to SPF/DKIM checks. `replyTo` is the correct place to put the
      // visitor's email so you can just hit "Reply" to respond to them.
      from: `"Website Contact Form" <${process.env.EMAIL_USER}>`,
      replyTo: email,
      to: process.env.EMAIL_USER,
      subject: `New contact form submission from ${firstName} ${lastName}`,
      text: `Name: ${firstName} ${lastName}\nEmail: ${email}\nMessage: ${message}`,
    };

    // Guard against the request hanging forever if the SMTP connection
    // stalls -- without this, a network hiccup could leave the serverless
    // function running (and billing) until the platform's own timeout.
    const SEND_TIMEOUT_MS = 10_000;
    await Promise.race([
      transporter.sendMail(mailOptions),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("EMAIL_TIMEOUT")), SEND_TIMEOUT_MS),
      ),
    ]);

    return res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    // Log the real error server-side for debugging, but never leak
    // internal error details (stack traces, SMTP responses, etc.) to
    // the client -- that can expose infrastructure details to attackers.
    console.error("Error sending email:", error);

    const err = error instanceof Error ? error : new Error(String(error));
    const isTimeout = err.message === "EMAIL_TIMEOUT";
    const isNetworkIssue = /ECONNREFUSED|ETIMEDOUT|ENOTFOUND/.test(err.message);

    return res.status(500).json({
      message:
        isTimeout || isNetworkIssue
          ? "Email service is temporarily unavailable. Please try again shortly."
          : "Something went wrong. Please try again later.",
    });
  }
}

// Keep the default body size limit reasonable -- prevents someone from
// sending an oversized payload to waste compute/bandwidth. 100kb is
// generous for a contact form (name + email + a long message).
export const config = {
  api: {
    bodyParser: {
      sizeLimit: "100kb",
    },
  },
};
