import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import PatientHeader from './PatientHeader';

const PatientMainPage = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [registeredTimeSlots, setRegisteredTimeSlots] = useState([]);

  const patientData = JSON.stringify(localStorage.getItem("patientData"))

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await fetch('http://localhost:3005/admin/allTimeSlot');
        const data = await response.json();
        console.log(data)

        if (response.ok) {
          setCampaigns(data.result || []);
        } else {
          console.error('Error fetching campaigns:', data.error);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchCampaigns();
  }, []);

  useEffect(() => {
    const fetchRegisteredTimeSlots = async () => {
      try {
        const response = await axios.post(
          'http://localhost:3005/timeSlot/patient/getList',
          {
            patientSSN: patientData[0].SSN,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        const data = response.data;

        if (response.status === 200 && data.success) {
          setRegisteredTimeSlots(data.result || []);
        } else {
          console.error('Error fetching registered time slots:', data.error);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchRegisteredTimeSlots();
  }, [patientData]);

  const isPatientRegistered = (timeSlotId) => {
    return registeredTimeSlots.includes(timeSlotId);
  };

  const handleButtonClick = async (timeSlotId) => {
    try {
      if (isPatientRegistered(timeSlotId)) {
        // Patient is registered, unregister logic
        const response = await axios.post(
          'http://localhost:3005/timeSlot/patient/unregister',
          {
            patientSSN: patientData[0].SSN,
            timeSlotId: timeSlotId,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        const data = response.data;

        if (response.status === 200) {
          console.log('Patient unregistered successfully:', data);
          toast.success('You unregistered from the campaign!!');
          // Update registeredTimeSlots state after unregistering
          setRegisteredTimeSlots((prev) =>
            prev.filter((id) => id !== timeSlotId)
          );
        } else {
          console.error('Error unregistering patient:', data.error);
          toast.error('Failed to unregister from the campaign!!');
        }
      } else {
        // Patient is not registered, register logic
        const response = await axios.post(
          'http://localhost:3005/timeSlot/patient/register',
          {
            patientSSN: patientData[0].SSN,
            timeSlotId: timeSlotId,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        

        const data = response.data;
         
        if (response.status === 200) {
          console.log('Patient registered successfully:', data);
          toast.success('You registered in a campaign successfully!!');
          // Update registeredTimeSlots state after registering
          setRegisteredTimeSlots((prev) => [...prev, timeSlotId]);
        } else {
          console.error('Error registering patient:', data.error);
          toast.error('You already registered in this campaign!!!');
        }
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to perform registration/unregistration!!');
    }
  };

  return (
    <div>
      <PatientHeader />
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
                      onClick={() => handleButtonClick(campaign.timeslotID)}
                    >
                      {isPatientRegistered(campaign.timeslotID)
                        ? 'Unregister'
                        : 'Register'}
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

export default PatientMainPage;
