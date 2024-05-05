const connection = require("../Database/index");
const Patient = require("../DTO/patient");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
// const Patient = require("../DTO/patient");
class PatientDBHandler {
    static createPatient(
        SSN,
        fName,
        mI,
        lName,
        age,
        gender,
        race,
        occupationClass,
        medicalHistory,
        phone,
        address,
        userName,
        userPassword,
        userEmail
    ) {
        return new Promise((resolve, reject) => {
            const query =
                "INSERT INTO Patient (SSN, fName, mI, lName, age, gender, race, occupationClass, medicalHistory, phone, address, userName, userPassword,userEmail) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)";
            const values = [
                SSN,
                fName,
                mI,
                lName,
                age,
                gender,
                race,
                occupationClass,
                medicalHistory,
                phone,
                address,
                userName,
                userPassword,
                userEmail
            ];

            connection.query(query, values, (error, results) => {
                if (error) {
                    console.error(error);
                    reject(error);
                    return;
                }
                resolve(
                    new Patient(
                        SSN,
                        fName,
                        mI,
                        lName,
                        age,
                        gender,
                        race,
                        occupationClass,
                        medicalHistory,
                        phone,
                        address,
                        userName,
                        userPassword,
                        userEmail
                    )
                );
            });
        });
    }

    static async getAllPatient()
    {
        let lst;
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM Patient ';
            connection.query(query, (error, results) => {
                if (error) {
                    console.error(error); // Corrected variable name here
                    reject(error);
                    return;
                }
                lst = [];
                results.forEach(PatientData => {
                    const patient  = new Patient(
                        PatientData.SSN,
                        PatientData.fName,
                        PatientData.mI,
                        PatientData.lName,
                        PatientData.age,
                        PatientData.gender,
                        PatientData.race,
                        PatientData.occupationClass,
                        PatientData.medicalHistory,
                        PatientData.phone,
                        PatientData.address,
                        PatientData.userName,
                        PatientData.userPassword
                    );
                    lst.push(patient);
                });
                resolve(lst);
            });
        });

    }

    static getPatientBySSN(SSN) {
        return new Promise((resolve, reject) => {
            const query = "SELECT * FROM Patient WHERE SSN = ?";

            connection.query(query, [SSN], (error, results) => {
                if (error) {
                    console.error(error);
                    reject(error);
                    return;
                }
                if(results.length > 0) {
                    resolve(results[0]);
                }
                resolve(null);
            });
        });
    }

    static findPatient(userName, SSN) {
        return new Promise((resolve, reject) => {
            const query =
                "SELECT * FROM Patient WHERE userName = ? AND SSN = ?";

            connection.query(query, [userName, SSN],async (error, results) => {
                if (error) {
                    console.error(error);
                    reject(error);
                    return;
                }
                if (results.length > 0) {
                    resolve(results);
                }
                resolve(null);
            });
        });
    }



    static updatePatient(
        SSN,
        fName,
        mI,
        lName,
        age,
        gender,
        race,
        occupationClass,
        medicalHistory,
        phone,
        address,
        userName,
        userPassword
    ) {
        return new Promise((resolve, reject) => {
            // Your SQL update query to update patient information
            const updateQuery = `
                    UPDATE patient 
                    SET fName = ?, mI = ?, lName = ?, age = ?, gender = ?, race = ?, occupationClass = ?, 
                    medicalHistory = ?, phone = ?, address = ?, userName = ?, userPassword = ?
                    WHERE SSN = ?`;

            // Execute the query with provided data
            connection.query(
                updateQuery,
                [fName, mI, lName, age, gender, race, occupationClass, medicalHistory, phone, address, userName, userPassword, SSN,], (error, results) => {
                    if (error) {
                        console.error(error);
                        reject(error);
                    } else {
                        console.log(results);
                        if(results.affectedRows>0){
                            resolve(results);
                        }
                        resolve(null);
                    }
                }
            );
        });
    }
}
module.exports = PatientDBHandler;
