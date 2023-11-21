
const Joi = require('joi')
const NurseDBHandler = require("../Database/nurse")


const signUpValidation = Joi.object({
    fName: Joi.string().required(),
    mI: Joi.string().min(1).max(1).required(),
    lName: Joi.string().required(),
    age: Joi.number().min(18).required(),
    gender: Joi.string().required(),
    phone: Joi.string().required(),
    address: Joi.string().required(),
    password: Joi.string().required()
})

const loginValidations = Joi.object({
    fName: Joi.string().required(),
    lName: Joi.string().required(),
    password: Joi.string().required()
})
const updateNurseValidations = Joi.object({
    searchId: Joi.number().required(),
    fName: Joi.string().required(),
    mI: Joi.string().min(1).max(1).required(),
    lName: Joi.string().required(),
    age: Joi.number().min(18).required(),
    gender: Joi.string().required(),
    phone: Joi.string().required(),
    address: Joi.string().required(),
    password:Joi.string().required()
})
const deleteNurseValidation = Joi.object({
    id: Joi.number().required()
})
const NurseController = {

    async signUp(req, res, next) {
        const { error } = signUpValidation.validate(req.body)
        if (error) {
            return res.status(400).json({ success: false, message: error.details});
        }
        try {
            const { fName, mI, lName, age, gender, phone, address, password } = req.body;

            const obj = NurseDBHandler.addNurse(fName, lName, mI, password, age, gender, phone, address);
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

            const { fName, lName, password } = req.body;
            let result = await NurseDBHandler.getNurseDetails(fName, lName, password);

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
            return res.status(400).json({ success: false, message: error.details});
        }
        try {


            const { searchId, fName, mI, lName, age, gender, phone, address,password } = req.body
            const data = await NurseDBHandler.updateNurse(searchId, fName, mI, lName, age, gender, phone, address,password)
            if(data!=null){
                return res.status(200).json({ success: true, nurse: data });
            }
            else{
                return res.status(400).json({success:false,message:"No Nurse found"})
            }
        } catch (error) {
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