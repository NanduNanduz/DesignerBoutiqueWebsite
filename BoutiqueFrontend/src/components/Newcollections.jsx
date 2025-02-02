
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
// Ensure to include custom CSS

const products = [
  {
    image:
      "https://www.mohifashion.com/cdn/shop/collections/010_1901-C.jpg?v=1729145018&width=500",
    name: "Embroidered Lehenga",
    price: "₹12,500",
  },
  {
    image:
      "https://assets2.andaazfashion.com/media/catalog/product/cache/1/image/800x1200/a12781a7f2ccb3d663f7fd01e1bd2e4e/r/o/rose-gold-silk-lehenga-choli-with-resham-work-llcv01068-1.jpg",
    name: "Rose Gold Silk Lehenga",
    price: "₹18,000",
  },
  {
    image:
      "https://cdn-appdata.seasonsindia.com/uploads/feature_images/153-10401.jpg",
    name: "Traditional Bridal Lehenga",
    price: "₹22,000",
  },
  {
    image:
      "https://asopalav.b-cdn.net/media/catalog/product/p/c/pcceh1751a-light-pink-raw-silk-bridal-heavy-work-lehenga-choli-with-floral-and-bird-motifs.jpg?class=3x",
    name: "Red Bridal Lehenga",
    price: "₹30,000",
  },
];

const ProductCarousel = () => {
  return (
    <section className="new-arrival product-carousel py-5 position-relative overflow-hidden">
      <div className="container">
        <div className="d-flex flex-wrap justify-content-between align-items-center mt-3 mb-3">
          <h5 className="text-uppercase">New Collections</h5>        
        </div>

        {/* Swiper Carousel */}
        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={4}
          
        
          breakpoints={{
            0: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          className="swiper product-swiper"
        >
          {products.map((product, index) => (
            <SwiperSlide key={index}>
              <div className="product-item">
                <div className="image-holder">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="product-image img-fluid"
                  />
                </div>
                <div className="product-content">
                  <h5 className="product-title">{product.name}</h5>
                  <span className="product-price">{product.price}</span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Arrows */}
        <div className="swiper-button-prev custom-swiper-prev">
          <svg width={50} height={50} viewBox="0 0 24 24">
            <path
              d="M15 18l-6-6 6-6"
              stroke="#000"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="swiper-button-next custom-swiper-next">
          <svg width={50} height={50} viewBox="0 0 24 24">
            <path
              d="M9 18l6-6-6-6"
              stroke="#000"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default ProductCarousel;
