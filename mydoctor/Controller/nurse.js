
const Joi=require('joi')
const NurseDBHandler=require("../Database/nurse")


const signUpValidation = Joi.object({
    fName: Joi.string().required(),
    mI:Joi.string().min(1).max(1).required(),
    lName: Joi.string().required(),
    age: Joi.number().min(18).required(),
    gender:Joi.string().required(),
    phone:Joi.string().required(),
    address:Joi.string().required(),
    password:Joi.string().required()
})

const loginValidations=Joi.object({
    fName: Joi.string().required(),
    lName: Joi.string().required(),
    password:Joi.string().required()
})

const NurseController={
    
    async signUp(req,res,next){
        const {error}=signUpValidation.validate(req.body)
        if(error){
            return next(error)
        }
        try {
            const {fName,mI,lName,age,gender,phone,address,password}=req.body;

            const obj = NurseDBHandler.addNurse(fName,lName,mI,password,age,gender,phone,address);
            if(obj != null){
                res.status(200).json({success:true,nurse:obj});
            }
            res.status(500).json({success:false,message:"Server Side error cannot save the nurse"});
        } catch (error) {
            next(error);       
        }
    },



    async login(req, res, next) {
        const { error } = loginValidations.validate(req.body);
        if (error) {
            return next(error);
        }
        
        const { fName, lName, password } = req.body;
        let result = await NurseDBHandler.getNurseDetails(fName,lName, password);
        
        if(result==null){
            res.status(400).json({success:false,message:"Not Found"});
        }
        else{
            res.status(200).json({success:true,nurse:result});
        }
    },


    async getAllNurse(req,res,next){
        try {
            const nurses = await NurseDBHandler.getAllNurse();
                if (nurses !== null) {
                    res.status(200).json({success:true,nurses:nurses});
                } else {
                    res.status(200).json({success:true,nurses:[]});
                }
            }   catch (error) {
            next(error);
        }
    },

    async updateCredentials(req,res,next){
        const {accessToken,refreshToken}=req.cookie;
        // console.log('Cookies: ', req.cookies)

        return res.status(200);
    },


    async deleteUser(req,res,next){
        
    }
    
}


module.exports=NurseController