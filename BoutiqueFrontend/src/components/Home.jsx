import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false, // Optional: Hide arrows if not needed
  };

  return (
    <div style={{ width: "100vw", overflow: "hidden" }}>
      <Slider {...settings}>
        {[
          "https://www.nameerabyfarooq.com/cdn/shop/articles/Bridal_Lehenga_A_Timeless_Indian_Garment_for_Weddings_and_Beyond_1920x.jpg?v=1677172193",
          "https://www.mohifashion.com/cdn/shop/articles/BB_216433_Final_320eb394-2ae4-42e1-91f1-7e342fc976df.jpg?v=1718363593&width=1100",
          "https://www.nameerabyfarooq.com/cdn/shop/collections/Indian_Wedding_Dresses_1200x630.jpg?v=1625680385",
        ].map((src, index) => (
          <div key={index} style={{ width: "100vw", height: "80vh" }}>
            <img
              src={src}
              alt={`Slide ${index + 1}`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover", // Ensures full coverage
              }}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Home;
