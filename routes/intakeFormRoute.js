const express = require("express");
const router = express.Router();
const intakeFormController = require('../controllers/intakeFormController');

// Create IntakeForm
// Update IntakeForm 
// Get all IntakeForm 
// Delete IntakeForm 
// Publish the IntakeForm added in project
router.post("/create",intakeFormController.createIntakeform);
router.get("/",intakeFormController.getAllIntakeform);
router.get("/:id",intakeFormController.getIntakeform);
router.put("/:id",intakeFormController.updateIntakeform);
router.delete("/:id",intakeFormController.deleteIntakeform);

module.exports = router;
