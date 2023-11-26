import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { LuLogOut } from "react-icons/lu";
import { FaBookDead, FaUserCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";
import "./PatientHeader.css";
import { useNavigate } from "react-router-dom";

const Navbar = () => {

  const [patientData , ispatientData]= useState(
    JSON.parse(localStorage.getItem("patientData"))
  )
  
  // const patientData = ;

  const navigate = useNavigate();
  

  const [isSidebarOpen, setisSideabrOpen] = useState(false);
  const [isViewProfileOpen, setisViewProfileOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editedPatient, setEditedPatient] = useState({});

  const sidebarRef = useRef(null);

  const toggleMenu = () => {
    setisSideabrOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setisSideabrOpen(false);
  };

  const handleViewProfile = () => {
    setisViewProfileOpen(true);
    closeSidebar();
  };

  const handleLogout = () => {
    navigate("/");
    closeSidebar();
  };

  const handleEditClick = () => {
    setEditedPatient({
      SSN: patientData[0].SSN,
      fName: patientData[0].fName,
      mI: patientData[0].mI,
      lName: patientData[0].lName,
      age: patientData[0].age,
      gender: patientData[0].gender,
      race: patientData[0].race,
      occupationClass: patientData[0].occupationClass,
      medicalHistory: patientData[0].medicalHistory,
      phone: patientData[0].phone,
      address: patientData[0].address,
      userName: patientData[0].userName,
      userPassword: patientData[0].userPassword,
    });
    setIsEditOpen(true);
    closeSidebar();
  };

  const handleEditClose = () => {
    setIsEditOpen(false);
    setEditedPatient({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedPatient((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const { SSN, ...updateData } = editedPatient;
      if (!SSN) {
        console.error("Invalid SSN for patient update");
        return;
      }

      let body = { SSN: SSN };
      body = { SSN: SSN, ...updateData };
      await axios.put("http://localhost:3005/patient/update", body);

      console.log("Updated Patient Information:", editedPatient);
      toast.success("Information updated successfully!!");
        navigate('/')      


      // Fetch updated patient data
      const response = await axios.get(`http://localhost:3005/patient/${SSN}`);
      const updatedPatientData = response.data;
      ispatientData(updateData)  

      // Update local storage with the updated data
      localStorage.setItem("patientData", JSON.stringify(updatedPatientData));

      setIsEditOpen(false);
      setEditedPatient({
        SSN: "",
        fName: "",
        lName: "",
        password: "",
        age: "",
        gender: "",
        mI: "",
        address: "",
        phone: "",
        userName: "",
        userPassword: "",
        race: "",
        occupationClass: "",
        medicalHistory: "",
      });
    } catch (error) {
      console.error("Error updating patient information:", error);
      toast.error(error);

      if (error.response && error.response.status === 400) {
        console.error("Validation error details:", error.response.data.message);
        toast.error(error.response.data.message);
      } else {
        console.error("Axios error details:", error.response);
      }
    }
    
  };

  return (
    <div className="header">
      <div className="logo">
        <Link to="/">
          <h3 className="logoText">MyDoctor.com</h3>
        </Link>
      </div>

      <div className="navItems">
        <h2 className="nameHeadingOfPatient">
          {`Welcome back ${patientData[0].fName} ${patientData[0].lName}`}
        </h2>

        <Link to="" className="user-link">
          <FaUserCircle className="user-icon" onClick={toggleMenu} />
        </Link>
      </div>

      {isSidebarOpen && (
        <div className="sidebar">
          <button className="logoutButton" onClick={handleEditClick}>
            {" "}
            Edit Profile{" "}
          </button>
          <button className="logoutButton" onClick={handleViewProfile}>
            {" "}
            View Profile <LuLogOut />{" "}
          </button>
          <button className="logoutButton" onClick={handleLogout}>
            {" "}
            LogOut <LuLogOut />{" "}
          </button>
        </div>
      )}

      {/* Edit Popup */}
      {isEditOpen && (
        <div className="patientedit-popup">
          <h3>Edit Your Information</h3>
          <form className="SignUpForm" onSubmit={handleFormSubmit}>
            <div className="formRow">
              <div className="formField">
                <label>First Name:</label>
                <input
                  type="text"
                  name="fName"
                  placeholder="Enter first name"
                  value={editedPatient.fName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="formField">
                <label>Middle Initial:</label>
                <input
                  type="text"
                  name="mI"
                  placeholder="Enter middle initial"
                  value={editedPatient.mI}
                  onChange={handleInputChange}
                />
              </div>

              <div className="formField">
                <label>Last Name:</label>
                <input
                  type="text"
                  name="lName"
                  placeholder="Enter last name"
                  value={editedPatient.lName}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="formRow">
              <div className="formField">
                <label>Social Security Number:</label>
                <input
                  type="text"
                  name="SSN"
                  placeholder="Enter your SSN"
                  value={editedPatient.SSN}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="formField">
                <label>Age:</label>
                <input
                  type="text"
                  name="age"
                  placeholder="Enter age"
                  value={editedPatient.age}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="formField">
                <label>Gender:</label>
                <select
                  name="gender"
                  value={editedPatient.gender}
                  onChange={handleInputChange}
                  required
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </div>

            <div className="formRow">
              <div className="formField">
                <label>Race:</label>
                <input
                  type="text"
                  name="race"
                  placeholder="Enter your race"
                  value={editedPatient.race}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="formField">
                <label>Occupation:</label>
                <input
                  type="text"
                  name="occupationClass"
                  placeholder="Enter your occupation"
                  value={editedPatient.occupationClass}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="formField">
                <label>Medical History:</label>
                <input
                  type="text"
                  name="medicalHistory"
                  placeholder="Enter your medical history"
                  value={editedPatient.medicalHistory}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="formRow">
              <div className="formField">
                <label>Address:</label>
                <input
                  type="text"
                  name="address"
                  placeholder="Enter address"
                  value={editedPatient.address}
                  onChange={handleInputChange}
                />
              </div>

              <div className="formField">
                <label>Phone:</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Enter phone number"
                  value={editedPatient.phone}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="formRow">
              <div className="formField">
                <label>Username:</label>
                <input
                  type="text"
                  name="userName"
                  placeholder="Enter username"
                  value={editedPatient.userName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="formField">
                <label>Password:</label>
                <input
                  type="password"
                  name="userPassword"
                  placeholder="Enter your password"
                  value={editedPatient.userPassword}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="formRow">
              <button type="submit">Update</button>
              <button type="button" onClick={handleEditClose}>
                Close
              </button>
            </div>
          </form>
        </div>
      )}
      {/* View Profile Popup */}
      {isViewProfileOpen && (
        <div className="popup">
          <h3>Your Profile</h3>
          <div>
            <p>{`SSN: ${patientData[0].SSN}`}</p>
            <p>{`First Name: ${patientData[0].fName}`}</p>
            <p>{`Mi: ${patientData[0].mI}`}</p>
            <p>{`Last Name : ${patientData[0].lName}`}</p>
            <p>{`UserName: ${patientData[0].userName}`}</p>
            <p>{`Password: ${patientData[0].userPassword}`}</p>
            <p>{`Age: ${patientData[0].age}`}</p>
            <p>{`Gender: ${patientData[0].gender}`}</p>
            <p>{`Occupation: ${patientData[0].occupationClass}`}</p>
            <p>{`Phone: ${patientData[0].phone}`}</p>
            <p>{`Address: ${patientData[0].address}`}</p>
          </div>
          <button type="button" onClick={() => setisViewProfileOpen(false)}>
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
