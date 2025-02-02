import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaPinterestP,
} from "react-icons/fa";
 // Make sure to create and import this CSS file

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
              <a href="/about">About Us</a>
            </li>
            <li>
              <a href="/collection">Our Collection</a>
            </li>
            <li>
              <a href="/appointment">Book an Appointment</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
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
            <a href="#" aria-label="Facebook">
              <FaFacebookF />
            </a>
            <a href="#" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="#" aria-label="Twitter">
              <FaTwitter />
            </a>
            <a href="#" aria-label="Pinterest">
              <FaPinterestP />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p style={{ color: "#CBAD8D" }}>
          &copy; {new Date().getFullYear()}{" "}
         Trendora. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
