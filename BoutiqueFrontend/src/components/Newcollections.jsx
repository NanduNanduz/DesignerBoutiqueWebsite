
import React, { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { FaShoppingCart } from "react-icons/fa";
import "swiper/css";
import "swiper/css/navigation";
import axios from "axios";
import { Link } from "react-router-dom";


const Newcollections = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchBestsellers = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/products/bestsellers`
        );
        if (response.data.success) {
          setProducts(response.data.products);
        }
      } catch (error) {
        console.error("Error fetching bestseller products:", error);
      }
    };

    fetchBestsellers();
  }, []);

  useEffect(() => {
    if (swiperInstance && swiperInstance.navigation) {
      swiperInstance.params.navigation.prevEl = prevRef.current;
      swiperInstance.params.navigation.nextEl = nextRef.current;
      swiperInstance.navigation.init();
      swiperInstance.navigation.update();
    }
  }, [swiperInstance]);

  return (
    <section className="new-arrival product-carousel py-5 position-relative overflow-hidden">
      <div className="container">
        <div className="d-flex flex-wrap justify-content-between align-items-center mt-3 mb-3">
          <h5 className="text-uppercase">New Collections</h5>
        </div>
       
        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={4}
          breakpoints={{
            0: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
          onSwiper={setSwiperInstance}
          navigation={{
            nextEl: nextRef.current,
            prevEl: prevRef.current,
          }}
          className="swiper product-swiper"
        >
          {products.map((product, index) => (
            <SwiperSlide key={index}>
              <Link
                to={`/product/${product._id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div className="product-item">
                  <div className="image-holder">
                    <img
                      src={product.image[0]}
                      alt={product.name}
                      className="product-image img-fluid"
                    />
                  </div>
                  <div className="product-content">
                    <h5 className="product-title">{product.name}</h5>
                    <span className="product-price">₹{product.price}</span>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>

        <div ref={prevRef} className="custom-swiper-prev">
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
        <div ref={nextRef} className="custom-swiper-next">
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

      <style>
        {`
          .product-item {
            position: relative;
            text-align: center;
            transition: all 0.3s ease-in-out;
          }

          .image-holder {
            position: relative;
            overflow: hidden;
            border-radius: 10px;
          }

        

          .product-image {
  width: 100%;
  height: 350px; /* Set a fixed height */
  object-fit: cover; /* Ensures images maintain aspect ratio without distortion */
  display: block;
  transition: transform 0.3s ease-in-out;
}


          .image-holder:hover .product-image {
            transform: scale(1.1);
          }

          .overlay-buttons {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            display: flex;
            flex-direction: column;
            gap: 10px;
            opacity: 0;
            transition: opacity 0.3s ease-in-out;
          }

          .image-holder:hover .overlay-buttons {
            opacity: 1;
          }

          .cart-btn {
            background-color: #A48374;
            color: white;
            border: none;
            padding: 8px 15px;
            border-radius: 5px;
            cursor: pointer;
            transition: all 0.3s;
            font-size: 14px;
            display: flex;
            align-items: center;
            gap: 5px;
          }

          .cart-btn:hover {
            background-color: rgb(202, 136, 105);
          }

          .custom-swiper-prev,
          .custom-swiper-next {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            cursor: pointer;
            z-index: 10;
            background: rgba(177, 177, 177, 0.8);
            padding: 5px;
            border-radius: 50%;
          }

          .custom-swiper-prev { left: -5px; }
          .custom-swiper-next { right: -5px; }

          .custom-swiper-prev:hover,
          .custom-swiper-next:hover {
            background: rgb(88, 84, 84);
          }
        `}
      </style>
    </section>
  );
};

export default Newcollections;

