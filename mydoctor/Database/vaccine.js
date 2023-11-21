const connection = require("../Database/index");
const Vaccine=require('../DTO/vaccine');



class VaccineDBHandler{
    static addNewVaccine(name, manufacturer, dose_Required, timeFrame, description) {
        return new Promise((resolve, reject) => {
            const sql = `INSERT INTO Vaccine (name, manufacturer, dose_Required, timeFrame, description) 
                        VALUES (?, ?, ?, ?, ?)`;
            
            const values = [name, manufacturer, dose_Required, timeFrame, description];

            connection.query(sql, values, (error, results, fields) => {
                if (error) {
                    console.error("Error inserting data: ", error);
                    reject(error)
                }
                console.log("New vaccine added successfully");
                resolve(new Vaccine(name,manufacturer,dose_Required,timeFrame,description));
            });

        });
    }
    static getVaccineById(id) {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM Vaccine WHERE id = ?`;
            connection.query(sql, [id], (error, results, fields) => {
                if (error) {
                    console.error("Error fetching vaccine: ", error);
                    reject(error);
                }
                if (results.length === 0) {
                    resolve(null); // If no vaccine found, resolve with null
                } else {
                    const vaccineData = results[0];
                    const vaccine = new Vaccine(vaccineData.name, vaccineData.manufacturer, vaccineData.dose_Required, vaccineData.timeFrame, vaccineData.description);
                    resolve(vaccine);
                }
            });
        });
    }

    static getVaccine(name,manufacture){
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM Vaccine WHERE name = ? and manufacturer = ?`;
            connection.query(sql, [name,manufacture], (error, results, fields) => {
                if (error) {
                    console.error("Error fetching vaccine: ", error);
                    reject(error);
                }
                if (results.length === 0) {
                    resolve(null); // If no vaccine found, resolve with null
                } else {
                    const vaccineData = results[0];
                    const vaccine = new Vaccine(vaccineData.name, vaccineData.manufacturer, vaccineData.dose_Required, vaccineData.timeFrame, vaccineData.description);
                    resolve(vaccine);
                }
            });
        });
    }
    static getAllVaccines() {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM Vaccine`;
            connection.query(sql, (error, results, fields) => {
                if (error) {
                    console.error("Error fetching vaccines: ", error);
                    reject(error);
                }
                const vaccines = results.map(vaccineData => new Vaccine(vaccineData.name, vaccineData.manufacturer, vaccineData.dose_Required, vaccineData.timeFrame, vaccineData.description));
                resolve(vaccines);
            });
        });
    }
    static deleteVaccine(id) {
        return new Promise((resolve, reject) => {
            const sql = `DELETE FROM Vaccine WHERE id = ?`;
            connection.query(sql, [id], (error, results, fields) => {
                if (error) {
                    console.error("Error deleting vaccine: ", error);
                    reject(error);
                }
                console.log("Vaccine deleted successfully");
                resolve(true); // Resolving with true upon successful deletion
            });
        });
    }

    static updateVaccine(searchId, name, manufacturer, dose_required, timeframe, description) {
        return new Promise((resolve, reject) => {
            const sql = `UPDATE Vaccine SET name=?, manufacturer=?, dose_Required=?, timeFrame=?, description=? WHERE id=?`;
            const values = [name, manufacturer, dose_required, timeframe, description, searchId];

            connection.query(sql, values, (error, results, fields) => {
                if (error) {
                    console.error("Error updating vaccine: ", error);
                    reject(error);
                }
                console.log("Vaccine updated successfully");
                resolve(true); // Resolving with true upon successful update
            });
        });
    }
    static updateAvailability(id,Availability){
        return new Promise((resolve, reject) => {
            const sql = `UPDATE Vaccine SET Availability=? WHERE id=?`;
            const values = [Availability,id];

            connection.query(sql, values, (error, results, fields) => {
                if (error) {
                    console.error("Error updating vaccine: ", error);
                    reject(error);
                }
                console.log("Vaccine updated successfully");
                resolve(true); // Resolving with true upon successful update
            });
        });
    }
}

module.exports=VaccineDBHandler;