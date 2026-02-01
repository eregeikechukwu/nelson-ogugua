import { createTransport } from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not Allowed" });
  }

  const { firstName, lastName, email, message } = req.body;

  if (!firstName || !lastName || !email || !message) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    //Create a transporter using your email provider's SMIP settings
    const transporter = createTransport({
      service: "gmail",
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
    });

    //Email OPtions
    const mailOptions = {
      from: email,
      to: process.env.EMAIL_USER,
      subject: `A contact form submission from ${firstName} ${lastName},`,
      text: `Name: ${firstName} ${lastName}\nEmail: ${email}\nMessage: ${message}`,
    };

    //Send email
    await transporter.sendMail(mailOptions);

    return res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email: ", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

///Successful Email Functionality. 💪💪✝️
