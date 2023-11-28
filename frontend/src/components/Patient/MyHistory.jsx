import React, { useEffect, useState } from "react";
import PatientHeader from "./PatientHeader";
import "../../index.css";

const MyHistory = () => {
  const [data, setData] = useState({ results: [] });

  const patientData = JSON.parse(localStorage.getItem("patientData"));

  useEffect(() => {
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
        .catch((error) =>
          console.error("Error fetching time slot data:", error)
        );
    };

    fetchTimeSlotPatientData(patientData[0].SSN);
  }, [null]);

  return (
    <>
      <PatientHeader />
      <div className="container">
        <table >
          <thead>
            <tr>
              <th>Time Slot ID</th>
              <th>Vaccine Name</th>
              <th>Doze Num</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Date</th>
              <th>On Hold</th>
            </tr>
          </thead>
          <tbody>
            {data && data.results && data.results.length > 0 ? (
              data.results.map((item) => {
                console.log("item", item); // Log the entire item object
                return (
                  <tr key={item.TimeslotID}>
                    <td>{item.TimeslotID}</td>
                    <td>{item.name}</td>
                    <td>{item.round}</td>
                    <td>{item.StartTime}</td>
                    <td>{item.EndTime}</td>
                    <td>{item.Date}</td>
                    <td>{item.onHold}</td>
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
    </>
  );
};

export default MyHistory;
