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
    static updateNurse(searchId, fname, mI, lName, age, gender, phone, address) {
        const query = `UPDATE Nurse SET fName = ?, mI = ?, lName = ?, age = ?, gender = ?, phone = ?, address = ? WHERE employeeID = ?`;

        connection.query(query, [fname, mI, lName, age, gender, phone, address, searchId], (err, results) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log(results);
        });
    }

    static deleteNurse(searchId) {
        const query = `delete from Nurse where empoloyeeId = ?`;

        connection.query(query, [searchId], (err, results) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log(results);
        });
    }

    // static getNurseDetails(fName,lName,password) {

    //     const query = `SELECT * FROM Nurse WHERE fname=? and lname = ? and password=?`;

    //     connection.query(query, [fName,lName,password], (err, results) => {
    //         if (err) {
    //             console.error(err);
    //             return;
    //         }

    //         if (results.length > 0) {
    //             const nurseData = results[0];
    //             const nurse=new Nurse(
    //                 nurseData.employeeID,
    //                 nurseData.fName,
    //                 nurseData.mI,
    //                 nurseData.lName,
    //                 nurseData.age,
    //                 nurseData.gender,
    //                 nurseData.phone,
    //                 nurseData.address,
    //                 nurseData.password
    //             );
    //             return nurse;
    //         } else {
    //             return null; // If no nurse found with the provided ID
    //         }
    //     });
    // } 
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
    


    //     static getAllNurse(callback) {

    //         const query = `SELECT * FROM Nurse`;

    //         connection.query(query, (err, results) => {
    //             if (err) {
    //                 console.error(err);
    //                 return;
    //             }

    //             let nurses = [];
    //             results.forEach(nurseData => {
    //                 const nurse = new Nurse(
    //                     nurseData.employeeID,
    //                     nurseData.fName,
    //                     nurseData.mI,
    //                     nurseData.lName,
    //                     nurseData.age,
    //                     nurseData.gender,
    //                     nurseData.phone,
    //                     nurseData.address,
    //                     nurseData.password
    //                 );
    //                 nurses.push(nurse);
    //             });
    //             callback(nurses);
    //         });
    //     }
}

module.exports = NurseDBHandler;
