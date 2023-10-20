const express = require("express");
const router = express.Router();
const projectBidController = require('../controllers/projectContractorBidController');
const auth = require('../middlewares/tokenValidate');
const {s3MultipleFileUpload} = require('../utils/s3fileUpload');

router.post("/add", auth.tokenValidation, auth.contractorValidation, s3MultipleFileUpload.array('documentLink', 3),projectBidController.applyProjectBid)
router.get("/get", projectBidController.getAllProjectBid)
router.get("/get/:id", projectBidController.getProjectBid)
router.put("/update/:id", projectBidController.updateProjectBid)
router.put("/update/status/:id",auth.tokenValidation, auth.ownerValidation, projectBidController.updateProjectBidStatus)

// Contractor API 
router.get("/applied/project",auth.tokenValidation, auth.contractorValidation, projectBidController.getAppliedContractor)
router.get("/applied",auth.tokenValidation, auth.contractorValidation, projectBidController.getAllAppliedContractor)

// ProjectManager API 
router.get("/applicant",auth.tokenValidation, auth.ownerValidation, projectBidController.getAllApplicantContractor)

module.exports = router;