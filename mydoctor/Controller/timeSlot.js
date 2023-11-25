const Joi = require("joi");
const TimeSlotDBHandler = require("../Database/timeSlot");
const Timeslot = require("../DTO/timeSlot");
const VaccineDBHandler = require("../Database/vaccine");
const NurseDBHandler = require("../Database/nurse");
const NurseTimeSlotDBHandler = require("../Database/NurseTimeSlotRecord");

const createTimeSlot = Joi.object({
  vaccineId: Joi.number().required(),
  startTime: Joi.string().required(),
  endTime: Joi.string().required(),
  date: Joi.date().required(),
  round: Joi.number().required(),
});

const registerNurse = Joi.object({
  nurseId: Joi.number().required(),
  timeSlotId: Joi.number().required(),
});

const unRegisterNurse = Joi.object({
  nurseId: Joi.number().required(),
  timeSlotId: Joi.number().required(),
});
const getTimeSlotForNurse=Joi.object({
  nurseId: Joi.number().required()
})
class TimeSlotController {
  static createCampaignTimeSlot = async (req, res) => {
    const { error } = createTimeSlot.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json({ sucess: false, error: error.details[0].message });
    }
    const { vaccineId, startTime, endTime, date, round } = req.body;

    // hh:mm
    try {
      const vaccine = await VaccineDBHandler.getVaccineById(vaccineId);
      if (vaccine == null) {
        // check the vaccine
        return res
          .status(400)
          .json({ sucess: false, error: "Invalid Vaccine Id" });
      }
      if (vaccine.dose_Required < round) {
        // check the round
        return res
          .status(400)
          .json({ sucess: false, error: "Invalid round of vaccine" });
      }

      const campaign = await TimeSlotDBHandler.createCampaignTimeSlot(
        vaccineId,
        round,
        startTime,
        endTime,
        date,
        0,
        0
      );

      if (campaign) {
        return res.status(200).json({ sucess: true, result: { campaign } });
      }
      return res.status(400).json({
        sucess: false,
        error: "Error occurs while store the Time Campign",
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ sucess: false, error: "Server Error occurs" });
    }
  };
  static deleteTimeSlot = async (req, res) => {
    try {
      const { id } = req.params; // Use req.params to access URL parameters

      if (id == null) {
        return res
          .status(400)
          .json({ success: false, error: "ID parameter missing" });
      }

      const result = await TimeSlotDBHandler.deleteTimeSlotById(id);

      if (result) {
        return res
          .status(200)
          .json({ success: true, message: "Deleted Successfully" });
      }

      return res
        .status(404)
        .json({ success: false, message: "Time slot not found" });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, error: "Server Error occurs" });
    }
  };

  static getAllAdminTimeSlots = async (req, res) => {
    try {
      const lst = await TimeSlotDBHandler.getAllCampaignsTimeSlot();
      res.status(200).json({ sucess: true, result: lst });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ sucess: false, error: "Server Error occurs" });
    }
  };

  static getAllTimeSlotToRegiesterNurse = async (req, res) => {
    const {error}= getTimeSlotForNurse.validate(req.body);
    if(error){
      return res.status(400).json({success:false,error:error.message});
    }
    try{
      const {nurseId}=req.body;
      const lst=await TimeSlotDBHandler.getTimeSlotsForNurse(nurseId);
      return res.status(200).json({success:true,results:lst});
    }
    catch(error){
      return res.status(500).json({success: false,error:"Server Error occurs"});
    }
  };
  static registerNurse = async (req, res) => {
    const { error } = registerNurse.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json({ sucess: false, error: error.details[0].message });
    }

    const { nurseId, timeSlotId } = req.body;

    const nurse = await NurseDBHandler.getNurseById(nurseId);
    if (nurse == null) {
      return res.status(400).json({ success: false, error: "Invalid Nurse" });
    }

    const timeSlot = await TimeSlotDBHandler.getTimeslotById(timeSlotId);
    if (timeSlot == null) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid TimeSlot" });
    }

    const isExist = await NurseTimeSlotDBHandler.findNurseTimeSlot(
      nurseId,
      timeSlotId
    );
    console.log(isExist);
    if (isExist) {
      return res.status(400).json({ success: false, error: "Already Exist" });
    }

    const result = await NurseTimeSlotDBHandler.registerNurseTimeSlot(
      nurseId,
      timeSlotId
    );
    if (result) {
      return res
        .status(200)
        .json({
          success: true,
          error: "Successfully register nurse in time slot",
        });
    }

    return res
      .status(200)
      .json({ success: true, error: "Failed to register nurse in time slot" });
  };

  static unRegisterNurse = async (req, res) => {
    const { error } = unRegisterNurse.validate(req.body);
    if (error) {
      return res.status(400).json({ success: false, error: error.message });
    }
    try {
      const { nurseId, timeSlotId } = req.body;
      const nurseFound = await NurseTimeSlotDBHandler.findNurseTimeSlot(
        nurseId,
        timeSlotId,
        req.body
      );
      if (!nurseFound) {
        return res
          .status(400)
          .json({ success: false, error: "Cannot find nurse in given slot" });
      }

      const unregistered = await NurseTimeSlotDBHandler.unRegisterNurseTimeSlot(
        nurseId,
        timeSlotId
      );

      if (unregistered) {
        return res
          .status(200)
          .json({ success: true, message: "Deleted Successfully" });
      }
      return res
        .status(200)
        .json({ success: false, message: "Failed to Delete" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ success: false, error: "Server Error" });
    }
  };
}
module.exports = TimeSlotController;