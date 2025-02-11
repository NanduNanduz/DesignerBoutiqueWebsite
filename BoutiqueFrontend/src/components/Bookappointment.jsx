import React from "react";

const Bookappointment = () => {
  const sectionStyle = {
    backgroundImage:
      'url("https://dlibaas.com/cdn/shop/files/dollar-gill-oH-PNVWykUo-unsplash_1_1024x1024.png?v=1649104034")', // Replace with your image URL
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh", // You can adjust the height as needed
  };

  return (
    <section className="consultation-section" style={sectionStyle}>
      <div className="consultation-content">
        <h1 style={{ color: "rgb(121, 3, 3)" }}>
          Schedule Your Personalized Design Consultation
        </h1>
        <p style={{ color: "rgb(0, 0, 0)" }}>
          Connect with our expert designers either online or in-store to craft
          your ideal outfit.
        </p>
        <a href="/schedule-appointment" className="book-button">
          SCHEDULE NOW
        </a>
      </div>
    </section>
  );
};

export default Bookappointment;
