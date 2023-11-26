const connection = require("./index.js");
const timeSlotDBHandler = require("./timeSlot.js");
const PatientSchedule=require("../DTO/PatientSchedule.js");
const PatientDBHandler = require("./patient.js");
const VaccineDBHandler = require("./vaccine.js");

class SchedulePatientDBHandler {
   static registerTimeSlot(SSN, VaccineId, timeSlotId) {
    console.log("SSN " + SSN + " Vaccine " + VaccineId + " TimeSlotID " + timeSlotId);
    return new Promise((resolve, reject) => {
        const insertQuery = "INSERT INTO patientschedule (patientSSN, VaccineId, TimeslotId) VALUES (?, ?, ?)";
        connection.query(insertQuery, [SSN, VaccineId, timeSlotId], async (error, results) => {
            if (error) {
                console.error(error);
                reject(error);
                return;
            }
            
            if (results.affectedRows === 0) {
                resolve(null); // No rows affected, indicating insertion failure
                return;
            }

            // Update the maxCapacity for the corresponding timeslot after successful insertion
            const updateQuery = 'UPDATE timeslot SET maxCapacity = CEIL((SELECT COUNT(*) FROM patientschedule WHERE timeSlotId = ?) / 10) WHERE timeSlotId = ?';
            connection.query(updateQuery, [timeSlotId, timeSlotId], (error, updateResults) => {
                if (error) {
                    console.error(error);
                    reject(error);
                    return;
                }
                console.log('MaxCapacity updated for the timeslot');
                resolve(true);
            });
        });
    });
}

  static findPatientScheduleTimeSlot(patientSSn, vaccineId, timeSlotId) {
    return new Promise((resolve, reject) => {
      const searchQuery =
        "SELECT * FROM patientSchedule WHERE patientSSN = ? AND vaccineId = ? AND TimeslotID = ?";
      connection.query(
        searchQuery,
        [patientSSn, vaccineId,timeSlotId],
        async (error, results) => {
          if (error) {
            console.error(error);
            reject(error);
            return;
          }

          if (results.length === 0) {
            resolve(null); // No record found for the nurse and timeslot
          } else {
            const data=results[0];
            const patient = await PatientDBHandler.getPatientBySSN(patientSSn);
            console.log(patient);
            const vaccine = await VaccineDBHandler.getVaccineById(data.VaccineID);
            const timeSlot= await timeSlotDBHandler.getTimeslotById(data.TimeslotID);
            const onHold = data.onHold;
            const patientSchedule=new PatientSchedule(patient,vaccine,timeSlot,onHold == 1);
            patientSchedule.setScheduleId(data.ScheduleID);
            resolve(patientSchedule);
          }
        }
      );
    });
  }

  static unRegisterPatientSchedule(patientSSN, vaccineId, timeSlotId) {
    return new Promise(async (resolve, reject) => {
        try {
            const deleteQuery = 'DELETE FROM PatientSchedule WHERE PatientSSN=? AND VaccineID=? AND TimeSlotId=?';
            const deletionResult = await new Promise((innerResolve, innerReject) => {
                connection.query(deleteQuery, [patientSSN, vaccineId, timeSlotId], (error, results) => {
                    if (error) {
                        console.error(error);
                        innerReject(error);
                        return;
                    }
                    innerResolve(results);
                });
            });

            if (deletionResult.affectedRows === 0) {
                resolve(false); // No record found for the patient and timeslot
            } else {
                const updateQuery = 'UPDATE Timeslot SET maxCapacity = CEIL((SELECT COUNT(*) FROM patientschedule WHERE TimeSlotId=?)/10) WHERE TimeSlotId=?';
                connection.query(updateQuery, [timeSlotId, timeSlotId], (error, results) => {
                    if (error) {
                        console.error(error);
                        reject(error);
                        return;
                    }
                    console.log('Successfully updated maxCapacity');
                    resolve(true);
                });
            }
        } catch (error) {
            console.error(error);
            reject(error);
        }
    });
}
  static haveClearPreviousVaccineRecord(patientSSN, vaccineId, round) {
    return new Promise((resolve, reject) => {
        const query = `
        SELECT COALESCE(ts.round, 0) AS round 
        FROM patientschedule ps 
        LEFT JOIN timeslot ts ON ps.TimeslotID = ts.TimeslotID 
        LEFT JOIN vaccine v ON ts.VaccineID = v.id
        WHERE patientSSN = ? 
        AND ps.vaccineID = ?  
        AND onHold = 0 
        AND ts.Date < NOW() + INTERVAL v.timeFrame DAY;
        `;

        connection.query(query, [patientSSN, vaccineId], (error, results) => {
            if (error) {
                console.error(error);
                reject(error);
                return;
            }

            // Process the results here
            const round = results.length > 0 ? results[0].round : 0;
            resolve(round);
        });
    });
  }

}
module.exports = SchedulePatientDBHandler;
