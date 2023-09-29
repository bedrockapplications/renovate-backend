const workLogMiddleware = require("../middlewares/workLogMiddleware");

const createWorkLog = (req, res, next) =>{
    // need to add the validations
    let {projectId,projectManagerId,subject,description,images}= req.body
    let contractorId = req.user._id;
    if (!projectId||!projectManagerId||!subject||!description||!images) throw({message: "Required fields are missing" });
    workLogMiddleware.createRecord({projectId,projectManagerId,subject,description,images,contractorId}).then(data =>{
        res.json(data);
        // res.json({status:true, data});
    }).catch(err=>{
        console.log("err===",err);
        res.json({status:false, message:err.message});
    });
}

const updateWorkLog = (req, res, next) =>{
    let filterQuery = req.query
    let updateObj = req.body
    filterQuery={
        _id:req.params.id
    }
    workLogMiddleware.updateRecord({filterQuery, updateObj}).then(data =>{
        res.json(data);
        // res.json({status:true, data});
    }).catch(err=>{
        console.log("err===",err);
        res.json({status:false, message:err.message});
    });
}

const updateWorkLogApproval = async (req, res, next) => {
  try {
    let filterQuery = req.query;
    let { logApproval } = req.body;
    let updateObj = {};
    filterQuery = {
      _id: req.params.id,
    };
    if(!logApproval) 
        res.json({ status: false, message: "Required Field is Missing" });
    updateObj = {
        logApproval
    };
    let projectManagerId = req.user._id;
    let workLogData = await workLogMiddleware.getSingleRecord({
      filterQuery,
      projectQuery,
    });
    if(workLogData.status && workLogData.data){
        if(projectManagerId == workLogData.data._id){
        workLogMiddleware
          .updateRecord({ filterQuery, updateObj })
          .then((data) => {
            res.json(data);
            // res.json({status:true, data});
          })
          .catch((err) => {
            console.log("err===", err);
            res.json({ status: false, message: err.message });
          })
        }else{
            res.json({ status: false, message: "UnAuthorized User" });
        }
    }else{
        res.json({ status: false, message: "Something went Wrong" });
    }
  } catch (err) {
    console.log("err===", err);
    res.json({ status: false, message: err.message });
  }
};

const getWorkLog = (req, res, next) =>{
    let filterQuery = req.query;
    let projectQuery = {}
    filterQuery ={
        _id:req.params.id
    }
    workLogMiddleware.getSingleRecord({filterQuery, projectQuery}).then(data =>{
        res.json(data);
        // res.json({status:true, data});
    }).catch(err=>{
        console.log("err===",err);
        res.json({status:false, message:err.message});
    }); 
}
//contractor id and project id
const getAllWorkLog = (req, res, next) =>{
    let filterQuery = req.query;
    let projectQuery = {}
    workLogMiddleware.getAllRecords({filterQuery, projectQuery}).then(data =>{
        res.json(data);
        // res.json({status:true, data});
    }).catch(err=>{
        console.log("err===",err);
        res.json({status:false, message:err.message});
    }); 
}

// project id group by contractor details
const getAllProjectWorkLog = (req, res, next) =>{
// TODO
console.log("need to work on this")
}

module.exports ={
    // for contractor
    createWorkLog,
    updateWorkLog,
    getWorkLog,
    getAllWorkLog,
    updateWorkLogApproval
    // get all worklog for project_id
    // for mgr
    // get all worklog by project_id
    // get all worklog by projectmgr_id
    // get all worklog by contractorid
}