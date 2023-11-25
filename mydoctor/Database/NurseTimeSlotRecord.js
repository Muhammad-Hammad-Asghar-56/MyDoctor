const connection = require("../Database/index.js");
const timeSlotDBHandler = require("../Database/timeSlot.js");
const TimeSlotController = require("../Database/timeSlot.js");

class NurseTimeSlotDBHandler {
  static registerNurseTimeSlot(nurseId, timeSlotId) {
    return new Promise((resolve, reject) => {
      const insertQuery =
        "INSERT INTO NurseTimeSlotRecord (NurseID, TimeslotID) VALUES (?, ?)";
      connection.query(
        insertQuery,
        [nurseId, timeSlotId],
        async (error, results) => {
          if (error) {
            console.error(error);
            reject(error);
            return;
          }
          if (results.affectedrow == 0) {
            resolve(false);
          }
          await timeSlotDBHandler.incrementNurseCountByOne(timeSlotId);
          resolve(true);
        }
      );
    });
  }
  static findNurseTimeSlot(nurseId, timeSlotId) {
    return new Promise((resolve, reject) => {
      const searchQuery =
        "SELECT * FROM NurseTimeSlotRecord WHERE NurseID = ? AND TimeslotID = ?";
      connection.query(
        searchQuery,
        [nurseId, timeSlotId],
        async (error, results) => {
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
        }
      );
    });
  }

  static unRegisterNurseTimeSlot(nurseId, timeSlotId) {
    return new Promise(async (resolve, reject) => {
        try {
            const deleteQuery = 'DELETE FROM NurseTimeSlotRecord WHERE NurseID = ? AND TimeslotID = ?';
            const deletionResult = await new Promise((innerResolve, innerReject) => {
                connection.query(deleteQuery, [nurseId, timeSlotId], (error, results) => {
                    if (error) {
                        console.error(error);
                        innerReject(error);
                        return;
                    }
                    innerResolve(results);
                });
            });

            if (deletionResult.affectedRows === 0) {
                resolve(false); // No record found for the nurse and timeslot
            } else {
                const updateQuery = 'UPDATE Timeslot SET NurseCount = NurseCount - 1 WHERE TimeslotID = ?';
                connection.query(updateQuery, [timeSlotId], (error, results) => {
                    if (error) {
                        console.error(error);
                        reject(error);
                        return;
                    }
                    console.log('Successfully decremented NurseCount');
                    resolve(true);
                });
            }
        } catch (error) {
            console.error(error);
            reject(error);
        }
    });
}

}
module.exports = NurseTimeSlotDBHandler;
