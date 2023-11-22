const express=require('express');
// const authController=require("../Controller/user");
const nurseController=require("../Controller/nurse");

const router=express.Router();

//                      Admin
router.get('/admin/getNurses',nurseController.getAllNurse)

//                      Nurse
router.post('/nurse/SignUp',nurseController.signUp)
router.post('/nurse/Login',nurseController.login)
router.put('/nurse/update',nurseController.updateNurse)
router.delete('/nurse/delete',nurseController.deleteUser)

//                      Product

// router.post('/createProduct',productController.createProduct);
module.exports = router;