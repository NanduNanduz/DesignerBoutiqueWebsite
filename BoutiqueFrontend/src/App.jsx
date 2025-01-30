import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes } from "react-router-dom";
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import Main from './components/Main';

const App = () => {
  return (
    <div>

      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path='/signup' element={<Signup/>}></Route>

        
          <Route path='/' element={<Main child={<Home/>}/>}></Route>
        
      </Routes>
    </div>
  );
}

export default App
