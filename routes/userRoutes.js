// NOTE:Contractor/ Project manager/ user are Same
// TODO endpoint required
// TODO Registration (Contractor and SubContractor)
// TODO Add Sub-Contrator by Contrator
// TODO Login (Contractor and SubContractor)
// TODO Edit Profile (Contractor and SubContractor)
// TODO View Profile (Contractor and SubContractor)
// TODO Update Password (Contractor and SubContractor)
// TODO Sub-Contrator add services provided

const express = require("express");
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middlewares/tokenValidate');

const {s3MultipleFileUpload} = require('../utils/s3fileUpload');

router.post("/register",userController.userRegister);
router.post("/register/contractor",userController.userContractorRegister);
router.post("/add/contractor",auth.tokenValidation,userController.userRegisterContractor);
router.post("/login",userController.userLogin);
router.put("/resetpassword",auth.tokenValidation, userController.userResetPassword);
router.post("/forgot/password",userController.userForgotPassword);
router.get("/details",userController.getUserDetails);
router.get("/getdetails",auth.tokenValidation,userController.getUserDetail);
router.put("/update/security-question",auth.tokenValidation,userController.editUserSecurity);
router.put("/update",auth.tokenValidation,userController.updateUserDetails);
router.put("/updateImage",auth.tokenValidation,s3MultipleFileUpload.array('profilePic', 1),userController.updateUserPic);
router.put("/add/services",auth.tokenValidation,userController.editServicesProvided);
router.get("/getall",userController.getallUser);

module.exports = router;