// import React from 'react'
// import Navbar from './components/Navbar'
// import { Route, Routes } from "react-router-dom";
// import Login from './components/Login';
// import Signup from './components/Signup';
// import Home from './components/Home';
// import Main from './components/Main';
// import Newcollections from './components/Newcollections';
// import Bookappointment from './components/Bookappointment';
// import Kurti from './components/Kurti';
// import Product from './components/Product';
// import Lehenga from './components/Lehenga';
// import Saree from './components/Saree';
// import AdminDashboard from './components/AdminDashboard'

// const App = () => {
//   return (
//     <div>
//       <Routes>
//         <Route path="/login" element={<Login />}></Route>
//         <Route path="/signup" element={<Signup />}></Route>
//         <Route path="/new-collections" element={<Newcollections />}></Route>
//         <Route path="/book-appointment" element={<Bookappointment />}></Route>
//         <Route path="/kurti" element={<Main child={<Kurti />} />}></Route>
//         <Route path="/lehenga" element={<Main child={<Lehenga />} />}></Route>
//         <Route path="/saree" element={<Main child={<Saree />} />}></Route>

//         <Route
//           path="/product/:productId"
//           element={<Main child={<Product />} />}></Route>

//         <Route path="/" element={<Main child={<Home />} />}></Route>
//         <Route path="/admin-dashboard" element={<Main child={<AdminDashboard />} />}></Route>
//       </Routes>
//     </div>
//   );
// }

// export default App


import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import Main from "./components/Main";
import Newcollections from "./components/Newcollections";
import Bookappointment from "./components/Bookappointment";
import Kurti from "./components/Kurti";
import Product from "./components/Product";
import Lehenga from "./components/Lehenga";
import Saree from "./components/Saree";
import AdminDashboard from "./components/AdminDashboard";
import PrivateRoutes from "./components/PrivateRoutes"; 
import ProductItem from './components/ProductItem';
import Cart from './components/Cart'

const App = () => {
  return (
    <div>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/new-collections" element={<Newcollections />} />
        <Route path="/book-appointment" element={<Bookappointment />} />
        <Route path="/kurti" element={<Main child={<Kurti />} />} />
        <Route path="/lehenga" element={<Main child={<Lehenga />} />} />
        <Route path="/saree" element={<Main child={<Saree />} />} />
        <Route path="/product/:id" element={<Main child={<ProductItem />} />} />
        <Route path="/cart" element={<Main child={<Cart />} />} />

        <Route path="/" element={<Main child={<Home />} />} />

        {/*  Protected Admin Route */}
        <Route element={<PrivateRoutes requiredRole="admin" />}>
          <Route
            path="/admin-dashboard"
            element={<Main child={<AdminDashboard />} />}
          />
        </Route>
      </Routes>
    </div>
  );
};

export default App;

