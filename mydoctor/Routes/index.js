const express=require('express');
const nurseController=require("../Controller/nurse");
const vaccineController = require('../Controller/vaccine')
const TimeSlotController=require("../Controller/timeSlot");
const PatientController = require('../Controller/patient');
const router=express.Router();

//                      Admin
router.get('/admin/getNurses',nurseController.getAllNurse)

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


//                  Patient
module.exports = router;