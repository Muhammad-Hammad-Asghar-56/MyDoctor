
const Joi = require('joi')
const NurseDBHandler = require("../Database/nurse")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

const signUpValidation = Joi.object({
    fName: Joi.string().required(),
    mI: Joi.string().min(1).max(1).required(),
    lName: Joi.string().required(),
    age: Joi.number().min(18).required(),
    gender: Joi.string().required(),
    phone: Joi.string().required(),
    address: Joi.string().required(),
    password: Joi.string().required(),
    userName:Joi.string().required()
})

const loginValidations = Joi.object({
    userName: Joi.string().required(),
    userPassword: Joi.string().required()
})
const updateNurseValidations = Joi.object({
    searchId: Joi.number().required(),
    fName: Joi.string(),
    mI: Joi.string().min(1).max(1),
    lName: Joi.string(),
    age: Joi.number().min(18),
    gender: Joi.string(),
    phone: Joi.string(),
    address:Joi.string(),
    password : Joi.string(),
    userName:Joi.string()
})
const deleteNurseValidation = Joi.object({
    id: Joi.number().required()
})
const NurseController = {
    async signUp(req, res, next) {
        const { error } = signUpValidation.validate(req.body)
        if (error) {
            console.log(error)
            return res.status(400).json({ success: false, message: error.details});
        }
        try {
            const { fName, mI, lName, age, gender, phone, address,userName, password } = req.body;

            
            const obj = await NurseDBHandler.addNurse(fName, lName, mI,userName, password, age, gender, phone, address);
            if (obj != null) {
                res.status(200).json({ success: true, nurse: obj });
            }
            res.status(500).json({ success: false, message: "Server Side error cannot save the nurse" });
        } catch (error) {
            next(error);
        }
    },

    async login(req, res, next) {
        const { error } = loginValidations.validate(req.body);
        if (error) {
            return res.status(400).json({ success: false, message: error.details});
        }
        try {

            const { userName, userPassword } = req.body;
            let result = await NurseDBHandler.getNurseDetails(userName, userPassword);

            if (result == null) {
                res.status(400).json({ success: false, message: "Not Found" });
            }
            else {
                res.status(200).json({ success: true, nurse: result });
            }
        } catch (error) {
            res.status(500).json({ success: false, message: "Server Error" });
        }
    },

    async getAllNurse(req, res, next) {
        try {
            const nurses = await NurseDBHandler.getAllNurse();
            console.log(nurses)
            if (nurses !== null) {
                res.status(200).json({ success: true, nurses: nurses });
            } else {
                res.status(200).json({ success: true, nurses: [] });
            }
        }
        catch (error) {
            res.status(500).json({ success: false, message: "Server Error" });
        }
    },

    async updateNurse(req, res, next) {
        const { error } = updateNurseValidations.validate(req.body);
        if (error) {
            return res.status(400).json({ success: false, message: error.details });
        }
    
        try {
            const { searchId, fName, mI, lName, userName,password, age, gender, address, phone } = req.body;
    
            // Fetch the existing nurse data from the database
            const existingNurse = await NurseDBHandler.getNurseById(searchId);
    
            if (!existingNurse) {
                return res.status(400).json({ success: false, message: "No Nurse found" });
            }
    
            // Update only the fields that are present in the request body
            existingNurse.fName = fName || existingNurse.fName;
            existingNurse.mI = mI || existingNurse.mI;
            existingNurse.lName = lName || existingNurse.lName;
            existingNurse.password = password || existingNurse.password;
            existingNurse.age = age || existingNurse.age;
            existingNurse.gender = gender || existingNurse.gender;
            existingNurse.address = address !== undefined ? address : existingNurse.address;
            existingNurse.userName = userName !== undefined ? userName : existingNurse.userName
            existingNurse.phone = phone !== undefined ? phone : existingNurse.phone;
            // Save the updated nurse data
            const updatedNurse = await NurseDBHandler.updateNurse(searchId,existingNurse.fName, existingNurse.mI, existingNurse.lName, existingNurse.age, existingNurse.gender, existingNurse.phone, existingNurse.address, existingNurse.userName,existingNurse.password);
    
            return res.status(200).json({ success: true, nurse: updatedNurse });
        } catch (error) {
            console.error("Error updating nurse:", error);
            res.status(500).json({ success: false, message: "Server Error" });
        }
    }, 

    async deleteUser(req, res, next) {
        const { error } = deleteNurseValidation.validate(req.body);
        
        if (error) {
            return res.status(400).json({ success: false, message: error.details});
        }
        try {
            const { id } = req.body;
            const result = await NurseDBHandler.deleteNurse(id);
            if (result === null) {
                return res.status(400).json({ success: false, message: "No Nurse Found" });
            }
            return res.status(200).json({ success: true, nurse: result });
        } catch (error) {
            console.error(error); // Log the error for debugging purposes
            res.status(500).json({ success: false, message: "Server Error" });
        }
    }
}


module.exports = NurseController