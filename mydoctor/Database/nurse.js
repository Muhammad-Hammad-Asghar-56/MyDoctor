const connection = require("../Database/index");
const Nurse = require('../DTO/nurse');
const mysql=require("mysql")
class NurseDBHandler {
    static addNurse(fname, lName, mI, userName, userPassword, age, gender, phone, address, userEmail) {
        if (fname && lName && mI && userPassword && age && gender && userName && phone && address) {
            const query = `INSERT INTO Nurse (fName, mI, lName, age, gender, phone, address,userName,userPassword, userEmail)
                        VALUES (?, ?, ?, ?, ?, ?, ?,?,?,?)`;
            
            connection.query(query, [fname, mI, lName, age, gender, phone, address, userName, userPassword, userEmail], (err, results) => {
                if (err) {
                    console.error(err);
                    return null;
                }
                console.log(results);
            });
            return new Nurse(fname, mI, lName, age, gender, phone, address, userEmail);
        }
        else {
            return null
        }
    }

    static updateNurse(searchId, fname, mI, lName, age, gender, phone, address, userName, password) {
        return new Promise((resolve, reject) => {
            const query = `UPDATE Nurse 
                           SET fName = ?, mI = ?, lName = ?, age = ?, gender = ?, phone = ?, address = ? , userName=?,userpassword = ? 
                           WHERE employeeID = ?`;

            connection.query(query, [fname, mI, lName, age, gender, phone, address, userName, password, searchId], (err, results) => {
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
            const query = `Update Nurse set active=false WHERE employeeId = ?`;

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

    static getNurseDetails(userName, userPassword) {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM Nurse WHERE userName=? and userPassword=? and active=true`;

            connection.query(query, [userName, userPassword], (err, results) => {
                if (err) {
                    console.error(err);
                    reject(err);
                    return;
                }

                if (results.length > 0) {
                    const nurseData = results[0];
                    resolve(nurseData);
                } else {
                    resolve(null); // If no nurse found with the provided details
                }
            });
        });
    }
    static getNurseDetails(userName) {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM Nurse WHERE userName=? and active=true`;

            connection.query(query, [userName], (err, results) => {
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
                        nurseData.userName,
                        nurseData.userPassword,
                        nurseData.userEmail
                    );
                    resolve(nurse);
                } else {
                    resolve(null); // If no nurse found with the provided details
                }
            });
        });
    }
    static async getNurseById(id) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM Nurse WHERE employeeId=? && active=true';

            connection.query(query, [id], (err, results) => {
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
                        nurseData.userName,
                        nurseData.userpassword
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
            const query = 'SELECT * FROM Nurse where active=true';
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
                        nurseData.userName,
                        nurseData.userPassword
                    );
                    lst.push(nurse);
                });
                resolve(lst);
            });
        });
    }
}

module.exports = NurseDBHandler;
