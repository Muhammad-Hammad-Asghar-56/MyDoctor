const Joi = require("joi");
const PatientDBHandler = require("../Database/patient");
const { updateVaccine } = require("../Database/vaccine");
const JWTServices = require("../Service/JWTService").JWTServices;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const ResponsePatient = require("../DTO/ResponsePatient");
const { accessLog } = require("../Database/logs");

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
  userEmail:Joi.string().required()
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
        userEmail
      } = req.body;

      let isExit = await PatientDBHandler.getPatientBySSN(SSN);

      if (isExit) {
        return res.status(400).json({ success: false, error: "Already Exist" });
      }

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
        hashedPassword,
        userEmail
      );
      if (result) {

        
        const accessSignintoken = JWTServices.signAccessToken({ SSN }, "60m");
        const accessRefreshtoken = JWTServices.signRefreshToken({ SSN }, "60m");

        res.cookie("accessToken", accessSignintoken, {
          maxAge: 1000 * 60 * 60 * 24,
          httpOnly: true,
        });

        res.cookie("refreshToken", accessRefreshtoken, {
          maxAge: 1000 * 60 * 60 * 24,
          httpOnly: true,
        });



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
      const accessToken = req.cookies.accessToken;
      const refreshToken = req.cookies.refreshToken;

      const { userName, userPassword, SSN } = req.body;
    
      let result = await PatientDBHandler.findPatient(userName, SSN);

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
        accessLog(req);
        
        return res
          .status(400)
          .json({ success: false, error: "Invalid Credentials" });
      }

      const id = +result[0].SSN.split("-").join("");
      
      const accessSignintoken =await JWTServices.signAccessToken({ id }, "60m");
      const accessRefreshtoken =await JWTServices.signRefreshToken({ id }, "60m");

      res.cookie("accessToken", accessSignintoken, {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
      });

      res.cookie("refreshToken", accessRefreshtoken, {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
      });

      res.status(200).json({ success: true, patient:new ResponsePatient(result) });
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
