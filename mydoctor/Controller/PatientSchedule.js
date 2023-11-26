const Joi=require("joi");
const PatientDBHandler = require("../Database/patient");
const VaccineDBHandler = require("../Database/vaccine");
const timeSlotDBHandler=require("../Database/timeSlot");
const SchedulePatientDBHandler=require("../Database/PatientSchedule");
const PatientSchedule = require("../DTO/PatientSchedule");

const registerSchedulePatientValidation = Joi.object({
    patientSSN:Joi.string().required(),
    vaccineId:Joi.number().required(),
    timeSlotId:Joi.number().required()
});

const unregisterSchedulePatientValidation = Joi.object({
    patientSSN:Joi.string().required(),
    vaccineId:Joi.number().required(),
    timeSlotId:Joi.number().required()
});

const checkVaccination = Joi.object({
    patientSSN: Joi.string().required(),
    timeSlotId: Joi.number().required(),
});

  
class ScheduleController{

    static registerSchedulePatient = async(req,res)=>{
        const {error} = registerSchedulePatientValidation.validate(req.body);
        if(error){
            return res.status(500).json({success:false,message:error.message});
        }
        try {
            const {patientSSN,vaccineId,timeSlotId}=req.body;
            const patient =await PatientDBHandler.getPatientBySSN(patientSSN);
            if(! patient) {
                return res.status(401).json({success:false, message:"No such patient found"});
            }
            const vaccine=await VaccineDBHandler.getVaccineById(vaccineId );
            if(! vaccine) {
                return res.status(401).json({success:false, message:"No such vaccine found"});
            }
            const timeSlot =await timeSlotDBHandler.getTimeslotById(timeSlotId);
            if(! timeSlot) {
                return res.status(401).json({success:false, message:"No such time slot found"});
            }
            const alreadyRegisterd=await SchedulePatientDBHandler.findPatientScheduleTimeSlot(patientSSN,vaccineId,timeSlotId);
            if(alreadyRegisterd){
                return res.status(401).json({success:false, message:"Already Registered"});
            }
            const clearRound=await SchedulePatientDBHandler.haveClearPreviousVaccineRecord(patientSSN,vaccineId);
            if(clearRound >= timeSlot.round) {
                return res.status(400).json({success:false,error:`Cannot Register for lower or same doze ! You take this one`});
            }
            if(clearRound+1==timeSlot.round){
                const result = await SchedulePatientDBHandler.registerTimeSlot(patientSSN,vaccineId,timeSlotId);
                if(result!= null){
                    return res.status(200).json({success:true, result:"Successively store"});
                }
                return res.status(400).json({success:false, result:"Cannot Successfully store"});
            }
            else{
                return res.status(400).json({success:false, result:"Complete the Duration or take the prev. doze first"});
            }
        } catch (error) {
            return res.status(500).json({success:false, message:"Server error found"});
        }
    }
    
    static unRegisterSchedulePatient=async(req,res)=>{
        const {error} = unregisterSchedulePatientValidation.validate(req.body);
        if(error){
            return res.status(400).json({success:false,error:error.message});
        }
        const {patientSSN,vaccineId,timeSlotId}=req.body;
        const patient =await PatientDBHandler.getPatientBySSN(patientSSN);
        if(! patient) {
            return res.status(401).json({success:false, message:"No such patient found"});
        }
        const vaccine=await VaccineDBHandler.getVaccineById(vaccineId );
        if(! vaccine) {
            return res.status(401).json({success:false, message:"No such vaccine found"});
        }
        const timeSlot =await  timeSlotDBHandler.getTimeslotById(timeSlotId);
        if(! timeSlot) {
            return res.status(401).json({success:false, message:"No such time slot found"});
        }
        const isRegister=await SchedulePatientDBHandler.findPatientScheduleTimeSlot(patientSSN,vaccineId,timeSlotId);
        if(isRegister == null) {
            return res.status(400).json({success:false,error:"Invalid Details"});
        }

        const result =await SchedulePatientDBHandler.unRegisterPatientSchedule(patientSSN,vaccineId, timeSlotId);
        if(result){
            return res.status(200).json({success:true, result:"Successfully Un-Registered"});
        }
        return res.status(200).json({success:false, result:"Unable to Un-Register"});
        
    }



    static checkedVaccination=async(req,res)=>{
        const {error}=  checkVaccination.validate(req.body);
        if(error){
          return res.status(400).json({success:false,error:error.message});
        }
        try {
            const {patientSSN,timeSlotId}=req.body;
          const result=await SchedulePatientDBHandler.markVaccination(patientSSN,timeSlotId);
          if(result){
            return res.status(200).json({success:true,message:"Successfully update status"})
          }
          return res.status(400).json({success:false,message:"Failed to update status"})
            
        } catch (error) {
          return res.status(500).json({success: false,error:"Server Error occurs"});
        }
      }
}
module.exports=ScheduleController;