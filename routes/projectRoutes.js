const express = require("express");
const router = express.Router();
const projectController = require('../controllers/projectController');

router.post("/add",projectController.createProject)
router.get("/get",projectController.getAllProject)
router.get("/get/:id",projectController.getProject)
router.put("/update/:id",projectController.updateProject)
router.delete("/delete/:id",projectController.deleteProject)

module.exports = router;