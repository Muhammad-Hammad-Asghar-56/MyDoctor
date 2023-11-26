import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/Header/Adminheader";

const AddNewCampaign = () => {
  const navigate = useNavigate();

  const [vaccineOptions, setVaccineOptions] = useState([]);
  const [selectedVaccineId, setSelectedVaccineId] = useState(null);

  useEffect(() => {
    const fetchVaccineOptions = async () => {
      try {
        const response = await fetch("http://localhost:3005/vaccine/getList");
        const data = await response.json();

        if (response.ok) {
          setVaccineOptions(data.vaccines);
        } else {
          console.error("Error fetching vaccine options:", data.error);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchVaccineOptions();
  }, []);

  const [formData, setFormData] = useState({
    round: 0,
    vaccineType: "",
    StartTime: "",
    EndTime: "",
    Date: "",
  });

  const isTimeDifferenceValid = () => {
    const startDateTime = new Date(`2000-01-01 ${formData.StartTime}`);
    const endDateTime = new Date(`2000-01-01 ${formData.EndTime}`);
    const timeDifferenceInMinutes = (endDateTime - startDateTime) / (1000 * 60);

    return timeDifferenceInMinutes === 60;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "vaccineType") {
      const selectedVaccine = vaccineOptions.find(
        (vaccine) => vaccine.name === value
      );
      setSelectedVaccineId(selectedVaccine ? selectedVaccine.id : null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isTimeDifferenceValid()) {
      toast.error(
        "Time difference between start and end time should be 1 hour."
      );
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:3005/timeSlot/createTimeSlot",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            vaccineId: selectedVaccineId,
            startTime: formData.StartTime,
            endTime: formData.EndTime,
            date: formData.Date,
            round: formData.round,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log("Campaign created successfully:", data.result.campaign);
        toast.success("Campaign created successfully");
        navigate("/admin/Campaign");
      } else {
        console.error("Error creating campaign:", data.error);
        toast.error(data.error);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.message || "An error occurred.");
    }
  };

  return (
    <>
      <Header />
      <div>
        <div className="TextSection">
          <h1>Add a new vaccine campaign</h1>
          <p>Fill in the details to add a new vaccine campaign</p>
        </div>

        <form className="SearchForm" onSubmit={handleSubmit}>
          <div className="formRow">
            <div className="formField">
              <label>Round no :</label>
              <input
                type="number"
                name="round"
                placeholder="Enter vaccine round number"
                value={formData.round}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="formField">
              <label>Select Vaccine name:</label>
              <select
                name="vaccineType"
                value={formData.vaccineType}
                onChange={handleInputChange}
                required
              >
                <option value="" disabled>
                  Select a vaccine
                </option>
                {vaccineOptions.map((vaccine) => (
                  <option key={vaccine.id} value={vaccine.name}>
                    {vaccine.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="formRow">
            <div className="formField">
              <label>Campaign Start Time:</label>
              <input
                type="time"
                name="StartTime"
                value={formData.StartTime}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="formField">
              <label>Campaign End Time:</label>
              <input
                type="time"
                name="EndTime"
                value={formData.EndTime}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="formRow">
            <div className="formField">
              <label>Campaign Date:</label>
              <input
                type="date"
                name="Date"
                value={formData.Date}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="formRow">
            <button type="submit">Add Campaign</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddNewCampaign;
