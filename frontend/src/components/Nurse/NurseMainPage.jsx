import React from "react";
import NurseHeader from "./NurseHeader";
import { useState, useEffect } from "react";
import { AiOutlineDelete } from "react-icons/ai";

const NurseMainPage = () => {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await fetch("http://localhost:3005/admin/allTimeSlot");
        const data = await response.json();

        if (response.ok) {
          setCampaigns(data.result || []);
        } else {
          console.error("Error fetching campaigns:", data.error);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchCampaigns();
  }, []);

  const nurseData = JSON.parse(localStorage.getItem("nurseData"));

  const handleRegisterClick = async (timeSlotId) => {
    try {
      const response = await fetch("http://localhost:3005/timeSlot/nurse/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nurseId: nurseData.id,
          timeSlotId: timeSlotId,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Handle success, e.g., update local state or show a success message
        console.log("Nurse registered successfully:", data);
      } else {
        // Handle error, e.g., show an error message
        console.error("Error registering nurse:", data.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <NurseHeader />
      <div>
        <h2>Campaigns</h2>
        <table>
          <thead>
            <tr>
              <th>Round No</th>
              <th>Vaccine Type</th>
              <th>Campaign Date</th>
              <th>Campaign Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {campaigns &&
              campaigns.map((campaign, index) => (
                <tr key={index}>
                  <td>{campaign.round}</td>
                  <td>{campaign.Vaccine.name}</td>
                  <td>{campaign.date}</td>
                  <td>{`${campaign.startTime} - ${campaign.endTime}`}</td>
                  <td>
                    <button
                      onClick={() => handleRegisterClick(campaign.timeslotID)}
                    >
                      Register
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NurseMainPage;
