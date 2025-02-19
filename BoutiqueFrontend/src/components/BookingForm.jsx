
import React, { useState } from "react";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom"; 

const AppointmentForm = () => {


   const navigate = useNavigate();


  const [formData, setFormData] = useState({
    name: "",
    email: "",
    preferredDate: "",
    address: "",
    mobile: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const phoneNumber = "+916238738546";
    const message = `Hello, I would like to schedule an appointment.\n\nName: ${formData.name}\nEmail: ${formData.email}\nPreferred Date: ${formData.preferredDate}\nAddress: ${formData.address}\nMessage: ${formData.message}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappURL, "_blank");

    setTimeout(() => {
      navigate("/thank-you");
    }, 1000);
  };
  

  return (
    <div className="page-container">
      <div className="appointment-container">
        <h2 className="appointment-title">Schedule Appointment</h2>
        <form onSubmit={handleSubmit} className="appointment-form">
          <div className="form-row">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-row">
            <input
              type="date"
              name="preferredDate"
              value={formData.preferredDate}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-row">
            <input
              type="text"
              name="mobile"
              placeholder="Mobile Number"
              value={formData.mobile}
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              placeholder="Message"
              value={formData.message}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="whatsapp-btn">
            Send via WhatsApp
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default AppointmentForm;

