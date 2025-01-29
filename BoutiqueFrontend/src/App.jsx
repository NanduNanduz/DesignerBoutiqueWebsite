import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes } from "react-router-dom";
import Login from './components/Login';

const App = () => {
  return (
    <div>
      {/* <Home/> */}
      <Navbar/>
      
      <Routes>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </div>
  );
}

export default App
