const projectContractorMiddleware = require("../middlewares/projectContractorMiddleware");


const createProjectContractor = async(req, res, next) =>{
    let { projectId, contractorId } = req.body;
  if (!projectId || !contractorId) {
    res.json({ status: false, message: "Required fields are missing" });
  }
  projectContractorMiddleware
    .createRecord({ projectId, contractorId })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log("err===", err);
      res.json({ status: false, message: err.message });
    });
}

const getProjectContractor = async(req, res, next) =>{
    let filterQuery = req.query;
    let projectQuery = {};
    filterQuery = {
      _id: req.params.id,
    };
    projectContractorMiddleware
      .getSingleRecord({ filterQuery, projectQuery })
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        console.log("err===", err);
        res.json({ status: false, message: err.message });
      });
}

const getAllProjectContractor = async(req, res, next) =>{
    let filterQuery = req.query;
    let projectQuery = {};
    if(req.query.status){
      filterQuery = req.query.status
    } else filterQuery ="active"
    projectContractorMiddleware
      .getAllRecords({ filterQuery, projectQuery })
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        console.log("err===", err);
        res.json({ status: false, message: err.message });
      });
}

const updateProjectContractor = async(req, res, next) =>{
    let filterQuery = req.query;
  let updateObj = req.body;
  filterQuery = {
    _id: req.params.id,
  };
  projectContractorMiddleware
    .updateRecord({ filterQuery, updateObj })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log("err===", err);
      res.json({ status: false, message: err.message });
    });
}

const deleteProjectContractor = async(req, res, next) =>{
    let filterQuery = req.query;
  let updateObj = {
    status: "inactive",
  };
  filterQuery = {
    _id: req.params.id,
  };
  projectContractorMiddleware
    .updateRecord({ filterQuery, updateObj })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log("err===", err);
      res.json({ status: false, message: err.message });
    });
}




module.exports = {
    createProjectContractor,
    getProjectContractor,
    getAllProjectContractor,
    updateProjectContractor,
    deleteProjectContractor,
  };
  