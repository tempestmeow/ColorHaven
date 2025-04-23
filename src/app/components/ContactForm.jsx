"use client";
import { useState } from "react";
import ContactIllustrator from "./ContactIllustrator";
export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    feedback: "",
  });
  const [formStatus, setFormStatus] = useState({
    message: "",
    isSuccess: false,
    isSubmitting: false,
  });

  const hasNameValue = formData.name.trim() !== "";
  const hasEmailValue = formData.email.trim() !== "";
  const hasFeedbackValue = formData.feedback.trim() !== "";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const WEB3FORMS_ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ message: "", isSuccess: false, isSubmitting: true });

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          ...formData,
          subject: `New contact form submission from ${formData.name}`,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setFormStatus({
          message: "Thank you! Your message has been submitted successfully.",
          isSuccess: true,
          isSubmitting: false,
        });
        setFormData({ name: "", email: "", feedback: "" });
      } else {
        throw new Error(result.message || "Submission failed");
      }
    } catch (error) {
      setFormStatus({
        message: error.message || "Something went wrong. Please try again.",
        isSuccess: false,
        isSubmitting: false,
      });
    }
  };

  return (
    <div className="flex flex-row w-[80%] contact-main justify-around items-center">
      <div className="contact-form-container">
        <h2 className="form-title">Contact Me</h2>

        {formStatus.message && (
          <div
            className={`status-message ${
              formStatus.isSuccess ? "success" : "error"
            }`}
          >
            {formStatus.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="contact-form">
          <div className="input-container">
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className={
                hasNameValue ? "input-field active-input" : "input-field"
              }
            />
            <span
              className={hasNameValue ? "input-label active" : "input-label"}
            >
              Name
            </span>
          </div>

          <div className="input-container">
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className={
                hasEmailValue ? "input-field active-input" : "input-field"
              }
            />
            <span
              className={hasEmailValue ? "input-label active" : "input-label"}
            >
              Email
            </span>
          </div>

          <div className="input-container">
            <textarea
              id="feedback"
              name="feedback"
              value={formData.feedback}
              onChange={handleChange}
              required
              rows="4"
              className={
                hasFeedbackValue
                  ? "textarea-field active-input"
                  : "textarea-field"
              }
            />
            <span
              className={
                hasFeedbackValue ? "input-label active" : "input-label"
              }
            >
              Message
            </span>
          </div>

          <button
            type="submit"
            disabled={formStatus.isSubmitting}
            className="submit-button"
          >
            {formStatus.isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
      <div className="min-w-[320px] colorIllustrator">
        <ContactIllustrator className="flex-shrink-0 h-full w-full " />
      </div>
    </div>
  );
}
