import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ScrollToSection = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Extract the hash (e.g., #bookappointment)
    const hash = location.hash;

    // If there's a hash, wait for navigation, then scroll
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, [location]);

  // Redirect to home (if not already there)
  useEffect(() => {
    if (location.pathname !== "/") {
      navigate("/" + location.hash, { replace: true });
    }
  }, [location, navigate]);

  return null; // This component doesn't render anything
};

export default ScrollToSection;
