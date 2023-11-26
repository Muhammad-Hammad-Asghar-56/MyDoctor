const VaccineDBHandler = require("../Database/vaccine");
const vaccineDBHandler=require("../Database/vaccine")
const connection=require("../Database/index");
const Timeslot = require("../DTO/timeSlot");

class timeSlotDBHandler{
    
    static createCampaignTimeSlot(vaccineId, round, startTime, endTime, date, maxCapacity, nurseCount) {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO Timeslot (vaccineId, round, StartTime, EndTime, Date, MaxCapacity, NurseCount) VALUES (?, ?, ?, ?, ?, ?, ?)';
            const values = [vaccineId, round, startTime, endTime, date, maxCapacity, nurseCount];
    
            connection.query(query, values, async (error, results) => {
                if (error) {
                    console.error(error);
                    reject(error);
                    return;
                }
    
                const vaccine =await vaccineDBHandler.getVaccineById(vaccineId);
                const campaign = new Timeslot(startTime, endTime, date, 0, 0, vaccine,round); 
                resolve(campaign);
            });
        });
    }
    
    
    static getAllCampaignsTimeSlot() {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM Timeslot where vaccineID in (select id from vaccine where active=true);';
    
            connection.query(query, async (error, results) => {
                if (error) {
                    console.error(error);
                    reject(error);
                    return;
                }
    
                try {
                    const timeSlots = await Promise.all(results.map(async timeSlotData => {
                        const vaccine = await VaccineDBHandler.getVaccineById(timeSlotData.VaccineID);
                        return new Timeslot(
                            timeSlotData.TimeslotID,
                            timeSlotData.StartTime,
                            timeSlotData.EndTime,
                            timeSlotData.Date,
                            timeSlotData.MaxCapacity,
                            timeSlotData.NurseCount,
                            vaccine,
                            timeSlotData.round
                        );
                    }));
                    resolve(timeSlots);
                } catch (err) {
                    console.error(err);
                    reject(err);
                }
            });
        });
    }
    
    static getTimeSlotsForNurse(nurseId){
        return new Promise((resolve, reject) => {
            const query="select TimeslotID,StartTime,EndTime,Date,MaxCapacity,NurseCount,VaccineID,round,timeslotID in  (select timeslotId from nursetimeslotrecord where nurseId=?) 'isRegister' from timeslot ts where ts.active=true and ts.VaccineID in (select id from vaccine where active=true);"
    
            connection.query(query, [nurseId],async (error, results) => {
                if (error) {
                    console.error(error);
                    reject(error);
                    return;
                }
    
                try {
                    const timeSlots = await Promise.all(results.map(async timeSlotData => {
                        const vaccine = await VaccineDBHandler.getVaccineById(timeSlotData.VaccineID);
                        const data={"timeSlot": new Timeslot(
                            timeSlotData.TimeslotID,
                            timeSlotData.StartTime,
                            timeSlotData.EndTime,
                            timeSlotData.Date,
                            timeSlotData.MaxCapacity,
                            timeSlotData.NurseCount,
                            vaccine,
                            timeSlotData.round
                        ),
                        isRegister:timeSlotData.isRegister
                    }
                        return data;
                    }));
                    resolve(timeSlots);
                } catch (err) {
                    console.error(err);
                    reject(err);
                }
            });
        });

    }

    static getTimeSlotListForPatient(patientSSn){
        return new Promise((resolve, reject) => {
            const query="Select *,TimeslotID in (select ps.TimeslotID from patientschedule ps where ps.patientSSN=?) 'isRegister' from timeslot ts where ts.active=true and date > current_date() and ts.VaccineID in (select id from vaccine where active=true);"
    
            connection.query(query, [patientSSn],async (error, results) => {
                if (error) {
                    console.error(error);
                    reject(error);
                    return;
                }
    
                try {
                    const timeSlots = await Promise.all(results.map(async timeSlotData => {
                        const vaccine = await VaccineDBHandler.getVaccineById(timeSlotData.VaccineID);
                        const data={"timeSlot": new Timeslot(
                            timeSlotData.TimeslotID,
                            timeSlotData.StartTime,
                            timeSlotData.EndTime,
                            timeSlotData.Date,
                            timeSlotData.MaxCapacity,
                            timeSlotData.NurseCount,
                            vaccine,
                            timeSlotData.round
                        ),
                        isRegister:timeSlotData.isRegister
                    }
                        return data;
                    }));
                    resolve(timeSlots);
                } catch (err) {
                    console.error(err);
                    reject(err);
                }
            });
        });

    }
    
    static deleteTimeSlotById(timeSlotID) {
        return new Promise((resolve, reject) => {
            const query = 'Update Timeslot set active=false WHERE TimeslotID = ?';
    
            connection.query(query, [timeSlotID], (error, results) => {
                if (error) {
                    reject(error);
                    return;
                }
                if (results.affectedRows === 0) {
                    reject(false);
                    return;
                }
                resolve(true);
            });
        });
    }



    static async getTimeslotById(timeslotId) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM Timeslot WHERE TimeslotID = ? and active=true';
            connection.query(query, [timeslotId], async (error, results) => {
                if (error) {
                    console.error(error);
                    reject(error);
                    return;
                }
    
                if (results.length === 0) {
                    resolve(null); // Return null if no Timeslot found for the ID
                    return;
                }
    
                const timeSlotData = results[0]; // Fetching the first result row
                const vaccine = await VaccineDBHandler.getVaccineById(timeSlotData.VaccineID);
    
                const timeSlot = new Timeslot(
                    timeSlotData.TimeslotID,
                    timeSlotData.StartTime,
                    timeSlotData.EndTime,
                    timeSlotData.Date,
                    timeSlotData.MaxCapacity,
                    timeSlotData.NurseCount,
                    vaccine,
                    timeSlotData.round
                );
    
                resolve(timeSlot);
            });
        });
    }
    
    
    static async incrementNurseCountByOne(timeslotId) {
        return new Promise((resolve, reject) => {
            const getQuery = 'SELECT NurseCount FROM Timeslot WHERE TimeslotID = ? and active=true';
            connection.query(getQuery, [timeslotId], (getError, getResult) => {
                if (getError) {
                    console.error(getError);
                    reject(getError);
                    return;
                }
    
                if (getResult.length === 0) {
                    reject(new Error('Timeslot not found')); // Reject if the Timeslot with given ID doesn't exist
                    return;
                }
    
                const currentNurseCount = getResult[0].NurseCount;
    
                const updateQuery = 'UPDATE Timeslot SET NurseCount = ? WHERE TimeslotID = ?';
                const updatedNurseCount = currentNurseCount + 1;
    
                connection.query(updateQuery, [updatedNurseCount, timeslotId], (updateError, updateResult) => {
                    if (updateError) {
                        console.error(updateError);
                        reject(updateError);
                        return;
                    }

                    const fetchUpdatedQuery = 'SELECT * FROM Timeslot WHERE TimeslotID = ?';
                    connection.query(fetchUpdatedQuery, [timeslotId], (fetchError, fetchResult) => {
                        if (fetchError) {
                            console.error(fetchError);
                            reject(fetchError);
                            return;
                        }
    
                        if (fetchResult.length === 0) {
                            reject(new Error('Updated Timeslot not found')); // Reject if the updated Timeslot is not found
                            return;
                        }
    
                        const updatedTimeslot = fetchResult[0];
                        resolve(updatedTimeslot);
                    });
                });
            });
        });
    }  

    static async decrementNurseCountByOne(timeslotId) {
        console.log('Start decrementNurseCountByOne');
        const query = 'UPDATE Timeslot SET NurseCount = NurseCount - 1 WHERE TimeslotID = ? and active=true';
        return new Promise((resolve, reject) => {
            connection.query(query, [timeslotId], (error, results) => {
                if (error) {
                    console.error(error);
                    reject(error);
                    return;
                }
                console.log('Done decrementNurseCountByOne');
                resolve(true);
            });
        });
    }
    
}

module.exports=timeSlotDBHandler