const Joi=require("joi");
const VaccineDBHandler = require("../Database/vaccine");

const createVaccineValidation=Joi.object({
    name:Joi.string().required(),
    manufacturer:Joi.string().required(), 
    dose_Required:Joi.number().required(),
    timeFrame:Joi.number().required(),
    description:Joi.string().required()
})
const deleteValidation=Joi.object({
    id:Joi.number().required()
})
const availabilityChangeValidation=Joi.object({
    id:Joi.number().required(),
    availability:Joi.bool().required()
})
const updateVaccineValidation=Joi.object({
    searchId:Joi.number().required(),
    name:Joi.string().required(),
    manufacturer:Joi.string().required(), 
    dose_Required:Joi.number().required(),
    timeFrame:Joi.number().required(),
    description:Joi.string().required()
})
class vaccineController{
    static async createVaccine(req,res){
        const {error}=createVaccineValidation.validate(req.body);
        if(error){
            console.error(error)

            return res.status(400).json({success:false,error:error.details});
        }
        try{
            const {name,manufacturer,dose_Required,timeFrame,description}=req.body;
            const isExist =await VaccineDBHandler.getVaccine(name,manufacturer);
            if(isExist){
                return res.status(400).json({success:false,message:"Already exist by same name and manufacturer"})
            }
            const vaccine = await VaccineDBHandler.addNewVaccine(name,manufacturer,dose_Required,timeFrame,description)
            if(vaccine){
                return res.status(200).json({success:true,vaccine:vaccine});
            }
            return res.status(400).json({success:false,error:"Server Error while store in Db"});
        }
        catch(error){
            return res.status(500).json({success:false,error:"Server Error"});
        }
    }
    

    static async getAllVaccines(req,res){
        try {
            const vaccines = await VaccineDBHandler.getAllVaccines();
            
            return res.status(200).json({success:true,vaccines:vaccines});
        } catch (error) {
            return res.status(500).json({success:false,error:error});
        }
    }

    static async deleteVacines(req,res){
        const {error} = deleteValidation.validate(req.body);
        if(error){
            return res.status(400).json({success:false,error:error.details});
        }

        try {
            const {id}=req.body;
            const isExist=await VaccineDBHandler.getVaccineById(id);
            if(isExist===null){
                return res.status(400).json({success:false,message:"No vaccine found"});
            }
            const status = await VaccineDBHandler.deleteVaccine(id)
            if(status){
                return res.status(200).json({success:true,message:"Delete Successfully"});
            }
            return res.status(200).json({success:false,message:"Error in deleteing Process"})
        } catch (error) {
            return res.status(500).json({success:false,error:"Server Error"});   
        }
    }
    static async updateVaccine(req,res){
        const {error} = updateVaccineValidation.validate(req.body);
        if(error){
            return res.status(400).json({success:false,error:error.details});
        }
        try {
            const {searchId,name,manufacturer, dose_Required,timeFrame,  description}=req.body;
            let isExist=await VaccineDBHandler.getVaccineById(searchId);
            if(isExist===null){
                return res.status(400).json({success:false,message:"No vaccine found"});
            }

            const status = await VaccineDBHandler.updateVaccine(searchId,name,manufacturer,dose_Required,timeFrame,description)
            if(status){
                return res.status(200).json({success:true,message:"Update Vaccine Successfully"});
            }
            return res.status(200).json({success:false,message:"Error in updating Process"})
        } catch (error) {
            return res.status(500).json({success:false,error:"Server Error"});
        }
    }
    static async changeAvailability(req,res){
        const {error} = availabilityChangeValidation.validate(req.body);
        if(error){
            return res.status(400).json({success:false,error:error.details});
        }
        try {
            const {id,availability}=req.body;
            const isExist=await VaccineDBHandler.getVaccineById(id);
            if(isExist===null){
                return res.status(400).json({success:false,message:"No vaccine found"});
            }
            
            const status = await VaccineDBHandler.updateAvailability(id,availability)
            if(status){
                return res.status(200).json({success:true,message:"Update Availability Successfully"});
            }
            return res.status(200).json({success:false,message:"Error in updating Process"})
        } catch (error) {
            return res.status(500).json({success:false,error:"Server Error"});
        }
    }
}

module.exports=vaccineController;