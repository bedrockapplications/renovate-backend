const express = require("express");
const router = express.Router();
const projectController = require('../controllers/projectController');
const auth = require('../middlewares/tokenValidate');

router.post("/add",auth.tokenValidation,auth.ownerValidation,projectController.createProject)
router.get("/get",projectController.getAllProject)
router.get("/get/:id",projectController.getProject)
router.put("/update/:id",auth.tokenValidation,auth.ownerValidation,projectController.updateProject)
router.put("/publish/:id",auth.tokenValidation,auth.ownerValidation,projectController.publishProject)
router.delete("/delete/:id",auth.tokenValidation,auth.ownerValidation,projectController.deleteProject)

module.exports = router;