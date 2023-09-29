const express = require("express");
const router = express.Router();
const workLogController = require('../controllers/workLogController');
const auth = require('../middlewares/tokenValidate');

// Create a work log (and send mail once submit to the review of the project manager)
// Get all work log for a contrator and a project
// Get all work log for a project group by cantractor
// Approve the Worklog
router.post("/create",auth.tokenValidation,workLogController.createWorkLog);
router.get("/",workLogController.getAllWorkLog);
router.get("/:id",workLogController.getWorkLog);
router.put("/:id",workLogController.updateWorkLog);
// Update the work log for approveal
router.put("/approve-status/:id",auth.tokenValidation,workLogController.updateWorkLogApproval); //need to get the token to differentiate between contrator and subcontractor 

module.exports = router;