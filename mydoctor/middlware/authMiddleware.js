const { isIpBlocked } = require('../Database/logs');
const NurseDBHandler = require('../Database/nurse');
const PatientDBHandler = require('../Database/patient');
const JWTServices = require('../Service/JWTService');
const mail=require("../Service/Mail")
const requestIp = require('request-ip')

// Middleware function to validate JWT tokens
const mysql=require('mysql')
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

    mail.notifyUserLogin(patient[0].userEmail)

    next();
}

async function notifyNurse(req,res,next){
    let {userName} = req.body;
    userName=mysql.escape(userName)

    console.log(userName)
    const nurse = await NurseDBHandler.getNurseDetails(userName);
    if(nurse){
        mail.notifyUserLogin(nurse.userEmail)
    }
    console.log("here")
    next();
}

async function checkIsIpBlocked(req, res, next) {
    var clientIp = requestIp.getClientIp(req);
    
    try {

        const time = await isIpBlocked(clientIp);
        
        if (time != null) {
            return res.status(403).json({ message: `IP was blocked. Try again after ${time}` });
        }

        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}



module.exports={
    validateToken
    ,notifyPatient
    ,checkIsIpBlocked
    ,notifyNurse
}