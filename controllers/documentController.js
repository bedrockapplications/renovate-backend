const documentMiddleware = require("../middlewares/documentMiddleware");

const createDocument = async(req, res, next) =>{
    let {userId, projectId, categoryType} = req.body;
    let objData ={userId, projectId, categoryType};
    let fileDate = req.files[0];
    let fileName = fileDate.originalname.split('.');
    objData.fileName = fileName[0];
    objData.fileType = fileDate.mimetype;
    objData.contentType = fileName[1];
    objData.filePath = fileDate.location;
    objData.docStatus = "In Review";
    documentMiddleware
  .createRecordBulk([objData])
  .then((data) => {
    res.json(data);
  })
  .catch((err) => {
    console.log("err===", err);
    res.json({ status: false, message: err.message });
  });
    // res.json({
    // status:true,
    // message: req.files,
    // data:req.body
    // })
}

const getDocuments = async (req, res, next) =>{
    let filterQuery = req.query;
    documentMiddleware
  .getAllRecordsCustom(filterQuery)
  .then((data) => {
    res.json(data);
  })
  .catch((err) => {
    console.log("err===", err);
    res.json({ status: false, message: err.message });
  });
}
const getFileNameList = async (req, res, next) =>{
    let filterQuery = req.query;
    let projectQuery = {};
    documentMiddleware
  .getAllRecords({ filterQuery, projectQuery })
  .then((data) => {
    res.json(data);
  })
  .catch((err) => {
    console.log("err===", err);
    res.json({ status: false, message: err.message });
  });

}

const updateDocuments = async (req, res, next) =>{
    let filterQuery={};
    let updateObj=req.body;
    filterQuery._id = req.params.id;
    documentMiddleware.updateRecord({filterQuery, updateObj}).then((data) => {
        res.json(data);
      })
      .catch((err) => {
        console.log("err===", err);
        res.json({ status: false, message: err.message });
      });
}

const deleteDocumentById = async (req, res, next) =>{
    let filterQuery={};
    let updateObj={};
    filterQuery._id = req.params.id;
    updateObj= {
        status:"inactive"
    }
    documentMiddleware.updateRecord({filterQuery, updateObj}).then((data) => {
        res.json(data);
      })
      .catch((err) => {
        console.log("err===", err);
        res.json({ status: false, message: err.message });
      });
}

module.exports ={ 
    createDocument,
    getDocuments,
    getFileNameList,
    updateDocuments,
    deleteDocumentById
}


// file response
// req.files=
// [
//     {
//             "fieldname": "file",
//     "originalname": "devoptool.jpg",
//     "encoding": "7bit",
//     "mimetype": "image/jpeg",
//     "size": 52872,
//     "bucket": "bedrockapp-media",
//     "key": "devoptool.jpg",
//     "acl": "",
//     "contentType": "application/octet-stream",
//     "contentDisposition": null,
//     "contentEncoding": null,
//     "storageClass": "STANDARD",
//     "serverSideEncryption": null,
//     "metadata": {
//         "fieldName": "file"
//     },
//     "location": "https://bedrockapp-media.s3.amazonaws.com/devoptool.jpg",
//     "etag": "\"9dabcbb8382542255fc8fdd37b3b3108\""
// }   
// ]