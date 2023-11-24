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
            const query = 'SELECT * FROM Timeslot';
    
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
    
    
    static deleteTimeSlotById(timeSlotID) {
        return new Promise((resolve, reject) => {
            const query = 'DELETE FROM Timeslot WHERE TimeslotID = ?';
    
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
    
}

module.exports=timeSlotDBHandler