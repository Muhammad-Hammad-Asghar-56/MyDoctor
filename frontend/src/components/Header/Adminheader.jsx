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
        <Link to = '/admin/nurses'>
        <button type="button" className="button ">Nurses</button>
        </Link>
        <Link to = '/admin/vaccines'>
        <button type="button" className="button">Vaccines</button>
        </Link>
        <Link to = '/admin/Campaign'>
        <button type="button" className="button ">Vaccine Campaign</button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
