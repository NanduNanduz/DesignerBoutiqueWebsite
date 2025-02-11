import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import axios from "axios";

const ProductItem = () => {
  const { id } = useParams(); // Get product ID from URL
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/products/single/${id}`)
      .then((response) => {
        console.log("Product Data:", response.data); // Debugging
         console.log("Image URL:", response.data.product.image);
        setProduct(response.data.product); // Ensure correct key
      })
      .catch((error) => console.error("Error fetching product:", error));
  }, [id]);

  if (!product) {
    return <h2>Loading product...</h2>;
  }

  return (
    <div className="container my-5">
      <div className="row">
        {/* Product Image */}
        <div className="col-md-5">
          <img
            src={
              Array.isArray(product.image) ? product.image[0] : product.image
            }
            alt={product.name}
            className="img-fluid rounded"
            onError={(e) => (e.target.src = "/placeholder.jpg")}
          />
        </div>

        {/* Product Details */}
        <div className="col-md-7">
          <h2 className="fw-bold">{product.name}</h2>
          <div className="d-flex align-items-center mb-2">
            <div className="text-warning me-2">
              {[...Array(5)].map((_, index) => (
                <FaStar key={index} fill={index < 4 ? "#ffc107" : "#e4e5e9"} />
              ))}
            </div>
            <span>(122 Reviews)</span>
          </div>

          <h3 className="fw-bold text-primary">₹{product.price}</h3>
          <p>
            Description: {product.description || "No description available."}
          </p>

          {/* Add to Cart Button */}
          <button className="btn btn-dark btn-lg w-100">ADD TO CART</button>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
