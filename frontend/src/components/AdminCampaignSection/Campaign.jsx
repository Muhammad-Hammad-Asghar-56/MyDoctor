import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import "./Campaign.css";
import axios from "axios";
import Header from "../../components/Header/Adminheader";

const Campaign = () => {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await fetch("http://localhost:3005/admin/allTimeSlot");
        const data = await response.json();
        console.log("data from api", data.result);

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

  const handleDeleteClick = async (id) => {
    console.log(id);
    try {
      await axios.delete(`http://localhost:3005/timeSlot/delete/${id}`);
      console.log("Deleted campaign with ID:", id);

      const updatedData = await axios.get(
        "http://localhost:3005/admin/allTimeSlot"
      );
      setCampaigns(updatedData.data.result || []);
    } catch (error) {
      console.error("Error deleting campaign:", error);
      // Handle other types of errors
    }
  };

  return (
    <>
      <Header />
      <div className="container">
        <Link to="/admin/newCampaign">
          <button className="addnewnurseBtn">Add New Campaign</button>
        </Link>

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
                        onClick={() => handleDeleteClick(campaign.timeslotID)}
                      >
                        <AiOutlineDelete />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Campaign;
