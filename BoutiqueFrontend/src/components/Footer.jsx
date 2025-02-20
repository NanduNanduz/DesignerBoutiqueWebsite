import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaPinterestP,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h2 style={{ color: "#CBAD8D" }}>Trendora</h2>
          <p style={{ color: " #b66139" }}>
            Crafting elegance, one stitch at a time.
          </p>
        </div>

        <div className="footer-section">
          <h3 style={{ color: "#CBAD8D" }}>Quick Links</h3>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/#newcollections">Our Collection</a>
            </li>
            <li>
              <a href="/schedule-appointment">Book an Appointment</a>
            </li>
            <li>
              <a href="/schedule-appointment">Contact Us</a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3 style={{ color: "#CBAD8D" }}>Contact Us</h3>
          <p>Email: support@trendora.com</p>
          <p>Phone: +91 98765 43210</p>
          <p>Location: Trivandrum, India</p>
        </div>

        <div className="footer-section social-media">
          <h3 style={{ color: "#CBAD8D" }}>Follow Us</h3>
          <div className="social-icons">
            <a href="https://www.facebook.com/" aria-label="Facebook">
              <FaFacebookF />
            </a>
            <a
              href="https://www.instagram.com/accounts/login/?hl=en"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="https://x.com/i/flow/login?lang=en&mx=2"
              aria-label="Twitter"
            >
              <FaTwitter />
            </a>
            <a href="https://in.pinterest.com/login/" aria-label="Pinterest">
              <FaPinterestP />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p style={{ color: "#CBAD8D" }}>
          &copy; {new Date().getFullYear()} Trendora. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
