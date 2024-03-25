const Joi = require("joi");
const PatientDBHandler = require("../Database/patient");
const { updateVaccine } = require("../Database/vaccine");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const createPatient = Joi.object({
  SSN: Joi.string().required(),
  fName: Joi.string().required(),
  mI: Joi.string().required(),
  lName: Joi.string().required(),
  age: Joi.number().required(),
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
  // SSN:Joi.string().required(),
  SSN: Joi.string().required(),
});

const updatePatientValidation = Joi.object({
  SSN: Joi.string().required(),
  fName: Joi.string().required(),
  mI: Joi.string().required(),
  lName: Joi.string().required(),
  age: Joi.number().required(),
  gender: Joi.string().required(),
  race: Joi.string().required(),
  occupationClass: Joi.string().required(),
  medicalHistory: Joi.string().required(),
  phone: Joi.string().required(),
  address: Joi.string().required(),
  userName: Joi.string().required(),
  userPassword: Joi.string().required(),
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

      // Bcrypt password to check from database because in database
      // password is store in hashed from
      // hashed password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(userPassword, salt);

      isExit = await PatientDBHandler.findPatient(userName, hashedPassword);

      if (isExit) {
        return res.status(400).json({
          success: false,
          error: "UserName & Password should be unique",
        });
      }

      const result = await PatientDBHandler.createPatient(
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
        hashedPassword
      );
      if (result) {
        return res.status(200).json({ success: true, result: result });
      }
      res.status(400).json({ success: false, error: "Fail to save" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, error: "Server Error Occurs" });
    }
  }

  // --------------------- Login Patient------------------------
  static async loginPatient(req, res) {
    const { error } = loginPatientValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ success: false, error: error.message });
    }
    try {
      const { userName, userPassword, SSN } = req.body;

      let result = await PatientDBHandler.findPatient(userName, SSN);
      console.log(result[0].SSN);

      if (!result) {
        return res
          .status(400)
          .json({ success: false, error: "User with SSN not found" });
      }

      const validPassword = await bcrypt.compare(
        userPassword,
        result[0].userPassword
      );
      if (!validPassword) {
        return res
          .status(400)
          .json({ success: false, error: "Invalid Credentials" });
      }

      const id = +result[0].SSN.split("-").join("");
      // const token = await this.GenerateToken(+result[0].SSN.split('-').join(""));

      const token = await jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: "30d",
      });
      console.log(result);

      res.status(200).json({success:true, token, patient:result});
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, error: "Server Error Occurs" });
    }
  }

  // // Generate Jwt token
  static async GenerateToken(id) {
    console.log(id);
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
  }

  static async updatePatient(req, res) {
    const { error } = updatePatientValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ success: false, error: error.message });
    }
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
      const isExit = await PatientDBHandler.getPatientBySSN(SSN);
      if (isExit == false) {
        return res.status(400).json({ success: true, error: "Not Exist" });
      }
      const result = await PatientDBHandler.updatePatient(
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
      );
      if (result) {
        return res.status(200).json({ success: true, result: isExit });
      }
      return res
        .status(400)
        .json({ success: false, error: "Cannot Update the Patient" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, error: "Server Error Occurs" });
    }
  }

  static async getAllPatient(req, res, next) {
    try {
      const patients = await PatientDBHandler.getAllPatient();
      console.log(patients);
      if (patients !== null) {
        res.status(200).json({ success: true, patients: patients });
      } else {
        res.status(200).json({ success: true, patients: [] });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: "Server Error" });
    }
  }
}
module.exports = PatientController;
