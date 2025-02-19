
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import Footer from "../components/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const stripePromise = loadStripe(
  "pk_test_51Qrv1PFQnIveaPWIZyTnE7Atx9qOCQpcJeRFMslQtjHRZOy6p1xZPSwWjKfwaJSWKY5LEbTq1hMQg6b12df6R9w800pyBO8hIh"
);

const CheckoutForm = ({ amount, shippingInfo }) => {
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = sessionStorage.getItem("logintoken");
      if (!token) {
        setError("No token found. Please log in.");
        return;
      }

      console.log("Sending Amount to Backend:", amount);

      // Make payment request
      const paymentResponse = await axios.post(
        `${import.meta.env.VITE_API_URL}/users/payment`,
        { amount },
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("Response from Backend:", paymentResponse.data);
      const { clientSecret } = paymentResponse.data;

      if (!clientSecret) {
        throw new Error("Failed to retrieve client secret.");
      }

      // Confirm payment
      const { paymentIntent, error } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: { card: elements.getElement(CardElement) },
        }
      );

      if (error) {
        setError(error.message);
      } else {
        setSuccess("Payment successful!");

        // Extract user ID from token
        const decodedToken = JSON.parse(atob(token.split(".")[1])); // Decode JWT payload
        const userId = decodedToken.id || decodedToken.userId; // Ensure it matches backend structure

        if (!userId) {
          setError("User not found. Please log in.");
          return;
        }

        const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
        console.log("📦 Raw Cart Items from Local Storage:", cartItems);

        const formattedCartItems = cartItems.map((item) => ({
          productId: item.productId || item._id, // Ensure correct product ID
          name: item.name,
          size: item.size,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
        }));
      console.log("✅ Formatted Cart Items to be Sent:", formattedCartItems);


        const fullAddress = `${shippingInfo.street}, ${shippingInfo.city}, ${shippingInfo.state} ${shippingInfo.zip}, ${shippingInfo.country}`;
        const orderData = {
          userId,
          products: formattedCartItems, // Correct field name for the backend
          totalAmount: amount,
          paymentMethod: "stripe",
          shippingDetails: { ...shippingInfo, address: fullAddress },
          paymentStatus: "Paid",
        };

        console.log("Creating order with data:", orderData);

        // Send order data to backend
       await axios.post(
         `${import.meta.env.VITE_API_URL}/order/createOrder`,
         orderData,
         { headers: { Authorization: `Bearer ${token}` } }
       );

        // Clear the cart after successful payment
        await axios.delete(`${import.meta.env.VITE_API_URL}/cart/clearcart`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        localStorage.removeItem("cart"); // Clear cart from localStorage
        setTimeout(() => navigate("/success"), 1000); // Navigate to success page
      }
    } catch (err) {
      console.error("Error:", err.response?.data || err.message);
      setError(`Payment failed: ${err.response?.data?.error || err.message}`);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement className="form-control mb-3 p-3" />
      <button
        className="btn btn-dark w-100 py-2"
        type="submit"
        disabled={!stripe || loading}
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
      {error && <p className="text-danger mt-2">{error}</p>}
      {success && <p className="text-success mt-2">{success}</p>}
    </form>
  );
};

const Checkout = () => {
  const location = useLocation();
  const { cart, subtotal, shippingFee } = location.state || {
    cart: [],
    subtotal: 0,
    shippingFee: 0,
  };

  const [paymentMethod, setPaymentMethod] = useState("stripe");

  // Delivery information state
  const [deliveryInfo, setDeliveryInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    phone: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDeliveryInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
      <div className="container my-5">
        <h2 className="text-center fw-bold mb-4">Checkout</h2>
        <div className="row">
          {/* Delivery Information */}
          <div className="col-md-6">
            <h4 className="fw-bold">
              DELIVERY <span className="text-primary">INFORMATION</span>
            </h4>
            <form>
              <div className="row mb-3">
                <div className="col">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="First name"
                    name="firstName"
                    value={deliveryInfo.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="col">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Last name"
                    name="lastName"
                    value={deliveryInfo.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <input
                type="email"
                className="form-control mb-3"
                placeholder="Email address"
                name="email"
                value={deliveryInfo.email}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Street"
                name="street"
                value={deliveryInfo.street}
                onChange={handleInputChange}
                required
              />
              <div className="row mb-3">
                <div className="col">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="City"
                    name="city"
                    value={deliveryInfo.city}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="col">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="State"
                    name="state"
                    value={deliveryInfo.state}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Zipcode"
                    name="zip"
                    value={deliveryInfo.zip}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="col">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Country"
                    name="country"
                    value={deliveryInfo.country}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Phone"
                name="phone"
                value={deliveryInfo.phone}
                onChange={handleInputChange}
                required
              />
            </form>
          </div>

          {/* Cart Totals */}
          <div className="col-md-6">
            <h4 className="fw-bold">
              CART <span className="text-primary">TOTALS</span>
            </h4>
            <div className="mb-3">
              <p className="d-flex justify-content-between">
                <span>Subtotal</span> <strong>₹{subtotal.toFixed(2)}</strong>
              </p>
              <p className="d-flex justify-content-between">
                <span>Shipping Fee</span>{" "}
                <strong>₹{shippingFee.toFixed(2)}</strong>
              </p>
              <hr />
              <p className="d-flex justify-content-between fw-bold">
                <span>Total</span>{" "}
                <strong>₹{(subtotal + shippingFee).toFixed(2)}</strong>
              </p>
            </div>

            {/* Payment Method */}
            <h5 className="fw-bold">
              PAYMENT <span className="text-primary">METHOD</span>
            </h5>
            <div className="d-flex align-items-center gap-3 my-3">
              <label className="d-flex align-items-center gap-2">
                <input
                  type="radio"
                  name="payment"
                  value="stripe"
                  checked={paymentMethod === "stripe"}
                  onChange={() => setPaymentMethod("stripe")}
                />
                <img src="/stripe-logo.png" alt="Stripe" width="80" />
              </label>

              <label className="d-flex align-items-center gap-2">
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                />
                <span className="fw-bold">CASH ON DELIVERY</span>
              </label>
            </div>

            {/* Checkout */}
            {paymentMethod === "stripe" && (
              <Elements stripe={stripePromise}>
                <CheckoutForm
                  amount={subtotal + shippingFee}
                  shippingInfo={deliveryInfo}
                />
              </Elements>
            )}
            {paymentMethod === "cod" && (
              <div className="text-center">
                <button className="btn btn-dark w-100 py-2">
                  Confirm Order (Cash on Delivery)
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Checkout;
