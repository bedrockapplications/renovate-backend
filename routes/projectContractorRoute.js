const express = require("express");
const router = express.Router();
const projectContractorController = require('../controllers/projectContractorController');

router.post("/add", projectContractorController.createProjectContractor)
router.get("/get", projectContractorController.getAllProjectContractor)
router.get("/get/:id", projectContractorController.getProjectContractor)
router.put("/update/:id", projectContractorController.updateProjectContractor)
router.delete("/delete/:id", projectContractorController.deleteProjectContractor)

module.exports = router;