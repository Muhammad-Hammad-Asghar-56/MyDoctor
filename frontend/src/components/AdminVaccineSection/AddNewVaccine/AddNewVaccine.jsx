import React from "react";
import "./AddNewVaccine.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "../../../components/Header/Adminheader";

const AddNewVaccine = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    manufacturer: "",
    dose_Required: "",
    timeFrame: "",
    description: "Male",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3005/vaccine/createVaccine",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;

      if (data.success) {
        console.log("Vacin added successfully:", data.vaccine);
        navigate("/vaccines");
        toast.success("Vaccine Added Successfully..");
      } else {
        console.error("Error adding vaccine:", data.message);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <>
      <Header />
      <div>
        <div className="TextSection">
          <h1>Add a new vaccine</h1>
          <p>Fill in the details to add a new vaccine</p>
        </div>

        <form className="SearchForm" onSubmit={handleSubmit}>
          <div className="formRow">
            <div className="formField">
              <label>Name:</label>
              <input
                type="text"
                name="name"
                placeholder="Enter vacccine name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="formField">
              <label>Manufacturer:</label>
              <input
                type="text"
                name="manufacturer"
                placeholder="Enter manufacturer name"
                value={formData.manufacturer}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="formRow">
            <div className="formField">
              <label>Dose Requierd</label>
              <input
                type="number"
                name="dose_Required"
                placeholder="Enter Dose Required"
                value={formData.dose_Required}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="formField">
              <label>Time Frame</label>
              <input
                type="number"
                name="timeFrame"
                placeholder="Enter time Frame"
                value={formData.timeFrame}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="formRow">
            <div className="formField">
              <label>Description:</label>
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter description of vaccine"
              />
            </div>
          </div>

          <div className="formRow">
            <button type="submit">Add Vaccine</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddNewVaccine;
