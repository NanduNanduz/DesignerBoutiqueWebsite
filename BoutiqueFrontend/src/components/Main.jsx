import React from "react";
import Navbar from "../components/Navbar";

const Main = ({ child }) => {
  return (
    <div>
      <Navbar />
      {child}
    </div>
  );
};

export default Main;
