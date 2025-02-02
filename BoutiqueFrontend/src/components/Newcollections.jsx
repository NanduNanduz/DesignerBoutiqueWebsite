
// import React, { useRef, useEffect, useState } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";

// const products = [
//   {
//     image:
//       "https://www.mohifashion.com/cdn/shop/collections/010_1901-C.jpg?v=1729145018&width=500",
//     name: "Embroidered Lehenga",
//     price: "₹12,500",
//   },
//   {
//     image:
//       "https://assets2.andaazfashion.com/media/catalog/product/cache/1/image/800x1200/a12781a7f2ccb3d663f7fd01e1bd2e4e/r/o/rose-gold-silk-lehenga-choli-with-resham-work-llcv01068-1.jpg",
//     name: "Rose Gold Silk Lehenga",
//     price: "₹18,000",
//   },
//   {
//     image:
//       "https://cdn-appdata.seasonsindia.com/uploads/feature_images/153-10401.jpg",
//     name: "Traditional Bridal Lehenga",
//     price: "₹22,000",
//   },
//   {
//     image:
//       "https://asopalav.b-cdn.net/media/catalog/product/p/c/pcceh1751a-light-pink-raw-silk-bridal-heavy-work-lehenga-choli-with-floral-and-bird-motifs.jpg?class=3x",
//     name: "Red Bridal Lehenga",
//     price: "₹30,000",
//   },
// ];

// const Newcollections = () => {
//   const prevRef = useRef(null);
//   const nextRef = useRef(null);
//   const [swiperInstance, setSwiperInstance] = useState(null);

//   useEffect(() => {
//     if (swiperInstance && swiperInstance.navigation) {
//       swiperInstance.params.navigation.prevEl = prevRef.current;
//       swiperInstance.params.navigation.nextEl = nextRef.current;
//       swiperInstance.navigation.init();
//       swiperInstance.navigation.update();
//     }
//   }, [swiperInstance]);

//   return (
//     <section className="new-arrival product-carousel py-5 position-relative overflow-hidden">
//       <div className="container">
//         <div className="d-flex flex-wrap justify-content-between align-items-center mt-3 mb-3">
//           <h5 className="text-uppercase">New Collections</h5>
//         </div>

//         {/* Swiper Carousel */}
//         <Swiper
//           modules={[Navigation]}
//           spaceBetween={20}
//           slidesPerView={4}
//           breakpoints={{
//             0: { slidesPerView: 2 },
//             768: { slidesPerView: 3 },
//             1024: { slidesPerView: 4 },
//           }}
//           onSwiper={setSwiperInstance} // ✅ Store Swiper instance properly
//           navigation={{
//             nextEl: nextRef.current,
//             prevEl: prevRef.current,
//           }}
//           className="swiper product-swiper"
//         >
//           {products.map((product, index) => (
//             <SwiperSlide key={index}>
//               <div className="product-item">
//                 <div className="image-holder">
//                   <img
//                     src={product.image}
//                     alt={product.name}
//                     className="product-image img-fluid"
//                   />
//                 </div>
//                 <div className="product-content">
//                   <h5 className="product-title">{product.name}</h5>
//                   <span className="product-price">{product.price}</span>
//                 </div>
//               </div>
//             </SwiperSlide>
//           ))}
//         </Swiper>

//         {/* Custom Navigation Arrows */}
//         <div ref={prevRef} className="custom-swiper-prev">
//           <svg width={50} height={50} viewBox="0 0 24 24">
//             <path
//               d="M15 18l-6-6 6-6"
//               stroke="#000"
//               strokeWidth="2"
//               fill="none"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             />
//           </svg>
//         </div>
//         <div ref={nextRef} className="custom-swiper-next">
//           <svg width={50} height={50} viewBox="0 0 24 24">
//             <path
//               d="M9 18l6-6-6-6"
//               stroke="#000"
//               strokeWidth="2"
//               fill="none"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             />
//           </svg>
//         </div>
//       </div>

//       {/* Add CSS for Navigation Buttons */}
//       <style>
//         {`
//           .custom-swiper-prev,
//           .custom-swiper-next {
//             position: absolute;
//             top: 50%;
//             transform: translateY(-50%);
//             cursor: pointer;
//             z-index: 10;
//             background: rgba(255, 255, 255, 0.8);
//             padding: 10px;
//             border-radius: 50%;
//           }

//           .custom-swiper-prev { left: -40px; }
//           .custom-swiper-next { right: -40px; }

//           .custom-swiper-prev:hover,
//           .custom-swiper-next:hover {
//             background: rgba(255, 255, 255, 1);
//           }
//         `}
//       </style>
//     </section>
//   );
// };

// export default Newcollections;


import React, { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { FaHeart, FaShoppingCart } from "react-icons/fa"; // Import icons
import "swiper/css";
import "swiper/css/navigation";

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

const Newcollections = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [swiperInstance, setSwiperInstance] = useState(null);

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
          onSwiper={setSwiperInstance}
          navigation={{
            nextEl: nextRef.current,
            prevEl: prevRef.current,
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
                  {/* Hover Buttons */}
                  <div className="overlay-buttons">
                    <button className="wishlist-btn">
                      <FaHeart />
                    </button>
                    <button className="cart-btn">
                      <FaShoppingCart /> Add to Cart
                    </button>
                  </div>
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

      {/* Add CSS for Hover Effects & Buttons */}
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

          .cart-btn, .wishlist-btn {
            background-color:  #A48374;
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

          .wishlist-btn {
            background-color:rgb(201, 148, 96);
          }

          .cart-btn:hover {
            background-color:rgb(202, 136, 105);
          }

          .wishlist-btn:hover {
            background-color:rgb(160, 106, 53);
          }

          .custom-swiper-prev,
          .custom-swiper-next {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            cursor: pointer;
            z-index: 10;
            background: rgba(255, 255, 255, 0.8);
            padding: 10px;
            border-radius: 50%;
          }

          .custom-swiper-prev { left: -40px; }
          .custom-swiper-next { right: -40px; }

          .custom-swiper-prev:hover,
          .custom-swiper-next:hover {
            background: rgba(255, 255, 255, 1);
          }
        `}
      </style>
    </section>
  );
};

export default Newcollections;
