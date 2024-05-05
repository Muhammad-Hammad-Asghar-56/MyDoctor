const PatientDBHandler = require('../Database/patient');
const JWTServices = require('../Service/JWTService');
const mail=require("../Service/Mail")
// Middleware function to validate JWT tokens

function validateToken(req, res, next) {
    if ( ! req.cookies.accessToken) {
        return res.status(401).json({ message: 'No token provided' });
    }
    const {accessToken,refreshToken} = req.cookies;
    const data = JWTServices.verifyAccessToken(accessToken);
    if(! JWTServices.verifyAccessToken(accessToken)){
        return res.status(400).json({message:"UnAuthorized Token"});
    }
    req._id = JWTServices.verifyAccessToken(accessToken)._id;
    next();
}

async function notifyPatient(req,res,next){
    const {SSN,userName,userEmail} = req.body;

    const patient = await PatientDBHandler.findPatient(userName,SSN);
    console.log(patient[0].userEmail)
    mail.notifyUserLogin(patient[0].userEmail)

    next();
}
async function falsePatientLogin(req,res,next){
    
}
module.exports={validateToken,notifyPatient}