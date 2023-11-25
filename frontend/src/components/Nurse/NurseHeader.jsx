import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { LuLogOut } from "react-icons/lu";
import { FaUserCircle } from "react-icons/fa";
import axios from 'axios';
import './NuseHeader.css'

const Navbar = () => {
  const nurseData = JSON.parse(localStorage.getItem("nurseData"));

  const [isSidebarOpen, setisSideabrOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editedNurse, setEditedNurse] = useState({
    searchId: "", // Assuming nurse ID is available
    address:"",
    phone:"",
  });

  const sidebarRef = useRef(null);

  const toogleMenu = () => {
    setisSideabrOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setisSideabrOpen(false);
  };

  const handleEditClick = (nurse) => {
    setEditedNurse({
      id: nurse.id,
      address: nurse.address,
      phone: nurse.phone
    });
    setIsEditOpen(true);
    closeSidebar();
  };

  const handleEditClose = () => {
    setIsEditOpen(false);
    setEditedNurse({
      address:"",
      phone:"",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedNurse((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const { id, ...updateData } = editedNurse;

      if (!id) {
        console.error("Invalid ID for nurse update");
        return;
      }

      let body = { searchId: id };
      body = { searchId: id, ...updateData };
      await axios.put("http://localhost:3005/nurse/update", body);

      console.log("Updated Nurse Information:", editedNurse);
      setIsEditOpen(false);
      setEditedNurse({
        id: "",
        fName: "",
        lName: "",
        password: "",
        age: "",
        gender: "",
        mI: "",
      });
      // Fetch updated nurse data or update the state accordingly
    } catch (error) {
      console.error("Error updating nurse information:", error);

      if (error.response && error.response.status === 400) {
        console.error("Validation error details:", error.response.data.message);
      } else {
        console.error("Axios error details:", error.response);
      }
    }
  };



  // ----------------------nurse navabr code---------------------------------------
  return (
    <div className="header">
      <div className="logo">
        <Link to="/">
          <h3 className="logoText">MyDoctor.com</h3>
        </Link>
      </div>

      <div className="navItems">
        <Link to="" className="user-link">
          <FaUserCircle className="user-icon" onClick={toogleMenu} />
        </Link>
      </div>

      {isSidebarOpen && (
        <div className="sidebar">
          <button className="logoutButton" onClick={closeSidebar}>
            {" "}
            Register Campaigns{" "}
          </button>
          <button className="logoutButton" onClick={() => handleEditClick(nurseData)}>
            {" "}
            Edit Profile{" "}
          </button>
          <button className="logoutButton" onClick={closeSidebar}>
            {" "}
            LogOut <LuLogOut />{" "}
          </button>
        </div>
      )}

      {/* Edit Popup */}
      {isEditOpen && (
        <div className="edit-popup">
          <h3>Edit Nurse Information</h3>
          <form onSubmit={handleFormSubmit} className="fform">
          <label>
              Address:
              <input
                type="text"
                name="address"
                value={editedNurse.address || ""}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Phone number:
              <input
                type="text"
                name="phone"
                value={editedNurse.phone || ""}
                onChange={handleInputChange}
              />
            </label>
            
            <button type="submit">Save Changes</button>
            <button type="button" onClick={handleEditClose}>
              Close
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Navbar;
