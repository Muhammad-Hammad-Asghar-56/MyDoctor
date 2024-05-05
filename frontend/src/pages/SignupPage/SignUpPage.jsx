import React from "react";
import "./SignUpPage.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3005/patient/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        const responseData = await response.json();

        localStorage.setItem(
          "patientData",
          JSON.stringify(responseData.patient)
        );

        toast.success("Sign up successfully!!");
        console.log(responseData);
        navigate("/login");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred. Please try again.");
      toast.error(error);

    }
  };

  const updateInputField = (e) => {
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setError("");
  };

  return (
    <div>
      <div className="TextSection">
        <h1>Sign Up</h1>
        <p>Fill in the details below to create your account</p>
      </div>

      <form className="SignUpForm" onSubmit={handleSubmit}>
        <div className="formRow">
          <div className="formField">
            <label>First Name:</label>
            <input
              type="text"
              name="fName"
              placeholder="Enter first name"
              value={data.fName }
              onChange={updateInputField}
              required
            />
          </div>

          <div className="formField">
            <label>Middle Initial:</label>
            <input
              type="text"
              name="mI"
              placeholder="Enter middle initial"
              value={data.mI }
              onChange={updateInputField}
            />
          </div>

          <div className="formField">
            <label>Last Name:</label>
            <input
              type="text"
              name="lName"
              placeholder="Enter last name"
              value={data.lName}
              onChange={updateInputField}
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
              value={data.SSN }
              onChange={updateInputField}
              required
            />
          </div>

          <div className="formField">
            <label>Age:</label>
            <input
              type="text"
              name="age"
              placeholder="Enter age"
              value={data.age}
              onChange={updateInputField}
              required
            />
          </div>

          <div className="formField">
            <label>Gender:</label>
            <select
              name="gender"
              value={data.gender}
              onChange={updateInputField}
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
              value={data.race}
              onChange={updateInputField}
              required
            />
          </div>

          <div className="formField">
            <label>Occupation:</label>
            <input
              type="text"
              name="occupationClass"
              placeholder="Enter your occupation"
              value={data.occupationClass}
              onChange={updateInputField}
              required
            />
          </div>

          <div className="formField">
            <label>Medical History:</label>
            <input
              type="text"
              name="medicalHistory"
              placeholder="Enter your medical history"
              value={data.medicalHistory}
              onChange={updateInputField}
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
              value={data.address}
              onChange={updateInputField}
            />
          </div>

          <div className="formField">
            <label>Phone:</label>
            <input
              type="tel"
              name="phone"
              placeholder="Enter phone number"
              value={data.phone}
              onChange={updateInputField}
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
              value={data.userName}
              onChange={updateInputField}
              required
            />
          </div>

          <div className="formField">
            <label>Password:</label>
            <input
              type="password"
              name="userPassword"
              placeholder="Enter your password"
              value={data.userPassword}
              onChange={updateInputField}
              required
            />
          </div>


          <div className="formField">
            <label>Email:</label>
            <input
              type="email"
              name="userEmail"
              placeholder="Enter your email"
              value={data.userEmail}
              onChange={updateInputField}
              required
            />
          </div>

        </div>

        <div className="formRow">
          <button type="submit">Sign Up</button>
        </div>
      </form>
    </div>
  );
};

export default SignUpPage;
