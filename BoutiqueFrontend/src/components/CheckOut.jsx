
import { useLocation } from "react-router-dom";
import { useState } from "react";
import Footer from "../components/Footer";

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
                  value="razorpay"
                  checked={paymentMethod === "razorpay"}
                  onChange={() => setPaymentMethod("razorpay")}
                />
                <img src="/razorpay-logo.png" alt="Razorpay" width="80" />
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

            {/* Place Order Button */}
            <button className="btn btn-dark w-100 py-2">PLACE ORDER</button>
          </div>
        </div>
      </div>

      {/* Footer placed outside the container */}
      <Footer />
    </>
  );
};

export default Checkout;
