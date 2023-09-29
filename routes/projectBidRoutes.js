const express = require("express");
const router = express.Router();
const projectBidController = require('../controllers/projectContractorBidController');

router.post("/add", projectBidController.applyProjectBid)
router.get("/get", projectBidController.getAllProjectBid)
router.get("/get/:id", projectBidController.getProjectBid)
router.put("/update/:id", projectBidController.updateProjectBid)

module.exports = router;