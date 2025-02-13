
// import { useParams } from "react-router-dom";
// import { useState, useEffect } from "react";
// import { FaStar } from "react-icons/fa";
// import axios from "axios";
// import Footer from "../components/Footer";

// const ProductItem = () => {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const [selectedImage, setSelectedImage] = useState(""); // State for the main image
//   const [selectedSize, setSelectedSize] = useState(null); // State for size selection
//   const [errorMessage, setErrorMessage] = useState(""); // Error message for size selection

//   useEffect(() => {
//     axios
//       .get(`http://localhost:3000/products/single/${id}`)
//       .then((response) => {
//         setProduct(response.data.product);
//         setSelectedImage(
//           Array.isArray(response.data.product.image)
//             ? response.data.product.image[0]
//             : response.data.product.image
//         );
//       })
//       .catch((error) => console.error("Error fetching product:", error));
//   }, [id]);

//   if (!product) {
//     return <h2 className="text-center my-5">Loading product...</h2>;
//   }

//   const handleImageClick = (image) => {
//     setSelectedImage(image);
//   };

//   const handleSizeSelect = (size) => {
//     setSelectedSize(size);
//     setErrorMessage(""); // Clear error when size is selected
//   };

 



//   const handleAddToCart = async () => {
//     if (!selectedSize) {
//       setErrorMessage("⚠️ Please select a product size!");
//       return;
//     }

//     try {
//      const token =
//        localStorage.getItem("token") || sessionStorage.getItem("logintoken");
//  // Get the JWT token
//       if (!token) {
//         alert("Please log in to add items to the cart.");
//         return;
//       }

//       const response = await axios.post(
//         "http://localhost:3000/cart/addToCart",
//         {
//           productId: product._id,
//           size: selectedSize,
//           quantity: 1,
//         },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       if (response.status === 200) {
//         alert(`Added ${product.name} (Size: ${selectedSize}) to cart!`);
//       }
//     } catch (error) {
//       console.error("Error adding to cart:", error);
//       alert("Failed to add item to cart.");
//     }
//   };

//   return (
//     <div className="d-flex flex-column min-vh-100">
//       <div className="container my-5 flex-grow-1">
//         <div className="row">
//           <div className="col-md-5">
//             <div className="d-flex flex-column">
//               <img
//                 src={selectedImage}
//                 alt={product.name}
//                 className="img-fluid rounded mb-3"
//                 onError={(e) => (e.target.src = "/placeholder.jpg")}
//               />

//               <div className="d-flex">
//                 {Array.isArray(product.image) &&
//                   product.image.map((img, index) => (
//                     <img
//                       key={index}
//                       src={img}
//                       alt="Thumbnail"
//                       className={`img-thumbnail me-2 ${
//                         selectedImage === img ? "border border-dark" : ""
//                       }`}
//                       style={{
//                         width: "60px",
//                         height: "60px",
//                         cursor: "pointer",
//                       }}
//                       onClick={() => handleImageClick(img)}
//                     />
//                   ))}
//               </div>
//             </div>
//           </div>

//           <div className="col-md-7">
//             <h2 className="fw-bold">{product.name}</h2>

//             <div className="d-flex align-items-center mb-2">
//               <div className="text-warning me-2">
//                 {[...Array(5)].map((_, index) => (
//                   <FaStar
//                     key={index}
//                     fill={index < 4 ? "#ffc107" : "#e4e5e9"}
//                   />
//                 ))}
//               </div>
//               <span>(122 Reviews)</span>
//             </div>

//             <h3 className="fw-bold text-danger">${product.price}</h3>
//             <p className="text-muted">
//               {product.description || "No description available."}
//             </p>

//             <div className="mb-3">
//               <h5 className="fw-bold">Select Size</h5>
//               <div className="d-flex">
//                 {["S", "M", "L", "XL", "XXL"].map((size) => (
//                   <button
//                     key={size}
//                     className={`btn me-2 ${
//                       selectedSize === size ? "btn-dark" : "btn-outline-dark"
//                     }`}
//                     style={{ minWidth: "50px" }}
//                     onClick={() => handleSizeSelect(size)}
//                   >
//                     {size}
//                   </button>
//                 ))}
//               </div>
//               {errorMessage && (
//                 <p className="text-danger mt-2">{errorMessage}</p>
//               )}
//             </div>

