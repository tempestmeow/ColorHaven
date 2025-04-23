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

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    <>
      <div className="form-container pt-[3rem]">
        <form>
          <div className="name-input border-black border-4">
            <input type="text" id="name" name="name" onChange={handleChange} />
          </div>
          <div className="email-input border-black border-4">
            <input
              type="text"
              id="email"
              name="email"
              onChange={handleChange}
            />
          </div>
          <div className="feedback-input border-black border-4">
            <input
              type="text"
              id="feedback"
              name="feedback"
              onChange={handleChange}
            />
          </div>

          <button type="submit">Submit </button>
        </form>
      </div>
    </>
  );
}
