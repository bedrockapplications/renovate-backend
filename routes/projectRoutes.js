const express = require("express");
const router = express.Router();
const projectController = require('../controllers/projectController');
const auth = require('../middlewares/tokenValidate');

router.post("/add",auth.tokenValidation,projectController.createProject)
router.get("/get",projectController.getAllProject)
router.get("/get/:id",projectController.getProject)
router.put("/update/:id",auth.tokenValidation,projectController.updateProject)
router.put("/publish/:id",auth.tokenValidation,projectController.publishProject)
router.delete("/delete/:id",auth.tokenValidation,projectController.deleteProject)

module.exports = router;