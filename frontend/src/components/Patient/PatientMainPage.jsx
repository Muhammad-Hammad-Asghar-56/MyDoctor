import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import PatientHeader from './PatientHeader';

const PatientMainPage = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [registeredTimeSlots, setRegisteredTimeSlots] = useState([]);

  const patientData = JSON.parse(localStorage.getItem("patientData"))
  const fetchCampaigns = async () => {
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
  
      if (response.status === 200) {
        const data = response.data;
        setCampaigns(data.results || []);
      } else {
        console.log("Error");
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  useEffect(() => {
    fetchCampaigns();
  }, []);

  const handleChecked=async(timeSlotID)=>{
   const body={
    "patientSSN":patientData[0].SSN,
    "timeSlotId":timeSlotID
    } 


    const response = await axios.post(
      'http://localhost:3005/timeSlot/patient/markVaccine',
      {
        patientSSN: patientData[0].SSN,
        timeSlotId: timeSlotID
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    if (response.status === 200) {
      toast.success('Bravo 👋 ! You got you vaccine just now');
      fetchCampaigns();
    } else {
      toast.error('Failed to mark you vaccine');
    }


  }
  

  const handleButtonClick = async (timeSlotId,vaccineId,register) => {
    try {
      if (register) {
        // Patient is registered, unregister logic
        const response = await axios.post(
          'http://localhost:3005/timeSlot/patient/unregister',
          {
            patientSSN: patientData[0].SSN,
            timeSlotId: timeSlotId,
            vaccineId:vaccineId
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        const data = response.data;

        if (response.status === 200) {
          toast.success('You unregistered from the campaign!!');
          fetchCampaigns();
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
            vaccineId:vaccineId
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        

        const data = response.data;
         
        if (response) {
          toast.success('You registered in a campaign successfully!!');
          fetchCampaigns();
          setRegisteredTimeSlots((prev) => [...prev, timeSlotId]);          // Update registeredTimeSlots state after registering
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
      <div className='container'>
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
                  <td>{campaign.timeSlot.round}</td>
                  <td>{campaign.timeSlot.Vaccine.name}</td>
                  <td>{campaign.timeSlot.date}</td>
                  <td>{`${campaign.timeSlot.startTime} - ${campaign.timeSlot.endTime}`}</td>
                  <td style={{width:"100%"}}>
                  {
                    campaign.isRegister === 0 ?
                    <button
                    className='plainButton'
                      onClick={() => handleButtonClick(campaign.timeSlot.timeslotID, campaign.timeSlot.Vaccine.id,campaign.isRegister)}
                    >
                      Register
                    </button>
                    :
                    <div class="unRegisterAndCheck">
                      <button
                      className='redButton'
                      onClick={() => handleButtonClick(campaign.timeSlot.timeslotID, campaign.timeSlot.Vaccine.id,campaign.isRegister)}
                    >
                      Un-Register
                    </button>
                    <button
                    className='plainButton'
                      onClick={() => handleChecked(campaign.timeSlot.timeslotID, campaign.timeSlot.Vaccine.id)}
                    >
                      Mark Done
                    </button>
                    </div>
                  }
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