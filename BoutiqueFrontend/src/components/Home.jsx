
import React, { useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Newcollections from "./Newcollections";
import Bookappointment from "./Bookappointment";
import Footer from "./Footer";

const Home = () => {

  useEffect(() => {
    document.body.style.overflowX = "hidden";
    document.documentElement.style.overflowX = "hidden";
  }, []);

  const heroSettings = {
    infinite: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  const productSliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true,
    centerMode: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div
      style={{ width: "100%", overflow: "hidden", margin: "0%", padding: "0%" }}
    >
      {/* Hero Slider Wrapper */}
      <div className="hero-slider-wrapper">
        <Slider {...heroSettings}>
          {[
            "https://www.nameerabyfarooq.com/cdn/shop/articles/Bridal_Lehenga_A_Timeless_Indian_Garment_for_Weddings_and_Beyond_1920x.jpg?v=1677172193",
            "https://www.nameerabyfarooq.com/cdn/shop/articles/A_Modern_Twist__Fusion_Bridal_Dresses_for_the_Trendy_Bride_1920x.jpg?v=1690522728",
            "https://www.nameerabyfarooq.com/cdn/shop/collections/Pakistani-Bridal-Dresses-2018_1200x630.jpg?v=1662560423",
          ].map((src, index) => (
            <div key={index} className="hero-slide">
              <img
                src={src}
                alt={`Slide ${index + 1}`}
                className="hero-image"
              />
            </div>
          ))}
        </Slider>
      </div>

      {/* Product Slider Section */}
      <section className="product-slider-section">
        <h5 className="text-uppercase">Trending Designs</h5>
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
      <Newcollections/>
      <Bookappointment/>
      <Footer/>
    </div>
  );
};

export default Home;
