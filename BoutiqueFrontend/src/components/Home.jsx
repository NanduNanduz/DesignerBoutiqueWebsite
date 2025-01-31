
// import React, { useEffect } from "react";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// const Home = () => {
//   useEffect(() => {
//     document.body.style.overflowX = "hidden";
//     document.documentElement.style.overflowX = "hidden";
//   }, []);

//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 400,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 2000,
//     arrows: false, // Optional: Hide arrows if not needed
//   };

//   return (
//     <div style={{ width: "100%", overflow: "hidden" }}>
//       <Slider {...settings}>
//         {[
//           "https://www.nameerabyfarooq.com/cdn/shop/articles/Bridal_Lehenga_A_Timeless_Indian_Garment_for_Weddings_and_Beyond_1920x.jpg?v=1677172193",
//           "https://www.mohifashion.com/cdn/shop/articles/BB_216433_Final_320eb394-2ae4-42e1-91f1-7e342fc976df.jpg?v=1718363593&width=1100",
//           "https://www.nameerabyfarooq.com/cdn/shop/collections/Indian_Wedding_Dresses_1200x630.jpg?v=1625680385",
//         ].map((src, index) => (
//           <div key={index} style={{ width: "100%", height: "80vh" }}>
//             <img
//               src={src}
//               alt={`Slide ${index + 1}`}
//               style={{
//                 width: "100%",
//                 height: "100%",
//                 objectFit: "cover", // Ensures full coverage
//               }}
//             />
//           </div>
//         ))}
//       </Slider>
//     </div>
//   );
// };

// export default Home;



import React, { useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home = () => {
  useEffect(() => {
    document.body.style.overflowX = "hidden";
    document.documentElement.style.overflowX = "hidden";
  }, []);

  const heroSettings = {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
  };

  const productSliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    arrows: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div style={{ width: "100%", overflow: "hidden" }}>
      {/* Hero Slider */}
      <Slider {...heroSettings}>
        {[
          "https://www.nameerabyfarooq.com/cdn/shop/articles/Bridal_Lehenga_A_Timeless_Indian_Garment_for_Weddings_and_Beyond_1920x.jpg?v=1677172193",
          "https://www.mohifashion.com/cdn/shop/articles/BB_216433_Final_320eb394-2ae4-42e1-91f1-7e342fc976df.jpg?v=1718363593&width=1100",
          "https://www.nameerabyfarooq.com/cdn/shop/collections/Indian_Wedding_Dresses_1200x630.jpg?v=1625680385",
        ].map((src, index) => (
          <div key={index} className="hero-slide">
            <img src={src} alt={`Slide ${index + 1}`} className="hero-image" />
          </div>
        ))}
      </Slider>

      {/* Product Slider Section */}
      <section className="product-slider-section">
        <h2 className="section-title">Trending Designs</h2>
        <Slider {...productSliderSettings}>
          {[
            "https://www.mohifashion.com/cdn/shop/collections/010_1901-C.jpg?v=1729145018&width=500",
            "https://assets2.andaazfashion.com/media/catalog/product/cache/1/image/800x1200/a12781a7f2ccb3d663f7fd01e1bd2e4e/r/o/rose-gold-silk-lehenga-choli-with-resham-work-llcv01068-1.jpg",
            "https://5.imimg.com/data5/WO/QC/MY-28300667/lehenga-choli-designs.jpg",
            "https://cdn-appdata.seasonsindia.com/uploads/feature_images/153-10401.jpg",
            "https://asopalav.b-cdn.net/media/catalog/product/p/c/pcceh1751a-light-pink-raw-silk-bridal-heavy-work-lehenga-choli-with-floral-and-bird-motifs.jpg?class=3x",
          ].map((src, index) => (
            <div key={index} className="product-slide">
              <img src={src} alt={`Trending ${index + 1}`} />
            </div>
          ))}
        </Slider>
      </section>

      {/* CSS Fixes */}
      <style>{`
        .hero-slide {
          width: 100%;
          height: 80vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .hero-image {
  width: 100%;
  height: 100%;
  object-fit: contain; /* Show the full image without cropping */
  max-height: 80vh;
  background-color: black; /* Optional: Black background for better appearance */
}

        .product-slider-section {
          padding: 40px 20px;
          background-color: #f9f9f9;
          text-align: center;
        }

        .section-title {
          font-size: 24px;
          margin-bottom: 20px;
          font-weight: bold;
          color: #333;
        }

        .product-slide {
          padding: 10px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .product-slide img {
          width: 100%;
          max-width: 300px;
          height: auto;
          border-radius: 10px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease-in-out;
        }

        .product-slide img:hover {
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
};

export default Home;

