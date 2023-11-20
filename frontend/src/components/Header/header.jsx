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
        <Link to = '/nurses'>
        <button type="button" className="button nursebutton">Nurses</button>
        </Link>
        <Link to = '/vaccines'>
        <button type="button" className="button">Vaccines</button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
