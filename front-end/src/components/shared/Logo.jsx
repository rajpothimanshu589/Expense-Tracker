import React from "react";
import { Link } from "react-router-dom";
// import LogoImg from "../../assets/expenselogo.png";
const Logo = () => {
  return (
    <Link to="/">
      <img src='./src/assets/expenselogo.png' alt="logo" className="w-[52px]"  />
    </Link>
  );
};

export default Logo;

