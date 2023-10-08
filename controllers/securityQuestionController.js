const sqMiddleware = require("../middlewares/securityQuestionMiddleware");

const createQuestion = (req, res, next) => {
  let { question } = req.body;
  if (!question) {
    res.json({ status: false, message: "Required fields are missing" });
  }
  sqMiddleware
    .createRecord({ question })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log("err===", err);
      res.json({ status: false, message: err.message });
    });
};
const getQuestion = (req, res, next) => {
  let filterQuery = req.query;
  let projectQuery = {};
  filterQuery = {
    _id: req.params.id,
  };
  sqMiddleware
    .getSingleRecord({ filterQuery, projectQuery })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log("err===", err);
      res.json({ status: false, message: err.message });
    });
};
const getAllQuestions = (req, res, next) => {
  let filterQuery = req.query;
  let projectQuery = {};
  if(req.query.status){
    filterQuery.status = req.query.status
  } else filterQuery.status ="active"
  sqMiddleware
    .getAllRecords({ filterQuery, projectQuery })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log("err===", err);
      res.json({ status: false, message: err.message });
    });
};
const updateQuestion = (req, res, next) => {
  let filterQuery = req.query;
  let updateObj = req.body;
  filterQuery = {
    _id: req.params.id,
  };
  sqMiddleware
    .updateRecord({ filterQuery, updateObj })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log("err===", err);
      res.json({ status: false, message: err.message });
    });
};
const deleteQuestion = (req, res, next) => {
  let filterQuery = req.query;
  let updateObj = {
    status: "inactive",
  };
  filterQuery = {
    _id: req.params.id,
  };
  sqMiddleware
    .updateRecord({ filterQuery, updateObj })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log("err===", err);
      res.json({ status: false, message: err.message });
    });
};

module.exports = {
  createQuestion,
  getQuestion,
  getAllQuestions,
  updateQuestion,
  deleteQuestion,
};
