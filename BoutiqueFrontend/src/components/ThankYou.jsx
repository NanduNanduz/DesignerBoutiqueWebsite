import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

const ThankYou = () => {
  return (
    <div>

    <div className="thank-you-container">
      <h1 style={{ color: "#A48374" }}>Thank You!</h1>
      <p>Your appointment request has been sent successfully.</p>
      <Link to="/" className="btn btn-dark" style={{ color: "#A48374", marginBottom:'20px' }}>
        Back to Home
      </Link>
      </div>
      <Footer/>
    </div>
  );
};

export default ThankYou;
