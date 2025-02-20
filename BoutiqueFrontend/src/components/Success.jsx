import { Link } from "react-router-dom";
import Footer from "../components/Footer";

const Success = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="container text-center my-5 flex-grow-1">
        <h2 className="fw-bold " style={{ color: "#A48374" }}>
          Payment Successful!
        </h2>
        <p className="lead">
          Thank you for your order. Your payment has been received.
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

export default Success;
