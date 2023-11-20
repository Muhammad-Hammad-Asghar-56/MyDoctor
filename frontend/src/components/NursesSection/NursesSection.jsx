import React, { useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import "./NurseSection.css";
import { Link } from "react-router-dom";

const NursesSection = () => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editedNurse, setEditedNurse] = useState({
    name: "",
    age: "",
    mi: "",
  });

  const handleEditClick = (nurse) => {
    setEditedNurse({
      name: nurse.name,
      age: nurse.age,
      mi: nurse.mi,
    });
    setIsEditOpen(true);
  };

  const handleEditClose = () => {
    setIsEditOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedNurse((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Add logic to update nurse information in the backend if needed
    console.log("Updated Nurse Information:", editedNurse);
    setIsEditOpen(false);
  };

  return (
    <div className="container nurseSectionnnnnnnnn">
      <div className="Separator"></div>

      <div className="nursesectionHeader">
        <div className="nurseSectionLogo">
          <h4>Nurse Section</h4>
        </div>
        <div>
          <Link to="/newNurse">
            <button className="button">Add Nurse</button>
          </Link>
        </div>
      </div>

      {/* nurse section */}
      <div className="nurseSection">
        {/* Nurse 1 */}
        <div className="card">
          <button className="edit-button" onClick={() => handleEditClick({ name: "Umar Jamil", age: "12", mi: "Unknown" })}>
            <AiOutlineEdit />
          </button>
          <h6>Name: Umar Jamil</h6>
          <h6>Age: 12</h6>
          <h6>MI: Unknown</h6>
          <h6>Gender: Unknown</h6>
          <h6>Phone: 090129012</h6>
          <h6>Address: Akram Park band Road LAhorw</h6>
        </div>

        <div className="card">
          <button className="edit-button" onClick={() => handleEditClick({ name: "Umar Jamil", age: "12", mi: "Unknown" })}>
            <AiOutlineEdit />
          </button>
          <h6>Name: Umar Jamil</h6>
          <h6>Age: 12</h6>
          <h6>MI: Unknown</h6>
          <h6>Gender: Unknown</h6>
          <h6>Phone: 090129012</h6>
          <h6>Address: Akram Park band Road LAhorw</h6>
        </div>


        <div className="card">
          <button className="edit-button" onClick={() => handleEditClick({ name: "Umar Jamil", age: "12", mi: "Unknown" })}>
            <AiOutlineEdit />
          </button>
          <h6>Name: Umar Jamil</h6>
          <h6>Age: 12</h6>
          <h6>MI: Unknown</h6>
          <h6>Gender: Unknown</h6>
          <h6>Phone: 090129012</h6>
          <h6>Address: Akram Park band Road LAhorw</h6>
        </div>
        <div className="card">
          <button className="edit-button" onClick={() => handleEditClick({ name: "Umar Jamil", age: "12", mi: "Unknown" })}>
            <AiOutlineEdit />
          </button>
          <h6>Name: Umar Jamil</h6>
          <h6>Age: 12</h6>
          <h6>MI: Unknown</h6>
          <h6>Gender: Unknown</h6>
          <h6>Phone: 090129012</h6>
          <h6>Address: Akram Park band Road LAhorw</h6>
        </div>
        <div className="card">
          <button className="edit-button" onClick={() => handleEditClick({ name: "Umar Jamil", age: "12", mi: "Unknown" })}>
            <AiOutlineEdit />
          </button>
          <h6>Name: Umar Jamil</h6>
          <h6>Age: 12</h6>
          <h6>MI: Unknown</h6>
          <h6>Gender: Unknown</h6>
          <h6>Phone: 090129012</h6>
          <h6>Address: Akram Park band Road LAhorw</h6>
        </div>
        <div className="card">
          <button className="edit-button" onClick={() => handleEditClick({ name: "Umar Jamil", age: "12", mi: "Unknown" })}>
            <AiOutlineEdit />
          </button>
          <h6>Name: Umar Jamil</h6>
          <h6>Age: 12</h6>
          <h6>MI: Unknown</h6>
          <h6>Gender: Unknown</h6>
          <h6>Phone: 090129012</h6>
          <h6>Address: Akram Park band Road LAhorw</h6>
        </div>
        <div className="card">
          <button className="edit-button" onClick={() => handleEditClick({ name: "Umar Jamil", age: "12", mi: "Unknown" })}>
            <AiOutlineEdit />
          </button>
          <h6>Name: Umar Jamil</h6>
          <h6>Age: 12</h6>
          <h6>MI: Unknown</h6>
          <h6>Gender: Unknown</h6>
          <h6>Phone: 090129012</h6>
          <h6>Address: Akram Park band Road LAhorw</h6>
        </div>
        <div className="card">
          <button className="edit-button" onClick={() => handleEditClick({ name: "Umar Jamil", age: "12", mi: "Unknown" })}>
            <AiOutlineEdit />
          </button>
          <h6>Name: Umar Jamil</h6>
          <h6>Age: 12</h6>
          <h6>MI: Unknown</h6>
          <h6>Gender: Unknown</h6>
          <h6>Phone: 090129012</h6>
          <h6>Address: Akram Park band Road LAhorw</h6>
        </div>

        <div className="card">
          <button className="edit-button" onClick={() => handleEditClick({ name: "Umar Jamil", age: "12", mi: "Unknown" })}>
            <AiOutlineEdit />
          </button>
          <h6>Name: Umar Jamil</h6>
          <h6>Age: 12</h6>
          <h6>MI: Unknown</h6>
          <h6>Gender: Unknown</h6>
          <h6>Phone: 090129012</h6>
          <h6>Address: Akram Park band Road LAhorw</h6>
        </div>

        {/* Nurse 2 */}
        <div className="card">
          <button className="edit-button" onClick={() => handleEditClick({ name: "Another Nurse", age: "25", mi: "Known" })}>
            <AiOutlineEdit />
          </button>
          <h6>Name: Another Nurse</h6>
          <h6>Age: 25</h6>
          <h6>MI: Known</h6>
          <h6>Gender: Unknown</h6>
          <h6>Phone: 090129013</h6>
          <h6>Address: Some Address</h6>
        </div>

        {/* More nurses go here... */}

      </div>

      {/* Edit Pop-up */}
      {isEditOpen && (
        <div className="edit-popup">
          <h3>Edit Nurse Information</h3>
          <form onSubmit={handleFormSubmit}>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={editedNurse.name}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Age:
              <input
                type="text"
                name="age"
                value={editedNurse.age}
                onChange={handleInputChange}
              />
            </label>
            <label>
              MI:
              <input
                type="text"
                name="mi"
                value={editedNurse.mi}
                onChange={handleInputChange}
              />
            </label>
            <button type="submit">Save Changes</button>
            <button type="button" onClick={handleEditClose}>Close</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default NursesSection;
