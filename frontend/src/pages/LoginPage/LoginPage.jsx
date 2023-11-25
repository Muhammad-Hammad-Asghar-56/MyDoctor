import React, { useState } from "react";
import "./LoginPage.css";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {

  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [selectedUser, setSelectedUser] = useState("Nurse");
  const [error, setError] = useState("");

  const updateInputField = (e) => {
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value, // Access e.target for the input value and name
    }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedUser === "Admin") {
      if (!data.fName) {
        setError("User name should not be empty");
        return;
      }
      if (!data.password) {
        setError("Password should not be empty");
        return;
      }
      if (data.fName === "Admin" && data.password === "12345") {
        navigate("/");
      } else {
        toast.error("Invalid Credentials!!");
      }

      // Add logic for Admin login if needed
    } else {
      if (!data.fName) {
        setError("User First name should not be empty");
        return;
      }
      if (!data.lName) {
        setError("User last name should not be empty");
        return;
      }
      if (!data.password) {
        setError("Password should not be empty");
        return;
      }

      try {
        const response = await fetch("http://localhost:3005/nurse/LogIn", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          const responseData = await response.json();
          
          localStorage.setItem("nurseData", JSON.stringify(responseData.nurse));

          toast.success("Logged in successfully!!");
          // console.log(responseData);
          navigate("/nurse");

          if (responseData.status === true) {
            // Navigate to Nurse or Patient page based on selectedUser
            if (selectedUser === "Nurse") {
            } else if (selectedUser === "Patient") {
              // Navigate to Patient page
            }
          }
        } else {
          console.error("Error:", response.status);
          setError("Try again");
          toast.error("Invalid Credentials!!");
        }
      } catch (error) {
        console.error("Error:", error);
        setError("An error occurred. Please try again.");
      }
    }
  };

  const updateSelectedUser = (user) => {
    setSelectedUser(user);
  };
  return (
    <div className="main-page">
      <div className="loginDialog">
        <div className="loginText">
          <h1>Login</h1>
          <h3>MyDoctor.com</h3>
        </div>
        <div className="buttonContainer" style={{ marginTop: "20px" }}>
          <div class="button-group">
            <button
              onClick={() => updateSelectedUser("Admin")}
              class={`custom-button ${
                selectedUser === "Admin" ? "selectedButton" : ""
              }`}
            >
              Admin
            </button>
            <button
              onClick={() => updateSelectedUser("Nurse")}
              class={`custom-button ${
                selectedUser === "Nurse" ? "selectedButton" : ""
              }`}
            >
              Nurse
            </button>
            <button
              onClick={() => updateSelectedUser("Patient")}
              class={`custom-button ${
                selectedUser === "Patient" ? "selectedButton" : ""
              }`}
            >
              Patient
            </button>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="Loginform">
          <input
            type="text"
            placeholder={
              selectedUser === "Admin" ? "Enter user name" : "Enter First Name"
            }
            name="fName"
            onChange={updateInputField}
          />
          {selectedUser != "Admin" && (
            <input
              type="text"
              placeholder="Enter Last Name"
              name="lName"
              onChange={updateInputField}
            />
          )}
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={updateInputField}
          />
          <p style={{ width: "100%", color: "red" }}>{error}</p>

          <button type="submit" className="button">
            Log In
          </button>

          {selectedUser === "Patient" && (
            
            <Link to = '/patient/signUp'>
            <button type="button" className="button">
              Sign Up
            </button>
            </Link>
          )}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
