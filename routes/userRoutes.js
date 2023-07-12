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

router.post("/register",userController.userRegister);
router.post("/register/contractor",userController.userContractorRegister);
router.post("/add/contractor",userController.userRegisterContractor);
router.post("/login",userController.userLogin);
router.put("/resetpassword",userController.userResetPassword);
router.post("/forgot/password",userController.userForgotPassword);

module.exports = router;