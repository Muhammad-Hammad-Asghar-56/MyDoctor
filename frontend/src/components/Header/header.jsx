import React from "react";
// import "./Header.css";
import { Link } from "react-router-dom";
import "./header.css";
const Navbar = () => {
  return (
    <div className="header">
      <div className="logo">
        <Link to="/">
          <h3 className="logoText">MyDoctor.com</h3>
        </Link>
      </div>

      <div className="navItems">
        <button type="button" className="button nursebutton">Nurses</button>
        <button type="button" className="button">Vaccines</button>
      </div>
    </div>
  );
};

export default Navbar;
