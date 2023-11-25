import React from "react";

const handleSubmit = () => {};

const SignUpPage = () => {
  return (
    <div>
      <div className="TextSection">
        <h1>Sign Up</h1>
        <p>Fill in the details to below to create your account</p>
      </div>

    
      <form className="SearchForm" onSubmit={handleSubmit}>
        <div className="formRow">
          <div className="formField">
            <label>First Name:</label>
            <input
              type="text"
              name="fName"
              placeholder="Enter first name"
            //   value={formData.fName}
            //   onChange={handleInputChange}
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
            //   value={formData.mI}
            //   onChange={handleInputChange}
              placeholder="Enter middle initial"
            />
          </div>
          <div className="formField">
            <label>Password:</label>
            <input
              type="password"
              name="password"
            //   value={formData.password}
            //   onChange={handleInputChange}
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
            //   value={formData.age}
            //   onChange={handleInputChange}
              required
            />
          </div>

          <div className="formField">
            <label>Gender:</label>
            <select
              name="gender"
            //   value={formData.gender}
            //   onChange={handleInputChange}
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
            //   value={formData.address}
            //   onChange={handleInputChange}
              placeholder="Enter address"
            />
          </div>
          <div className="formField">
            <label>Phone:</label>
            <input
              type="tel"
              name="phone"
            //   value={formData.phone}
            //   onChange={handleInputChange}
              placeholder="Enter phone number"
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
