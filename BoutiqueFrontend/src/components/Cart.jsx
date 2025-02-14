
import { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const shippingFee = 10;
  const navigate = useNavigate();

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      const token = sessionStorage.getItem("logintoken"); // Assuming user is authenticated
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/cart/cartlist`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setCart(response.data);
      calculateSubtotal(response.data);
    } catch (error) {
      console.error("Error loading cart:", error);
    }
  };

  const calculateSubtotal = (cartItems) => {
    const total = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setSubtotal(total);
  };

  const updateQuantity = async (index, quantity) => {
    if (quantity < 1) return;
    try {
      const token = sessionStorage.getItem("logintoken");
      const updatedCart = [...cart];
      updatedCart[index].quantity = quantity;
      setCart(updatedCart);
      calculateSubtotal(updatedCart);
      await axios.put(
        `${import.meta.env.VITE_API_URL}/cart/update/${updatedCart[index]._id}`,
        { quantity },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const removeItem = async (index) => {
    try {
      const token = sessionStorage.getItem("logintoken");
      const itemId = cart[index]._id;
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/cart/deletecart/${itemId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const updatedCart = cart.filter((_, i) => i !== index);
      setCart(updatedCart);
      calculateSubtotal(updatedCart);
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  return (
    <div
      className="d-flex flex-column min-vh-100"
      style={{ backgroundColor: "white" }}
    >
      <div className="container my-5 flex-grow-1">
        <h2 className="fw-bold text-center" style={{ color: "#3A2D28" }}>
          YOUR CART
        </h2>

        {cart.length === 0 ? (
          <h4 className="text-center my-4" style={{ color: "#A48374" }}>
            Your cart is empty.
          </h4>
        ) : (
          <>
            <table className="table mt-4">
              <thead>
                <tr style={{ backgroundColor: "#CBAD8D", color: "#3A2D28" }}>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Size</th>
                  <th>Quantity</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item, index) => (
                  <tr key={index} style={{ backgroundColor: "#D1C7BD" }}>
                    <td className="d-flex align-items-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="img-thumbnail me-3"
                        style={{
                          width: "80px",
                          height: "80px",
                          border: "2px solid #3A2D28",
                        }}
                      />
                      <span style={{ color: "#3A2D28" }}>{item.name}</span>
                    </td>
                    <td style={{ color: "#3A2D28" }}>₹{item.price}</td>
                    <td>
                      <button
                        className="btn btn-outline-dark btn-sm"
                        style={{ backgroundColor: "#CBAD8D", color: "white" }}
                      >
                        {item.size}
                      </button>
                    </td>
                    <td>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                          updateQuantity(index, parseInt(e.target.value))
                        }
                        className="form-control"
                        style={{ width: "60px" }}
                      />
                    </td>
                    <td>
                      <button
                        className="btn"
                        style={{ backgroundColor: "#A48374", color: "white" }}
                        onClick={() => removeItem(index)}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="row">
              <div className="col-md-6 offset-md-6">
                <div
                  className="border p-4 rounded"
                  style={{ backgroundColor: "#D1C7BD", color: "#3A2D28" }}
                >
                  <h4 className="fw-bold">CART TOTALS</h4>
                  <p className="d-flex justify-content-between">
                    <span>Subtotal:</span>
                    <strong>₹{subtotal.toFixed(2)}</strong>
                  </p>
                  <p className="d-flex justify-content-between">
                    <span>Shipping Fee:</span>
                    <strong>₹{shippingFee.toFixed(2)}</strong>
                  </p>
                  <hr />
                  <p className="d-flex justify-content-between fs-5 fw-bold">
                    <span>Total:</span>
                    <span>₹{(subtotal + shippingFee).toFixed(2)}</span>
                  </p>
                  <button
                    className="btn w-100"
                    style={{ backgroundColor: "#3A2D28", color: "white" }}
                    onClick={() =>
                      navigate("/checkout", {
                        state: { cart, subtotal, shippingFee },
                      })
                    }
                  >
                    PROCEED TO CHECKOUT
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Cart;
