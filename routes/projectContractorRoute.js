const express = require("express");
const router = express.Router();
const projectContractorController = require('../controllers/projectContractorController');
const auth = require('../middlewares/tokenValidate');

router.post("/add", projectContractorController.createProjectContractor)
router.get("/get", projectContractorController.getAllProjectContractor)
router.get("/get/:id", projectContractorController.getProjectContractor)
router.put("/update/:id", projectContractorController.updateProjectContractor)
router.delete("/delete/:id", projectContractorController.deleteProjectContractor)

// Contractor API 

router.get("/get-projects",auth.tokenValidation, auth.contractorValidation, projectContractorController.getAllContractorProjects)


module.exports = router;