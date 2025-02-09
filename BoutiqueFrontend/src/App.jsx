import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes } from "react-router-dom";
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import Main from './components/Main';
import Newcollections from './components/Newcollections';
import Bookappointment from './components/Bookappointment';
import Kurti from './components/Kurti';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/new-collections" element={<Newcollections />}></Route>
        <Route path="/book-appointment" element={<Bookappointment />}></Route>
        <Route path="/kurti" element={<Main child={<Kurti />} />}></Route>

        <Route path="/" element={<Main child={<Home />} />}></Route>
      </Routes>
    </div>
  );
}

export default App
