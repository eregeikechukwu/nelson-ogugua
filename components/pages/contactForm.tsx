"use client";

import { FormEvent, useState } from "react";
import { Title } from "../secondary/title";
import { SubmitButton } from "../secondary/button";
import { FormData, FormError } from "@/app/types";
import { InputField } from "../secondary/inputField";

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });
  const [error, setError] = useState<FormError>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const clearFieldError = (field: keyof FormError) => {
    setError((prev) => (prev ? { ...prev, [field]: null } : prev));
  };

  function validateData(data: FormData): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const newErrors: FormError = {};
    let isValid = true;

    if (!data.firstName.trim()) {
      newErrors.firstName = "Please enter your first name.";
      isValid = false;
    }
    if (!data.lastName.trim()) {
      newErrors.lastName = "Please enter your last name.";
      isValid = false;
    }
    if (!data.email.trim()) {
      newErrors.email = "Please enter your email.";
      isValid = false;
    } else if (!emailRegex.test(data.email)) {
      newErrors.email = "Please enter a valid email address.";
      isValid = false;
    }
    if (!data.message.trim()) {
      newErrors.message = "Please enter a message.";
      isValid = false;
    }

    setError(isValid ? {} : newErrors);
    return isValid;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!validateData(formData)) {
      return;
    }

    setIsSubmitting(true);

    //Email sender function
    try {
      // TODO: Replace with your actual API endpoint
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to send message");

      // Activate  success
      if (response.ok) {
        setSubmitSuccess(true);
        setFormData({ firstName: "", lastName: "", email: "", message: "" });
      }

      // Clear success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (err) {
      setError({
        message:
          err instanceof Error
            ? err.message
            : "Failed to send message. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex-1">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-32 mb-24">
          <div className="flex gap-18">
            <div className="flex-1">
              <InputField
                title="First Name"
                id="firstName"
                setFormData={setFormData}
                formData={formData}
                error={error}
                clearFieldError={clearFieldError}
              />
            </div>
            <div className="flex-1">
              <InputField
                title="Last Name"
                id="lastName"
                setFormData={setFormData}
                formData={formData}
                error={error}
                clearFieldError={clearFieldError}
              />
            </div>
          </div>
          <div className="flex-1">
            <InputField
              title="Email address"
              id="email"
              setFormData={setFormData}
              formData={formData}
              error={error}
              clearFieldError={clearFieldError}
            />
          </div>

          {/* Message */}
          <div className="flex flex-col gap-12">
            <Title font={12}>Message</Title>
            <div className="w-full">
              <textarea
                id="message"
                onChange={(e) => {
                  setFormData((prev: FormData) => ({
                    ...prev,
                    message: e.target.value,
                  }));
                  if (error?.message) {
                    clearFieldError("message");
                  }
                }}
                placeholder="Enter Message"
                value={formData.message}
                className="message-field"
              />
              {error && error.message && (
                <p className="input-field-error">{error.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && error.message && (
          <div className="bg-red-500 bg-opacity-20 border border-red-500 rounded-[0.5556rem] p-16 mb-24">
            <p className="text-red-100 text-16">
              Please fix validation Errors before submitting.
            </p>
          </div>
        )}

        {/* Success Message */}
        {submitSuccess && (
          <div className="bg-green-500 bg-opacity-20 border border-green-500 rounded-[0.5556rem] p-16 mb-24">
            <p className="text-green-100 text-16">
              ✓ Message sent successfully! We&apos;ll get back to you soon.
            </p>
          </div>
        )}

        <SubmitButton isSubmitting={isSubmitting} disabled={isSubmitting} />
      </form>
    </div>
  );
}
