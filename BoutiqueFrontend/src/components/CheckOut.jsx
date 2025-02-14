


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

const CheckoutForm = ({ amount }) => {
  const navigate = useNavigate(); 
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Sending Amount to Backend:", amount);
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/users/payment`,
        { amount },
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("Response from Backend:", response.data);
      const { clientSecret } = response.data;
      if (!clientSecret) {
        throw new Error("Failed to retrieve client secret.");
      }

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

        //  Call API to clear cart after payment success
        await axios.delete(`${import.meta.env.VITE_API_URL}/cart/clearcart`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("logintoken")}`,
          },
        });

        setTimeout(() => navigate("/success"), 1000);
      }
    } catch (err) {
      console.error("Error:", err);
      setError("Payment failed. Please try again.");
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
                    required
                  />
                </div>
                <div className="col">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Last name"
                    required
                  />
                </div>
              </div>
              <input
                type="email"
                className="form-control mb-3"
                placeholder="Email address"
                required
              />
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Street"
                required
              />
              <div className="row mb-3">
                <div className="col">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="City"
                    required
                  />
                </div>
                <div className="col">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="State"
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
                    required
                  />
                </div>
                <div className="col">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Country"
                    required
                  />
                </div>
              </div>
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Phone"
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
                <span>Subtotal</span> <strong>${subtotal.toFixed(2)}</strong>
              </p>
              <p className="d-flex justify-content-between">
                <span>Shipping Fee</span>{" "}
                <strong>${shippingFee.toFixed(2)}</strong>
              </p>
              <hr />
              <p className="d-flex justify-content-between fw-bold">
                <span>Total</span>{" "}
                <strong>${(subtotal + shippingFee).toFixed(2)}</strong>
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

            {paymentMethod === "stripe" && (
              <Elements stripe={stripePromise}>
                <CheckoutForm
                  amount={parseFloat(subtotal) + parseFloat(shippingFee)}
                />
              </Elements>
            )}

            {paymentMethod !== "stripe" && (
              <button className="btn btn-dark w-100 py-2">PLACE ORDER</button>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Checkout;
