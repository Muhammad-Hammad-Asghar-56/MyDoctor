import React, { useEffect, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";
import Header from "../../components/Header/Adminheader";

// import "./NurseSection.css";
import "./NurseSection.css";

import { Link } from "react-router-dom";
import axios from "axios";

const NursesSection = () => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editedNurse, setEditedNurse] = useState({
    searchId: "", // Add the nurse ID to the state
    fName: "",
    lName: "",
    password: "",
    age: "",
    gender: "",
    mI: "",
    userName: "",
  });

  const [nurses, setNurses] = useState([]);
  const [editedNurseId, setEditedNurseId] = useState(null); // New state to track edited nurse ID

  // FETCH DATA TO SHOW NURSES ON THE SCREEN
  const fetchNurseData = async () => {
    try {
      const response = await axios.get("http://localhost:3005/admin/getNurses");
      setNurses(response.data.nurses);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchNurseData();
  }, []);

  const handleEditClick = (nurse) => {
    setEditedNurseId(nurse.id);
    setEditedNurse({
      id: nurse.id,
      fName: nurse.fName,
      lName: nurse.lName,
      password: nurse.password,
      age: nurse.age,
      gender: nurse.gender,
      mI: nurse.mI,
      userName: nurse.userName,
    });
    setIsEditOpen(true);
  };

  const handleEditClose = () => {
    setIsEditOpen(false);
    setEditedNurseId(null);
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
      // Exclude phone and address from the update if they shouldn't be modified

      const { phone, address, id, ...updateData } = editedNurse;
      console.log(id);
      // Check if the ID is present and not empty
      if (!id) {
        console.error("Invalid ID for nurse update");
        // Handle the case where the ID is missing or empty, e.g., show an error message to the user
        return;
      }

      let body = { searchId: id };
      body = { searchId: id, ...updateData };
      await axios.put("http://localhost:3005/nurse/update", body);

      console.log("Updated Nurse Information:", editedNurse);
      setIsEditOpen(false);
      setEditedNurseId(null);
      fetchNurseData();
    } catch (error) {
      console.error("Error updating nurse information:", error);

      // Check if the error is due to validation issues (400 Bad Request)
      if (error.response && error.response.status === 400) {
        console.error("Validation error details:", error.response.data.message);
        // Handle validation error, e.g., display error messages to the user
      } else {
        console.error("Axios error details:", error.response);
        // Handle other types of errors
      }
    }
  };

  const handleDeleteClick = async (employeeId) => {
    try {
      await axios.delete("http://localhost:3005/nurse/delete", {
        data: { id: employeeId },
      });
      console.log("Deleted Nurse with ID:", employeeId);

      const updatedData = await axios.get(
        "http://localhost:3005/admin/getNurses"
      );
      setNurses(updatedData.data.nurses);
    } catch (error) {
      console.error("Error deleting nurse:", error);

      // Handle other types of errors
    }
  };

  return (
    <>
      <Header />
      <div className="container nurseSectionnnnnnnnn">
        {/* ... (your existing code) */}

        <Link to="/admin/newNurse">
          <button className="addnewnurseBtn">Add New Nurse</button>
        </Link>

        {/* nurse section */}
        <div className="nurseSection">
          {nurses.map((nurse, index) => (
            <div className="card" key={index}>
              <button
                className="edit-button"
                onClick={() => handleEditClick(nurse)}
              >
                <AiOutlineEdit />
              </button>

              {/* delte button */}
              <button
                className="delete-button"
                onClick={() => handleDeleteClick(nurse.id)}
              >
                <AiOutlineDelete />
              </button>

              <h6>User Name: {nurse.userName}</h6>
              <h6>Password:{nurse.password}</h6>
              <h6>Age: {nurse.age}</h6>
              <h6>Gender:{nurse.gender}</h6>
              <h6>Phone#: {nurse.phone}</h6>
              <h6>Address:{nurse.address}</h6>
              <h6>MI: {nurse.mI}</h6>
            </div>
          ))}
        </div>

        {/* Edit Pop-up */}
        {isEditOpen && (
          <div className="edit-popup">
            <h3>Edit Nurse Information</h3>
            <form onSubmit={handleFormSubmit} className="fform">
              <label>
                First Name:
                <input
                  type="text"
                  name="fName"
                  value={editedNurse.fName || ""}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Last Name:
                <input
                  type="text"
                  name="lName"
                  value={editedNurse.lName || ""}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Password:
                <input
                  type="text"
                  name="password"
                  value={editedNurse.password || ""}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Age:
                <input
                  type="text"
                  name="age"
                  value={editedNurse.age || ""}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Gender:
                <input
                  type="text"
                  name="gender"
                  value={editedNurse.gender || ""}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                MI:
                <input
                  type="text"
                  name="mI"
                  value={editedNurse.mI || ""}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                UserName:
                <input
                  type="text"
                  name="userName"
                  value={editedNurse.userName || ""}
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
    </>
  );
};

export default NursesSection;
