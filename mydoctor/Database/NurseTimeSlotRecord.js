const connection = require('../Database/index.js');
const timeSlotDBHandler = require('../Database/timeSlot.js');
const TimeSlotController=require("../Database/timeSlot.js")



class NurseTimeSlotDBHandler{
    static registerNurseTimeSlot(nurseId, timeSlotId) {
        return new Promise((resolve, reject) => {
            const insertQuery = 'INSERT INTO NurseTimeSlotRecord (NurseID, TimeslotID) VALUES (?, ?)';
            connection.query(insertQuery, [nurseId, timeSlotId],async (error, results) => {
                if (error) {
                    console.error(error);
                    reject(error);
                    return;
                }
                if(results.affectedrow==0){
                    resolve(false);
                }
                await timeSlotDBHandler.incrementNurseCountByOne(timeSlotId);
                resolve(true);
            });
        });
    }
    static findNurseTimeSlot(nurseId, timeSlotId) {
        return new Promise((resolve, reject) => {
            const searchQuery = 'SELECT * FROM NurseTimeSlotRecord WHERE NurseID = ? AND TimeslotID = ?';
            connection.query(searchQuery, [nurseId, timeSlotId], async (error, results) => {
                if (error) {
                    console.error(error);
                    reject(error);
                    return;
                }
    
                if (results.length === 0) {
                    resolve(false); // No record found for the nurse and timeslot
                } else {
                    resolve(true);
                }
            });
        });
    }



    static unRegisterNurseTimeSlot(nurseId, timeSlotId) {
        return new Promise(async (resolve, reject) => {
            const deleteQuery = 'DELETE FROM NurseTimeSlotRecord WHERE NurseID = ? AND TimeslotID = ?';
            connection.query(deleteQuery, [nurseId, timeSlotId], async (error, results) => {
                if (error) {
                    console.error(error);
                    reject(error);
                    return;
                }
    
                if (results.affectedRows === 0) {
                    resolve(false); // No record found for the nurse and timeslot
                } else {
                    try {
                        await timeSlotDBHandler.decrementNurseCountByOne(timeSlotId);
                        resolve(true); // Successfully removed record and decremented the nurse count
                    } catch (error) {
                        console.error(error);
                        reject(error);
                    }
                }
            });
        });
    }   
    
}
module.exports = NurseTimeSlotDBHandler