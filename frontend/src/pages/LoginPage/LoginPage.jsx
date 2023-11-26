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
      [e.target.name]: e.target.value,
    }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedUser === "Admin") {
      // Admin login logic
      if (!data.username) {
        setError("Username should not be empty");
        return;
      }
      if (!data.password) {
        setError("Password should not be empty");
        return;
      }
      if (data.username === "Admin" && data.password === "12345") {
        navigate("/");
        toast.success("Admin logged in successfully!!");
      }
    } else {
      try {
        const response = await fetch(
          `http://localhost:3005/${selectedUser.toLowerCase()}/LogIn`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );

        if (response.ok) {
          const responseData = await response.json();
          console.log(responseData);

          localStorage.setItem(
            `${selectedUser.toLowerCase()}Data`,
            JSON.stringify(responseData[selectedUser.toLowerCase()])
          );
          console.log(localStorage.getItem(`${selectedUser.toLowerCase}`));
          toast.success("Logged in successfully!!");
          // console.log(responseData);
          navigate(`/${selectedUser.toLowerCase()}`);
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
          <div className="button-group">
            <button
              onClick={() => updateSelectedUser("Admin")}
              className={`custom-button ${
                selectedUser === "Admin" ? "selectedButton" : ""
              }`}
            >
              Admin
            </button>
            <button
              onClick={() => updateSelectedUser("Nurse")}
              className={`custom-button ${
                selectedUser === "Nurse" ? "selectedButton" : ""
              }`}
            >
              Nurse
            </button>
            <button
              onClick={() => updateSelectedUser("Patient")}
              className={`custom-button ${
                selectedUser === "Patient" ? "selectedButton" : ""
              }`}
            >
              Patient
            </button>
          </div>
        </div>
        {/* <form onSubmit={handleSubmit} className="Loginform">
          {selectedUser !== "Patient" && (
            <>
              <input
                type="text"
                placeholder={
                  selectedUser === "Admin"
                    ? "Enter username"
                    : "Enter First Name"
                }
                name={selectedUser === "Admin" ? "username" : "fName"}
                onChange={updateInputField}
              />
              {selectedUser !== "Admin" && (
                <input
                  type="text"
                  placeholder="Enter Last Name"
                  name="lName"
                  onChange={updateInputField}
                />
              )}
              <input
                type="password"
                placeholder="Enter Password"
                name="password"
                onChange={updateInputField}
              />
            </>
          )}
          {selectedUser === "Patient" && (
            <>
              <input
                type="text"
                placeholder="Enter Username"
                name="userName"
                onChange={updateInputField}
              />
              <input
                type="password"
                placeholder="Enter Password"
                name="userPassword"
                onChange={updateInputField}
              />
            </>
          )}
          <p style={{ width: "100%", color: "red" }}>{error}</p>

          <button type="submit" className="button">
            Log In
          </button>

          {selectedUser === "Patient" && (
            <Link to={`/${selectedUser.toLowerCase()}/signUp`}>
              <button type="button" className="button">
                Sign Up
              </button>
            </Link>
          )}
        </form> */}
        <form onSubmit={handleSubmit} className="Loginform">
          <input
            type="text"
            placeholder="Enter Username"
            name="userName"
            onChange={updateInputField}
          />
          <input
            type="password"
            placeholder="Enter Password"
            name="userPassword"
            onChange={updateInputField}
          />
          <p style={{ width: "100%", color: "red" }}>{error}</p>

          <button type="submit" className="button">
            Log In
          </button>

          {selectedUser === "Patient" && (
            <Link to={`/${selectedUser.toLowerCase()}/signUp`}>
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
