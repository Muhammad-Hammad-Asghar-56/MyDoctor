const connection = require("../Database/index");
const Nurse = require('../DTO/nurse');

class NurseDBHandler {
    static addNurse(fname, lName, mI, password, age, gender, phone, address) {
        if (fname && lName && mI && password && age && gender && phone && address) {
            const query = `INSERT INTO Nurse (fName, mI, lName, age, gender, phone, address,password)
                        VALUES (?, ?, ?, ?, ?, ?, ?,?)`;

            connection.query(query, [fname, mI, lName, age, gender, phone, address, password], (err, results) => {
                if (err) {
                    console.error(err);
                    return null;
                }
                console.log(results);
            });
            return new Nurse(fname, mI, lName, age, gender, phone, address);
        }
        else {
            return null
        }
    }
    
    static updateNurse(searchId, fname, mI, lName, age, gender, phone, address , password) {
        return new Promise((resolve, reject) => {
            const query = `UPDATE Nurse 
                           SET fName = ?, mI = ?, lName = ?, age = ?, gender = ?, phone = ?, address = ? , password = ? 
                           WHERE employeeID = ?`;
    
            connection.query(query, [fname, mI, lName, age, gender, phone, address, password, searchId], (err, results) => {
                if (err) {
                    reject(err);
                    return;
                }
                // Fetch the updated nurse after the update operation
                const fetchQuery = `SELECT * FROM Nurse WHERE employeeID = ?`;
                connection.query(fetchQuery, [searchId], (fetchErr, updatedResults) => {
                    if (fetchErr) {
                        reject(fetchErr);
                        return;
                    }
                    if (updatedResults.length > 0) {
                        const updatedNurse = updatedResults[0];
                        resolve(updatedNurse); // Resolve with the updated nurse data
                    } else {
                        resolve(null); // Resolve with null when nurse not found after update
                    }
                });
            });
        });
    }
    
    static deleteNurse(searchId) {
        return new Promise((resolve, reject) => {
            const query = `DELETE FROM Nurse WHERE employeeId = ?`;
    
            connection.query(query, [searchId], (err, results) => {
                if (err) {
                    console.error(err);
                    reject(err);
                    return null;
                }
    
                if (results.affectedRows > 0) {
                    const deletedNurse = { employeeId: searchId }; // Create an object with the deleted employeeId
                    resolve(deletedNurse);
                } else {
                    resolve(null); // If no nurse was deleted (maybe employeeId not found)
                }
            });
        });
    }
    
    static getNurseDetails(fName, lName, password) {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM Nurse WHERE fname=? and lname = ? and password=?`;

            connection.query(query, [fName, lName, password], (err, results) => {
                if (err) {
                    console.error(err);
                    reject(err);
                    return;
                }

                if (results.length > 0) {
                    const nurseData = results[0];
                    const nurse = new Nurse(
                        nurseData.employeeID,
                        nurseData.fName,
                        nurseData.mI,
                        nurseData.lName,
                        nurseData.age,
                        nurseData.gender,
                        nurseData.phone,
                        nurseData.address,
                        nurseData.password
                    );
                    resolve(nurse);
                } else {
                    resolve(null); // If no nurse found with the provided details
                }
            });
        });
    }

    static async getAllNurse() {
        let lst;
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM Nurse';
            connection.query(query, (error, results) => {
                if (error) {
                    console.error(error); // Corrected variable name here
                    reject(error);
                    return;
                }
                lst = [];
                results.forEach(nurseData => {
                    const nurse = new Nurse(
                        nurseData.employeeID,
                        nurseData.fName,
                        nurseData.mI,
                        nurseData.lName,
                        nurseData.age,
                        nurseData.gender,
                        nurseData.phone,
                        nurseData.address,
                        nurseData.password
                    );
                    lst.push(nurse);
                });
                resolve(lst);
            });
        });
    }
}

module.exports = NurseDBHandler;
