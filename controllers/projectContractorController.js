const projectContractorMiddleware = require("../middlewares/projectContractorMiddleware");
const projectMiddleware = require("../middlewares/projectMiddleware");
const userMiddleware = require("../middlewares/userMiddleware");

const createProjectContractor = async(req, res, next) =>{
  try{
    let { projectId, contractorId } = req.body;
  if (!projectId || !contractorId) {
    // res.json({ status: false, message: "Required fields are missing" });
    throw({ message: "Required fields are missing" });
  }
  // Project validation
  projectDetails = await projectMiddleware.getSingleRecord({filterQuery:{_id:projectId}, projectQuery:{}})
  if (!projectDetails.status || !projectDetails.data) throw ({ message: "Couldnot find the Project" });
  if(projectDetails.data.status !=="active") throw ({ message: "Cannot add any contractor for Non active Project" });
  // Contractor validation
  contractorExist = await userMiddleware.getSingleRecord({ filterQuery: {_id:contractorId}, projectQuery:{}});
  if (!contractorExist.status || !contractorExist.data) throw ({ message: "Couldnot find the Contractor" });
  if(contractorExist.data.role !== "contractor") throw ({ message: "Couldnot Added this user as contractor" });
  projectContractorMiddleware
    .createRecord({ projectId, contractorId })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log("err===", err);
      res.json({ status: false, message: err.message });
    });
  }catch (err) {
    console.log("err===", err);
    res.json({ status: false, message: err.message });
  }
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

const getAllContractorProjects =async (req, res, next) =>{
  try{
    let {status}=req.query;
    let filterQuery = {};
    let projectQuery = {};
    let userId = req.user._id;
    filterQuery = {
      contractorId: userId,
    };
    if(status) filterQuery.status = status;

    projectContractorMiddleware
      .getAllRecordsPopulate({ filterQuery, projectQuery })
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        console.log("err===", err);
        res.json({ status: false, message: err.message });
      });
  }catch (err) {
    console.log("err===", err);
    res.json({ status: false, message: err.message });
  }
}



module.exports = {
    createProjectContractor,
    getProjectContractor,
    getAllProjectContractor,
    updateProjectContractor,
    deleteProjectContractor,
    getAllContractorProjects,
  };
  