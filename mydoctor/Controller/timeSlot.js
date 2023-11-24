const Joi = require("joi");
const TimeSlotDBHandler = require("../Database/timeSlot");
const Timeslot = require("../DTO/timeSlot");
const VaccineDBHandler = require("../Database/vaccine");
const createTimeSlot = Joi.object({
  vaccineId: Joi.number().required(),
  startTime: Joi.string().required(),
  endTime: Joi.string().required(),
  date: Joi.date().required(),
  round: Joi.number().required(),
});

const deleteTimeSlot=Joi.object({
  timeSlotId:Joi.number().required()
})
class TimeSlotController {
  static createCampaignTimeSlot = async (req, res) => {
    const { error } = createTimeSlot.validate(req.body);
    if (error) {
      res.status(400).json({ sucess: false, error: error.details[0].message });
    }
    const { vaccineId, startTime, endTime, date, round } = req.body;

    // hh:mm
    try {
      
      const vaccine=await VaccineDBHandler.getVaccineById(vaccineId);
      if(vaccine==null){ // check the vaccine 
        return res.status(400).json({sucess:false,error:"Invalid Vaccine Id"}); 
      }
      if(vaccine.dose_Required < round){ // check the round
        return res.status(400).json({sucess:false,error:"Invalid round of vaccine"}); 
      }
      
      
      const campaign = await TimeSlotDBHandler.createCampaignTimeSlot(
        vaccineId,round,startTime , endTime, date, 0, 0
      );

      if (campaign) {
        return res.status(200).json({ sucess: true, result: {campaign} });
      }
      return res
        .status(400)
        .json({
          sucess: false,
          error: "Error occurs while store the Time Campign",
        });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ sucess: false, error: "Server Error occurs" });
    }
  }
  static deleteTimeSlot = async (req, res) => {
    try {
        const { id } = req.params; // Use req.params to access URL parameters

        if (id == null) {
            return res.status(400).json({ success: false, error: "ID parameter missing" });
        }
        
        const result = await TimeSlotDBHandler.deleteTimeSlotById(id);

        if (result) {
            return res.status(200).json({ success: true, message: "Deleted Successfully" });
        }

        return res.status(404).json({ success: false, message: "Time slot not found" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, error: "Server Error occurs" });
    }
}

  static getAllAdminTimeSlots=async(req,res)=>{
    try {
      const lst = await TimeSlotDBHandler.getAllCampaignsTimeSlot();
      res.status(200).json({sucess:true,result:lst});
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ sucess: false, error: "Server Error occurs" });
    }
  }



  static getTimeSlot
}
module.exports=TimeSlotController;