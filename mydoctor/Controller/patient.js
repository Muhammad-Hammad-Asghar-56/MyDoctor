const Joi = require("joi");
const PatientDBHandler = require("../Database/patient");
const { updateVaccine } = require("../Database/vaccine");

const createPatient = Joi.object({
  SSN: Joi.string().required(),
  fName: Joi.string().required(),
  mI: Joi.string().required(),
  lName: Joi.string().required(),
  age: Joi.string().required(),
  gender: Joi.string().required(),
  race: Joi.string().required(),
  occupationClass: Joi.string().required(),
  medicalHistory: Joi.string().required(),
  phone: Joi.string().required(),
  address: Joi.string().required(),
  userName: Joi.string().required(),
  userPassword: Joi.string().required(),
});
const loginPatientValidation = Joi.object({
  userName: Joi.string().required(),
  userPassword: Joi.string().required(),
});


const updatePatientValidation=Joi.object({
  SSN: Joi.string().required(),
  fName: Joi.string().required(),
  mI: Joi.string().required(),
  lName: Joi.string().required(),
  age: Joi.string().required(),
  gender: Joi.string().required(),
  race: Joi.string().required(),
  occupationClass: Joi.string().required(),
  medicalHistory: Joi.string().required(),
  phone: Joi.string().required(),
  address: Joi.string().required(),
  userName: Joi.string().required(),
  userPassword: Joi.string().required()
});




class PatientController {
  static async createPatient(req, res) {
    const { error } = createPatient.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    try {
      const {
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
      } = req.body;
      let isExit = await PatientDBHandler.getPatientBySSN(SSN);
      if (isExit) {
        return res.status(400).json({ success: false, error: "Already Exist" });
      }
      isExit = await PatientDBHandler.findPatient(userName,userPassword);
      if (isExit) {
        return res.status(400).json({ success: false, error: "UserName & Password should be unique" });
      }
      const result = await PatientDBHandler.createPatient(
        SSN,fName,mI, lName, age, gender,        race,     occupationClass,  medicalHistory,    phone,      address,        userName,        userPassword      );
      if (result) {
        return res.status(200).json({ success: true, result: result });
      }
      res.status(400).json({ success: false, error: "Fail to save" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, error: "Server Error Occurs" });
    }
  }
  static async loginPatient(req, res) {
    const {error} = loginPatientValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ success:false,error:error.message});
    }
    try {
      const {userName,userPassword} = req.body;
      let result = await PatientDBHandler.findPatient(userName,userPassword);
      if (!result) {
        return res
          .status(400)
          .json({ success: false, error: "Invalid Credentials" });
      }
      res.status(200).json({ success: true, result: result });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, error: "Server Error Occurs" });
    }
  }

  static async updatePatient(req,res){
    const {error} = updatePatientValidation.validate(req.body);
    if(error){
      return res.status(400).json({ success:false,error:error.message});
    }
    try {
      const {SSN, fName, mI, lName, age, gender, race, occupationClass, medicalHistory, phone, address, userName, userPassword}=req.body;
      const isExit = await PatientDBHandler.getPatientBySSN(SSN);
      if(isExit == false) {
        return res.status(400).json({ success: true, error: "Not Exist" });
      }
      const result = await PatientDBHandler.updatePatient(SSN, fName, mI, lName, age, gender, race, occupationClass, medicalHistory, phone, address, userName, userPassword)
      if(result){
        return res.status(200).json({success:true,result:isExit});
      }
      return res.status(400).json({success:false,error:"Cannot Update the Patient"});
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, error: "Server Error Occurs" });
    }
  }



}
module.exports = PatientController;
