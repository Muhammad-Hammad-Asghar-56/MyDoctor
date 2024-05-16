import React, { useState } from "react";
import "./LoginPage.css";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";

const LoginPage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [selectedUser, setSelectedUser] = useState("Nurse");
  const [error, setError] = useState("");
  const [recapatchaVerified , setrecapatchaVerified] = useState(false);

  function onChange(value) {
    console.log("Captcha value:", value);
    setrecapatchaVerified(true);
  }

  const updateInputField = (e) => {
    if (e.target.name === "SSN") {
      // SSN regex pattern (xxx-xx-xxxx)
      const ssnPattern = /^\d{3}-\d{2}-\d{4}$/;
      if (!ssnPattern.test(e.target.value) && e.target.value !== "") {
        setError("Please enter SSN in the format xxx-xx-xxxx");
        return;
      }
    }
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
      if (!data.userName) {
        setError("Username should not be empty");
        return;
      }
      if (!data.userPassword) {
        setError("Password should not be empty");
        return;
      }
      if (data.userName === "Admin" && data.userPassword === "12345") {
        navigate("/admin");
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
          {selectedUser === "Patient" && (
            <input
              type="text"
              placeholder="Enter SSN (xxx-xx-xxxx)"
              name="SSN"
              onChange={updateInputField}
            />
          )}
          <p style={{ width: "100%", color: "red" }}>{error}</p>
          {/* -----------------------RE CAPCHTA CODE---------------------- */}
          <ReCAPTCHA sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" onChange={onChange} />
          {/* -----------------------RE CAPCHTA CODE---------------------- */}

          <button type="submit" className="button"  disabled={!recapatchaVerified} >
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
