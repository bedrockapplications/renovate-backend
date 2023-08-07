const express = require("express");
const router = express.Router();
const documentController = require('../controllers/documentController');

const {s3MultipleFileUpload} = require('../utils/s3fileUpload');
router.post("/uploadDocument", s3MultipleFileUpload.array('file', 1),documentController.createDocument);
router.get("/getDocs", documentController.getDocuments);
router.get("/getFileNames", documentController.getFileNameList);
router.put("/updateDocument/:_id", documentController.updateDocuments);
router.delete("/deleteDocument/:_id", documentController.deleteDocumentById);

module.exports = router;
