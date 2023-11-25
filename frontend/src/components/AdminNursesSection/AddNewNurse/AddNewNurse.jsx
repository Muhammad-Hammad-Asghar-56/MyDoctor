import React from "react";
import "./AddNewNurse.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddNewNurse = () => {


  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    fName: "",
    mI: "",
    lName: "",
    age: "",
    gender: "Male",
    phone: "",
    address: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(formData.mI.length>1 || formData.mI.length < 1 )
    {
      toast.error("Middle Initial should be equal to 1 character")
    }
    try {
      const response = await axios.post(
        "http://localhost:3005/nurse/SignUp",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;

      if (data.success) {
        console.log("Nurse registered successfully:", data.nurse);
        navigate('/nurse')
        toast.success("Nurse Registered Successfully..")
        // Optionally, you can redirect the user or perform other actions upon successful registration.
      } else {
        console.error("Error registering nurse:", data.message);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div>
      <div className="TextSection">
        <h1>Register a New Nurse</h1>
        <p>Fill in the details to register a new nurse</p>
      </div>

      <form className="SearchForm" onSubmit={handleSubmit}>
        <div className="formRow">
          <div className="formField">
            <label>First Name:</label>
            <input
              type="text"
              name="fName"
              placeholder="Enter first name"
              value={formData.fName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="formField">
            <label>Last Name:</label>
            <input
              type="text"
              name="lName"
              placeholder="Enter last name"
              value={formData.lName}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="formRow">
          <div className="formField">
            <label>Middle Initial:</label>

            <input
              type="text"
              name="mI"
              value={formData.mI}
              onChange={handleInputChange}
              placeholder="Enter middle initial"
            />
          </div>
          <div className="formField">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter password"
              required
            />
          </div>
        </div>

        <div className="formRow">
          <div className="formField">
            <label>Age:</label>
            <input
              type="text"
              name="age"
              placeholder="Enter age"
              value={formData.age}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="formField">
            <label>Gender:</label>
            <select
              name="gender"
              value={formData.gender}
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
            <label>Address:</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Enter address"
            />
          </div>
          <div className="formField">
            <label>Phone:</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Enter phone number"
            />
          </div>
        </div>

        <div className="formRow">
          <button type="submit">Register Nurse</button>
        </div>
      </form>
    </div>
  );
};

export default AddNewNurse;
