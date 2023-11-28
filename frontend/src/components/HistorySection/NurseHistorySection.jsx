import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Adminheader";
import "./historysection.css";

const NurseHistorySection = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [namesList, setNamesList] = useState([]);
  const [selectedName, setSelectedName] = useState(null);
  const [data, setData] = useState([]);

  // for nurse
  const fetchTimeSlotData = (nurseId) => {
    fetch("http://localhost:3005/timeSlot/nurse/getHistory", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nurseId: nurseId,
      }),
    })
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching time slot data:", error));
  };

  const fetchTimeSlotPatientData = (patientSSN) => {
    fetch("http://localhost:3005/timeSlot/patient/getHistory", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        patientSSN: patientSSN,
      }),
    })
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching time slot data:", error));
  };

  useEffect(() => {
    if (selectedName && selectedOption === "nurse") {
      fetchTimeSlotData(selectedName);
    }
    if (selectedName && selectedOption === "patient") {
      fetchTimeSlotPatientData(selectedName);
    }
  }, [selectedName, selectedOption]);

  console.log("Data structure:", data);

  const handleOptionChange = (option) => {
    setSelectedName(null); // Reset selectedName when option changes
    setSelectedOption(option);

    // Fetch names based on the selected option
    if (option === "nurse") {
      fetch("http://localhost:3005/admin/getNurses")
        .then((response) => response.json())
        .then((data) => {
          // Handle cases where 'data' may not have a 'nurses' property
          const nurses = Array.isArray(data) ? data : data.nurses || [];
          setNamesList(nurses);
        })
        .catch((error) => console.error("Error fetching nurse names:", error));
    } else if (option === "patient") {
      fetch("http://localhost:3005/admin/getPatient")
        .then((response) => response.json())
        .then((data) => {
          // Handle cases where 'data' may not have a 'nurses' property
          const patients = Array.isArray(data) ? data : data.patients || [];
          setNamesList(patients);
        })
        .catch((error) =>
          console.error("Error fetching patient names:", error)
        );
    } else {
      setNamesList([]);
    }
  };

  const handleNameChange = (name) => {
    setSelectedName(name);
  };

  return (
    <>
      <Header />
      <div className="container historySection">
        <div className="row">
          <div className="col">
            <label className="lbl">Select Option:</label>
            <select
              className="dropdown-select"
              onChange={(e) => handleOptionChange(e.target.value)}
              value={selectedOption}
            >
              <option value="nurse">Check nurse history</option>
              <option value="patient">Check patient history</option>
            </select>
          </div>
          {selectedOption && (
            <div className="col">
              <label>
                Select {selectedOption === "nurse" ? "Nurse" : "Patient"}:
              </label>
              <select
                className="dropdown-select"
                onChange={(e) => handleNameChange(e.target.value)}
                value={selectedName}
              >
                <option value="">Select</option>
                {namesList.map((item, index) => (
                  <option key={index} value={item.id || item.SSN}>
                    {item.userName || "No UserName"}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {selectedName && (
          <div>
            <h3>
              {selectedOption === "nurse" ? "Nurse" : "Patient"} Information for
              ID no : {selectedName}
            </h3>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Username</th>
                  <th>Scheduled Times</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(data.results) && data.results.length > 0 ? (
                  data.results.map((item) => {
                    console.log("item" , item); // Log the entire item object
                    return (
                      <tr key={item.timeSlot.timeSlotID}>
                        <td>
                          {selectedOption === "nurse" ? item.id : item.SSN}
                        </td>
                        <td>{item.fName || "No first name"}</td>
                        <td>{item.lName}</td>
                        <td>{item.userName || "No UserName"}</td>
                        <td>{item.timeSlot.startTime} - {item.timeSlot.endTime}</td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="5">No data available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};
export default NurseHistorySection;
