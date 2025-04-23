"use client";
import { useState, useEffect } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    feedback: "",
  });

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
      } else {
        throw new Error(result.message || "Submit failed");
      }
    } catch (error) {}
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    <>
      <div className="form-container pt-[3rem]">
        <form onSubmit={handleSubmit}>
          <div className="name-input border-black border-4">
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="email-input border-black border-4">
            <input
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="feedback-input border-black border-4">
            <input
              type="text"
              id="feedback"
              name="feedback"
              value={formData.feedback}
              onChange={handleChange}
            />
          </div>

          <button type="submit">Submit </button>
        </form>
      </div>
    </>
  );
}
