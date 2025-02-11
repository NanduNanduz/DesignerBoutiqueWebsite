import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faUser } from "@fortawesome/free-regular-svg-icons"; // Outline icons
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

const Navbar = () => {


const getCartCount = () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  return cart.length;
};



  return (
    <nav
      className="navbar navbar-expand-lg text-uppercase fs-6 p-3 border-bottom align-items-center"
      style={{ backgroundColor: "#EED9C4", color: "white" }}
    >
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <svg width="250" height="70" viewBox="0 0 250 70">
            <text
              x="10"
              y="50"
              fontFamily="Arial, sans-serif"
              fontSize="34"
              fontWeight="bold"
            >
              <tspan fill="#3A2D28">T</tspan>
              <tspan fill="#A48374">r</tspan>
              <tspan fill="#CBAD8D">e</tspan>
              <tspan fill="#D1C7BD">n</tspan>
              <tspan fill="#D1C7BD">d</tspan>
              <tspan fill="#D1C374">o</tspan>
              <tspan fill="#CBAD8D">r</tspan>
              <tspan fill="#A48374">a</tspan>
            </text>
          </svg>
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto gap-4">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                data-bs-toggle="dropdown"
              >
                Shop
              </a>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to="/kurti">
                    Kurti
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/lehenga">
                    Lehenga
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/saree">
                    Saree
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/new-collections">
                New Collections
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/book-appointment">
                Customized
              </Link>
            </li>
          </ul>

          {/* Icons Section */}
          <div className="d-flex align-items-center gap-3">
            <Link to="/profile" className="text-dark">
              <FontAwesomeIcon icon={faUser} size="lg" />
            </Link>
            <Link to="/wishlist" className="text-dark position-relative">
              <FontAwesomeIcon icon={faHeart} size="lg" />
              <span className="ms-1">(0)</span>
            </Link>
            <Link to="/cart" className="text-dark">
              <ShoppingCartOutlinedIcon
                style={{ fontSize: "1.5rem", color: "#333" }}
              />
              <span>({getCartCount()})</span>
            </Link>
            <Link to="/login" className="text-dark">
              Logout
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
