import "./App.css";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import Main from "./components/Main";
import Newcollections from "./components/Newcollections";
import Bookappointment from "./components/Bookappointment";
import Kurti from "./components/Kurti";
import Lehenga from "./components/Lehenga";
import Saree from "./components/Saree";
import AdminDashboard from "./components/AdminDashboard";
import PrivateRoutes from "./components/PrivateRoutes";
import ProductItem from "./components/ProductItem";
import Cart from "./components/Cart";
import CheckOut from "./components/CheckOut";
import BookingForm from "./components/BookingForm";
import AddItem from "./components/AddItem";
import ListItem from "./components/ListItem";
import OrderItem from "./components/OrderItem";
import UserProfile from "./components/UserProfile";
import Success from "./components/Success";
import ThankYou from "./components/ThankYou";
import ScrollToSection from "./components/ScrollToSection";
import OrderPlaced from "./components/OrderPlaced";

const App = () => {
  return (
    <div>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Main child={<Login />} />} />
        <Route path="/signup" element={<Main child={<Signup />} />} />
        <Route path="/kurti" element={<Main child={<Kurti />} />} />
        <Route path="/lehenga" element={<Main child={<Lehenga />} />} />
        <Route path="/saree" element={<Main child={<Saree />} />} />
        <Route path="/product/:id" element={<Main child={<ProductItem />} />} />
        <Route path="/cart" element={<Main child={<Cart />} />} />
        <Route path="/checkout" element={<Main child={<CheckOut />} />} />
        <Route
          path="/schedule-appointment"
          element={<Main child={<BookingForm />} />}
        />
        <Route path="/add-item" element={<Main child={<AddItem />} />} />
        <Route path="/list-item" element={<Main child={<ListItem />} />} />
        <Route path="/order-item" element={<Main child={<OrderItem />} />} />
        <Route path="/profile" element={<Main child={<UserProfile />} />} />
        <Route path="/success" element={<Main child={<Success />} />} />
        <Route path="/thank-you" element={<Main child={<ThankYou />} />} />
        <Route path="/order-placed" element={<Main child={<OrderPlaced />} />} />

        <Route path="/" element={<Main child={<Home />} />} />
        <Route path="/*" element={<ScrollToSection />} />
        {/*  Protected Admin Route */}
        <Route
          path="/admin-dashboard"
          element={<PrivateRoutes requiredRole="admin" />}
        >
          <Route index element={<Main child={<AdminDashboard />} />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
