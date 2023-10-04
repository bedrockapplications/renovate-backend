const express = require("express");
const router = express.Router();
const workLogController = require("../controllers/workLogController");
const auth = require("../middlewares/tokenValidate");

const {s3MultipleFileUpload} = require('../utils/s3fileUpload');

// Create a work log (and send mail once submit to the review of the project manager)
// Get all work log for a contrator and a project
// Get all work log for a project group by cantractor
// Approve the Worklog
router.post("/create", s3MultipleFileUpload.array('file', 3), auth.tokenValidation, workLogController.createWorkLog);
router.get("/", workLogController.getAllWorkLog);
router.get("/:id", workLogController.getWorkLog);
router.get("/contractor/:id", auth.tokenValidation, workLogController.getAllContractorWorkLog);
router.put("/:id", auth.tokenValidation, workLogController.updateWorkLog);
router.delete("/:id", auth.tokenValidation, workLogController.deleteWorkLog);
// Update the work log for approveal
router.put("/approve-status/:id", auth.tokenValidation, workLogController.updateWorkLogApproval);
module.exports = router;
