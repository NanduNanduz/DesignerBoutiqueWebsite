import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes } from "react-router-dom";
import Login from './components/Login';
import Signup from './components/Signup';

const App = () => {
  return (
    <div>
      {/* <Home/> */}
      <Navbar/>

      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
      </Routes>
    </div>
  );
}

export default App
