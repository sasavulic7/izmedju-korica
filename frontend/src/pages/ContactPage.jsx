import React, { useState } from "react";
import axios from "axios";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState(""); // Status poruka

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Ime je obavezno.";
    if (!formData.email) {
      newErrors.email = "Email je obavezan.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Unesite validan email.";
    }
    if (!formData.message) newErrors.message = "Poruka je obavezna.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post(
          "https://izmedju-korica.vercel.app/api/contact", // Backend endpoint
          formData
        );

        if (response.data.success) {
          setStatus("Poruka je uspešno poslata!");
          setFormData({ name: "", email: "", message: "" }); // Resetovanje forme
        } else {
          setStatus("Došlo je do greške prilikom slanja poruke.");
        }
      } catch (error) {
        console.error("Greška:", error);
        setStatus("Greška prilikom slanja poruke.");
      }
    }
  };

  return (
    <div className="bg-[#f5e6ca] min-h-screen flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
        <h2 className="text-3xl font-bold text-[#6b4226] text-center mb-6">
          Kontaktirajte nas
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-gray-700">
              Ime
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6b4226]"
            />
            {errors.name && <p className="text-red-500">{errors.name}</p>}
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6b4226]"
            />
            {errors.email && <p className="text-red-500">{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="message" className="block text-gray-700">
              Poruka
            </label>
            <textarea
              id="message"
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6b4226]"
            />
            {errors.message && <p className="text-red-500">{errors.message}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-[#6b4226] text-white py-3 rounded-lg hover:bg-[#4e2f1f] transition"
          >
            Pošalji
          </button>
          {status && <p className="text-center text-[#6b4226] mt-4">{status}</p>}
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
