const express = require("express");
const router = express.Router();
const securityQuestionController = require('../controllers/securityQuestionController');

router.post("/add",securityQuestionController.createQuestion)
router.get("/get",securityQuestionController.getAllQuestions)
router.get("/get/:id",securityQuestionController.getQuestion)
router.put("/update/:id",securityQuestionController.updateQuestion)
router.delete("/delete/:id",securityQuestionController.deleteQuestion)

module.exports = router;