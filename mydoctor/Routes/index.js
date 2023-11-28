const express=require('express');
const nurseController=require("../Controller/nurse");
const vaccineController = require('../Controller/vaccine')
const TimeSlotController=require("../Controller/timeSlot");
const PatientController = require('../Controller/patient');
const ScheduleController = require('../Controller/PatientSchedule');
const timeSlotDBHandler = require('../Database/timeSlot');
const router=express.Router();

//                      Admin
router.get('/admin/getNurses',nurseController.getAllNurse)
router.get('/admin/getPatient',PatientController.getAllPatient)


//                      Nurse
router.post('/nurse/SignUp',nurseController.signUp)
router.post('/nurse/Login',nurseController.login)
router.put('/nurse/update',nurseController.updateNurse)
router.delete('/nurse/delete',nurseController.deleteUser)
//                      Patient

router.post('/patient/create',PatientController.createPatient)
router.post('/patient/login',PatientController.loginPatient)
router.put('/patient/update',PatientController.updatePatient)


//                      Vaccine
router.post('/vaccine/createVaccine',vaccineController.createVaccine);
router.get('/vaccine/getList',vaccineController.getAllVaccines);
router.delete('/vaccine/delete',vaccineController.deleteVacines);
router.put('/vaccine/updateAvialability',vaccineController.changeAvailability);
router.put('/vaccine/updateVaccine',vaccineController.updateVaccine);



//                     Time Slot
router.post('/timeSlot/createTimeSlot',TimeSlotController.createCampaignTimeSlot)
router.get('/admin/allTimeSlot',TimeSlotController.getAllAdminTimeSlots)
router.delete('/timeSlot/delete/:id',TimeSlotController.deleteTimeSlot)



//                  Nurse Time Slot
router.post('/timeSlot/nurse/register',TimeSlotController.registerNurse);
router.post('/timeSlot/nurse/unregister',TimeSlotController.unRegisterNurse);
router.post('/timeSlot/nurse/getList',TimeSlotController.getAllTimeSlotToRegiesterNurse);
router.post('/timeSlot/nurse/getHistory',TimeSlotController.getAllTimeSlotHistoryNurse)

//                  Patient Time Scheduling
router.post("/timeSlot/patient/register",ScheduleController.registerSchedulePatient); 
router.post("/timeSlot/patient/unRegister",ScheduleController.unRegisterSchedulePatient); 
router.post("/timeSlot/patient/getList",TimeSlotController.getAllTimeSlotToRegiesterPatient);
router.post("/timeSlot/patient/markVaccine",ScheduleController.checkedVaccination);
router.post("/timeSlot/patient/getHistory",TimeSlotController.getTimeSlotHistoryForPatient)
module.exports = router;