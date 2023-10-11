const express = require("express");
const router = express.Router();
const projectBidController = require('../controllers/projectContractorBidController');
const auth = require('../middlewares/tokenValidate');

router.post("/add", projectBidController.applyProjectBid)
router.get("/get", projectBidController.getAllProjectBid)
router.get("/get/:id", projectBidController.getProjectBid)
router.put("/update/:id", projectBidController.updateProjectBid)

// Contractor API 
router.get("/applied",auth.tokenValidation, auth.contractorValidation, projectBidController.getAllAppliedContractor)

// ProjectManager API 
router.get("/applicant",auth.tokenValidation, auth.ownerValidation, projectBidController.getAllApplicantContractor)

module.exports = router;