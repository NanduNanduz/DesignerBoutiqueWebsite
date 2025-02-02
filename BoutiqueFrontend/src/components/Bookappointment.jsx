import React from "react";

const Bookappointment = () => {
  const sectionStyle = {
    backgroundImage:
      'url("https://www.nameerabyfarooq.com/cdn/shop/articles/A_Modern_Twist__Fusion_Bridal_Dresses_for_the_Trendy_Bride_1920x.jpg?v=1690522728")', // Replace with your image URL
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh", // You can adjust the height as needed
  };

  return (
    <section className="consultation-section" style={sectionStyle}>
      <div className="consultation-content">
        <h1>Schedule Your Personalized Design Consultation</h1>
        <p>
          Connect with our expert designers either online or in-store to craft
          your ideal outfit.
        </p>
        <a href="#appointment" className="book-button">
          SCHEDULE NOW
        </a>
      </div>
    </section>
  );
};

export default Bookappointment;
