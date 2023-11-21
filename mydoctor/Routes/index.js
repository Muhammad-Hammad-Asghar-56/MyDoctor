const express=require('express');
// const authController=require("../Controller/user");
const nurseController=require("../Controller/nurse");
const vaccineController=require("../Controller/vaccine");

const router=express.Router();

//                      Admin
router.get('/admin/getNurses',nurseController.getAllNurse);

//                      Nurse
router.post('/nurse/SignUp',nurseController.signUp);
router.post('/nurse/Login',nurseController.login);
router.post('/nurse/update',nurseController.updateNurse);
router.delete('/nurse/delete',nurseController.deleteUser);

//                      Vaccine
router.post('/vaccine/createVaccine',vaccineController.createVaccine);
router.get('/vaccine/getList',vaccineController.getAllVaccines);
router.delete('/vaccine/delete',vaccineController.deleteVacines);
router.put('/vaccine/updateAvialability',vaccineController.changeAvailability);
router.put('/vaccine/updateVaccine',vaccineController.updateVaccine);

// router.post('/createProduct',productController.createProduct);
module.exports = router;