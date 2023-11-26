import React, { useEffect, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";
import "./VaccineSection.css";
import { Link } from "react-router-dom";
import axios from "axios";
import {toast} from 'react-toastify'

const VaccineSection = () => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editedVaccine, setEditedVaccine] = useState({
    id: "",
    name: "",
    manufacturer: "",
    dose_Required: "",
    timeFrame: "",
    description: "",
  });

  const [vaccines, setVaccines] = useState([]);
  const [editedVaccineId, setEditedVaccineId] = useState(null); // New state to track edited nurse ID


  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3005/vaccine/getList"
      );
      setVaccines(response.data.vaccines);
      console.log(response.data.vaccines);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  // FETCH DATA TO SHOW vaccines ON THE SCREEN
  useEffect(() => {

    fetchData();
  }, []);

  // // --------------------------EDIT NURSE SCREEEN-------------------------------------------
  const handleEditClick = (vaccine) => {
    setEditedVaccineId(vaccine.id);
    setEditedVaccine({
      id: vaccine.id,
      name: vaccine.name,
      manufacturer: vaccine.manufacturer,
      dose_Required: vaccine.dose_Required,
      timeFrame: vaccine.timeFrame,
      description: vaccine.description,
    });
    setIsEditOpen(true);
  };

  const handleEditClose = () => {
    setIsEditOpen(false);
    setEditedVaccineId(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedVaccine((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const {id , ...updateData } = editedVaccine;
      console.log(id);
      if (!id) {
        console.error("Invalid ID for vaccine update");
        return;
      }

      let body = {  };
      body = {searchId: id,  ...updateData , };
      await axios.put("http://localhost:3005/vaccine/updateVaccine", body);
      console.log("Updated vaccine Information:", editedVaccine);
      toast.success("Updated Successfully");
      setIsEditOpen(false);
      setEditedVaccineId(null);
      fetchData();
    } catch (error) {
      console.error("Error updating vacccine information:", error);
      toast.error("Error updating vacccine information");

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

  // --------------------------Delete Vaccine-------------------------------------------

  const handleDeleteClick = async (id) => {
    console.log(id);
    try {
      // Send a request to delete the nurse
      await axios.delete("http://localhost:3005/vaccine/delete", {
        data: { id: id },
      });
      console.log("Deleted Vaccine with ID:", id);
      const updatedData = await axios.get(
        "http://localhost:3005/vaccine/getList"
      );
      setVaccines(updatedData.data.vaccines);
    } catch (error) {
      console.error("Error deleting vaccine:", error);
    }
  };

  return (
    <div className="container vaccinesectionnnnnnnnn">
      {/* Add new nurse */}
      <Link to="/admin/newVaccine">
        <button className="addnewnurseBtn">Add New Vaccine</button>
      </Link>

      {/* nurse section */}
      <div className="vaccinesection">
        {vaccines.map((vaccine, index) => (
          <div className="card" key={index}>
            <button
              className="edit-button"
              onClick={() => handleEditClick(vaccine)}
            >
              <AiOutlineEdit />
            </button>

            {/* delte button */}
            <button
              className="delete-button"
              onClick={() => handleDeleteClick(vaccine.id)}
            >
              <AiOutlineDelete />
            </button>

            <h6>Name: {vaccine.name}</h6>
            <h6>id: {vaccine.id}</h6>
            <h6>Manufacturer: {vaccine.manufacturer}</h6>
            <h6>Dose Required: {vaccine.dose_Required}</h6>
            <h6>TimeFrame: {vaccine.timeFrame}</h6>
            <h6>Description: {vaccine.description}</h6>
            {/* <h6>Availability: {vaccine.Availability.toString()}</h6> */}
            <h6>
              Availability:{" "}
              {vaccine.Availability ? "Available" : "Not Available"}
            </h6>
          </div>
        ))}
      </div>

      {/* Edit Pop-up */}
      {isEditOpen && (
        <div className="edit-popup">
          <h3>Edit Vaccine Information</h3>
          <form onSubmit={handleFormSubmit}>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={editedVaccine.name || ""}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Manufacturer:
              <input
                type="text"
                name="manufacturer"
                value={editedVaccine.manufacturer || ""}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Dose Required:
              <input
                type="number"
                name="dose_Required"
                value={editedVaccine.dose_Required || ""}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Time Frame:
              <input
                type="number"
                name="timeFrame"
                value={editedVaccine.timeFrame || ""}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Description:
              <input
                type="text"
                name="description"
                value={editedVaccine.description || ""}
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

export default VaccineSection;
