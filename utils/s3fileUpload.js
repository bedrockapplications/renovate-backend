const multer = require("multer");
const aws = require("aws-sdk");
const { S3Client } = require('@aws-sdk/client-s3');
const multerS3 = require("multer-s3");
const path = require("path")

// const moment = require('moment');

const s3 = new aws.S3({
    // accessKeyId: process.env.S3_ACCESS_KEY,
    // secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    // region: process.env.S3_BUCKET_REGION,

  });

//   const s3 = new S3Client({
//     accessKeyId: process.env.S3_ACCESS_KEY,
//     secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
//     region: process.env.S3_BUCKET_REGION,
//   });



  const maxSize = 5 * 1024 * 1024; // for 5 MB
const s3MultipleFileUpload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME,
    acl: '',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
        cb(null, file.originalname);
      },
  }),
  limits: { fileSize: maxSize },
  // fileFilter: function (req, file, cb) {
  //   checkFileType(file, cb);
  // },
});

function checkFileType(file, cb) {
    // Allowed ext
    const filetypes = /jpg|jpeg|png|pdf/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);
  
    if (mimetype && extname) return cb(null, true);
    else {
      var message = `${file.originalname} is invalid. Only images(jpg, jpeg and png) are allowed`;
      return cb(message, null);
    }
}


module.exports = {
    s3MultipleFileUpload
};