//             <button
//               className="btn btn-dark btn-lg w-100 mt-3"
//               onClick={handleAddToCart}
//             >
//               ADD TO CART
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Footer Positioned Properly */}
//       <Footer />
//     </div>
//   );
// };

// export default ProductItem;






import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import axios from "axios";
import Footer from "../components/Footer";

const ProductItem = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedSize, setSelectedSize] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:3000/products/single/${id}`)
      .then((response) => {
        setProduct(response.data.product);
        setSelectedImage(
          Array.isArray(response.data.product.image)
            ? response.data.product.image[0]
            : response.data.product.image
        );
      })
      .catch((error) => console.error("Error fetching product:", error));
  }, [id]);

  if (!product) {
    return <h2 className="text-center my-5">Loading product...</h2>;
  }

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
    setErrorMessage("");
  };

  const handleAddToCart = async () => {
    if (!selectedSize) {
      setErrorMessage("⚠️ Please select a product size!");
      return;
    }

    try {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("logintoken");
      if (!token) {
        alert("Please log in to add items to the cart.");

        return;
      }

      const response = await axios.post(
        "http://localhost:3000/cart/addToCart",
        {
          productId: product._id,
          size: selectedSize,
          quantity: 1,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        alert(`Added ${product.name} (Size: ${selectedSize}) to cart!`);
       
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add item to cart.");
    }
  };

  return (
    <div
      className="d-flex flex-column min-vh-100"
      style={{ backgroundColor: "#D1C7BD" }}
    >
      <div className="container my-5 flex-grow-1">
        <div className="row">
          <div className="col-md-5">
            <div className="d-flex flex-column">
              <img
                src={selectedImage}
                alt={product.name}
                className="img-fluid rounded mb-3"
                style={{ border: "2px solid #3A2D28" }}
                onError={(e) => (e.target.src = "/placeholder.jpg")}
              />

              <div className="d-flex">
                {Array.isArray(product.image) &&
                  product.image.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt="Thumbnail"
                      className={`img-thumbnail me-2 ${
                        selectedImage === img ? "border border-dark" : ""
                      }`}
                      style={{
                        width: "60px",
                        height: "60px",
                        cursor: "pointer",
                        border:
                          selectedImage === img ? "2px solid #A48374" : "",
                      }}
                      onClick={() => handleImageClick(img)}
                    />
                  ))}
              </div>
            </div>
          </div>

          <div className="col-md-7">
            <h2 className="fw-bold" style={{ color: "#3A2D28" }}>
              {product.name}
            </h2>

            <div className="d-flex align-items-center mb-2">
              <div className="text-warning me-2">
                {[...Array(5)].map((_, index) => (
                  <FaStar
                    key={index}
                    fill={index < 4 ? "#CBAD8D" : "#e4e5e9"}
                  />
                ))}
              </div>
              <span>(122 Reviews)</span>
            </div>

            <h3 className="fw-bold" style={{ color: "#A48374" }}>
              ₹{product.price}
            </h3>
            <p className="text-muted">
              {product.description || "No description available."}
            </p>

            <div className="mb-3">
              <h5 className="fw-bold">Select Size</h5>
              <div className="d-flex">
                {["S", "M", "L", "XL", "XXL"].map((size) => (
                  <button
                    key={size}
                    className={`btn me-2 ${
                      selectedSize === size ? "btn-dark" : "btn-outline-dark"
                    }`}
                    style={{
                      minWidth: "50px",
                      backgroundColor:
                        selectedSize === size ? "#CBAD8D" : "#D1C7BD",
                      color: selectedSize === size ? "white" : "black",
                    }}
                    onClick={() => handleSizeSelect(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {errorMessage && (
                <p className="text-danger mt-2">{errorMessage}</p>
              )}
            </div>

            <button
              className="btn btn-lg w-100 mt-3"
              style={{ backgroundColor: "#3A2D28", color: "white" }}
              onClick={handleAddToCart}
            >
              ADD TO CART
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductItem;



