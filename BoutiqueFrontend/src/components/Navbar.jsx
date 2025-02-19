
// import { Link } from "react-router-dom";
// import { useState, useEffect } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faHeart, faUser } from "@fortawesome/free-regular-svg-icons";
// import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
// import axios from "axios";

// const Navbar = () => {
//   const [userRole, setUserRole] = useState(null);
//   const [cartCount, setCartCount] = useState(0);

//   useEffect(() => {
//     const role = sessionStorage.getItem("role");
//     if (role) {
//       setUserRole(role);
//     }

//     loadCartCount();
//   }, []);

//   const loadCartCount = async () => {
//     try {
//       const token = sessionStorage.getItem("logintoken");
//       if (!token) return;

//       const response = await axios.get(
//         `${import.meta.env.VITE_API_URL}/cart/cartlist`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       setCartCount(response.data.length);
//     } catch (error) {
//       console.error("Error fetching cart count:", error);
//     }
//   };

//   const handleLogout = () => {
//     sessionStorage.clear();
//     setUserRole(null);
//     window.location.href = "/";
//   };

//   return (
//     <nav
//       className="navbar navbar-expand-lg text-uppercase fs-6 p-3 border-bottom align-items-center"
//       style={{ backgroundColor: "#EED9C4", color: "white" }}
//     >
//       <div className="container-fluid">
//         {/* Logo */}
//         <a className="navbar-brand" href="/">
//           <svg width="250" height="70" viewBox="0 0 250 70">
//             <text
//               x="10"
//               y="50"
//               fontFamily="Arial, sans-serif"
//               fontSize="34"
//               fontWeight="bold"
//             >
//               <tspan fill="#3A2D28">T</tspan>
//               <tspan fill="#A48374">r</tspan>
//               <tspan fill="#CBAD8D">e</tspan>
//               <tspan fill="#D1C7BD">n</tspan>
//               <tspan fill="#D1C7BD">d</tspan>
//               <tspan fill="#D1C374">o</tspan>
//               <tspan fill="#CBAD8D">r</tspan>
//               <tspan fill="#A48374">a</tspan>
//             </text>
//           </svg>
//         </a>

//         {/* Admin View: Only show logo & logout */}
//         {userRole === "admin" ? (
//           <div className="ms-auto">
//             <Link to="/" className="text-dark" onClick={handleLogout}>
//               Logout
//             </Link>
//           </div>
//         ) : (
//           <>
//             <button
//               className="navbar-toggler"
//               type="button"
//               data-bs-toggle="collapse"
//               data-bs-target="#navbarNav"
//             >
//               <span className="navbar-toggler-icon" />
//             </button>

//             <div className="collapse navbar-collapse" id="navbarNav">
//               <ul className="navbar-nav mx-auto gap-4">
//                 <li className="nav-item">
//                   <Link className="nav-link" to="/">
//                     Home
//                   </Link>
//                 </li>
//                 <li className="nav-item dropdown">
//                   <a
//                     className="nav-link dropdown-toggle"
//                     href="#"
//                     data-bs-toggle="dropdown"
//                   >
//                     Shop
//                   </a>
//                   <ul className="dropdown-menu">
//                     <li>
//                       <Link className="dropdown-item" to="/kurti">
//                         Kurti
//                       </Link>
//                     </li>
//                     <li>
//                       <Link className="dropdown-item" to="/lehenga">
//                         Lehenga
//                       </Link>
//                     </li>
//                     <li>
//                       <Link className="dropdown-item" to="/saree">
//                         Saree
//                       </Link>
//                     </li>
//                   </ul>
//                 </li>
//                 <li className="nav-item">
//                   <Link className="nav-link" to="/#newcollections">
//                     New Collections
//                   </Link>
//                 </li>
//                 <li className="nav-item">
//                   <Link className="nav-link" to="/#bookappointment">
//                     Customized
//                   </Link>
//                 </li>

//               </ul>

//               {/* Right side icons */}
//               <div className="d-flex align-items-center gap-3">
//                 {userRole === "user" && (
//                   <>
//                     <Link to="/profile" className="text-dark">
//                       <FontAwesomeIcon icon={faUser} size="lg" />
//                     </Link>

//                     <Link to="/cart" className="text-dark">
//                       <ShoppingCartOutlinedIcon
//                         style={{ fontSize: "1.5rem", color: "#333" }}
//                       />
//                       <span>({cartCount})</span>
//                     </Link>
//                   </>
//                 )}

//                 {userRole ? (
//                   <Link to="/" className="text-dark" onClick={handleLogout}>
//                     Logout
//                   </Link>
//                 ) : (
//                   <Link to="/login" className="text-dark">
//                     Login
//                   </Link>
//                 )}
//               </div>
//             </div>
//           </>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;




import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import axios from "axios";

const Navbar = () => {
  const [userRole, setUserRole] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const role = sessionStorage.getItem("role");
    if (role) {
      setUserRole(role);
    }
    loadCartCount();
  }, []);

  const loadCartCount = async () => {
    try {
      const token = sessionStorage.getItem("logintoken");
      if (!token) return;

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/cart/cartlist`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setCartCount(response.data.length);
    } catch (error) {
      console.error("Error fetching cart count:", error);
    }
  };

  const handleLogout = () => {
    sessionStorage.clear();
    setUserRole(null);
    window.location.href = "/";
  };

  // ✅ Function to handle smooth scrolling manually
  const handleNavClick = (sectionId) => {
    if (location.pathname === "/") {
      // If already on home, just scroll smoothly
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // If on another page, navigate to home first, then scroll
      navigate(`/#${sectionId}`);
    }
  };

  return (
    <nav
      className="navbar navbar-expand-lg text-uppercase fs-6 p-3 border-bottom align-items-center"
      style={{ backgroundColor: "#EED9C4", color: "white" }}
    >
      <div className="container-fluid">
        {/* Logo */}
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

        {userRole === "admin" ? (
          <div className="ms-auto">
            <Link to="/" className="text-dark" onClick={handleLogout}>
              Logout
            </Link>
          </div>
        ) : (
          <>
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
                  <button
                    className="nav-link nav-item btn btn-link"
                    onClick={() => handleNavClick("newcollections")}
                  >
                    New Collections
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className="nav-link btn btn-link "
                    onClick={() => handleNavClick("bookappointment")}
                  >
                    Customized
                  </button>
                </li>
              </ul>

              {/* Right side icons */}
              <div className="d-flex align-items-center gap-3">
                {userRole === "user" && (
                  <>
                    <Link to="/profile" className="text-dark">
                      <FontAwesomeIcon icon={faUser} size="lg" />
                    </Link>

                    <Link to="/cart" className="text-dark">
                      <ShoppingCartOutlinedIcon
                        style={{ fontSize: "1.5rem", color: "#333" }}
                      />
                      <span>({cartCount})</span>
                    </Link>
                  </>
                )}

                {userRole ? (
                  <Link
                    to="/"
                    className="text-dark nav-link btn btn-link"
                    onClick={handleLogout}
                  >
                    Logout
                  </Link>
                ) : (
                  <Link to="/login" className="text-dark nav-link btn btn-link">
                    Login
                  </Link>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
