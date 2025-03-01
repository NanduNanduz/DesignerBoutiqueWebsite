import { Link } from "react-router-dom";
import Footer from "../components/Footer";

const OrderPlaced = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="container text-center my-5 flex-grow-1">
        <h2 className="fw-bold " style={{ color: "#A48374" }}>
          Order Placed Successfully!
        </h2>
        <p className="lead">
          Thank you for your order. Your order has been placed and will be
          processed soon.
        </p>
        <div>
          <Link to="/" className="btn btn-dark" style={{ color: "#A48374" }}>
            Back to Home
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OrderPlaced;
