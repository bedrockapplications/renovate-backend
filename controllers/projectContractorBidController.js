const projectBidMiddleware = require("../middlewares/projectContractorBidMiddleware");
const projectMiddleware = require("../middlewares/projectMiddleware");
const projectContractorMiddleware = require("../middlewares/projectContractorMiddleware");


const applyProjectBid = async (req, res, next) =>{
    try{
    let {projectId,servicesProvided,comment,amount,currency,startDate,endDate,documentLink} =req.body;
    // let {projectName,projectType,clientPhNumber,address,city,state,country,zipcode,startDate} =req.body;
    let userId = req.user._id;
    if(!projectId||!servicesProvided||!comment||!amount||!currency||!startDate||!endDate) throw({message:"Required fields are missing"});
    let projectDetail = await projectMiddleware.getSingleRecord({filterQuery:{_id:projectId }, projectQuery:{}});
    if(!projectDetail.status || !projectDetail.data) throw({message: "Couldn't find the project for the given id" });
    let fileDate = req.files;
    let filesLoc = fileDate.map(value => value.location);
    projectBidMiddleware.createRecord({projectId,contractorId:userId,servicesProvided,comment,amount,currency,startDate,endDate,documentLink:[...filesLoc]}).then(data =>{
        res.json(data);
        // res.json({status:true, data});
    }).catch(err=>{
        console.log("err===",err);
        res.json({status:false, message:err.message});
    });
}catch (err) {
    console.log("err===", err);
    res.json({ status: false, message: err.message });
  }
}

const getProjectBid = (req, res, next) =>{
    let filterQuery = req.query;
    let projectQuery = {}
    filterQuery ={
        _id:req.params.id
    }
    projectBidMiddleware.getSingleRecord({filterQuery, projectQuery}).then(data =>{
        res.json(data);
        // res.json({status:true, data});
    }).catch(err=>{
        console.log("err===",err);
        res.json({status:false, message:err.message});
    }); 
}
const getAllProjectBid = (req, res, next) =>{
    let filterQuery = req.query;
    let projectQuery = {}
    projectBidMiddleware.getAllRecords({filterQuery, projectQuery}).then(data =>{
        res.json(data);
        // res.json({status:true, data});
    }).catch(err=>{
        console.log("err===",err);
        res.json({status:false, message:err.message});
    }); 
}
// updating the status can be done here
const updateProjectBid = (req, res, next) =>{
    let filterQuery = req.query
    let updateObj = req.body
    filterQuery={
        _id:req.params.id
    }
    projectBidMiddleware.updateRecord({filterQuery, updateObj}).then(data =>{
        res.json(data);
        // res.json({status:true, data});
    }).catch(err=>{
        console.log("err===",err);
        res.json({status:false, message:err.message});
    });
}

const getAllAppliedContractor = async (req, res, next)=>{
    try{
        let {status}=req.query;
        let filterQuery = {};
        let projectQuery = {};
        let userId = req.user._id;
        filterQuery = {
          contractorId: userId,
        };
        if(status) filterQuery.status = status;
    
        projectBidMiddleware
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

const getAppliedContractor = async (req, res, next)=>{
    try{
        let {status,projectId}=req.query;
        let filterQuery = {};
        let projectQuery = {};
        let userId = req.user._id;
        filterQuery = {
          contractorId: userId,
          projectId:projectId
        };
        if(status) filterQuery.status = status;
    
        projectBidMiddleware
          .getSingleRecordPopulate({ filterQuery, projectQuery })
          .then((data) => {
            if(data.data){
                res.json({
                    status:data.status,
                    data:data.data,
                    message:"applied"
                });
            }else{
                res.json({
                    status:data.status,
                    data:{},
                    message:"not-applied"
                });
            }
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

const getAllApplicantContractor = async (req, res, next)=>{
    try{
        let {status, projectId}=req.query;
        let filterQuery = {};
        let projectQuery = {};
        let userId = req.user._id;
        filterQuery = {
            projectId: projectId,
        };
        if(status) filterQuery.status = status;
// add validation of projectid and project manager
        let projectDetail = await projectMiddleware.getSingleRecord({filterQuery:{_id:projectId, userId:userId }, projectQuery:{}});
        if(!projectDetail.status || !projectDetail.data) throw({message: "Couldn't find the project id for a given user" });

        projectBidMiddleware
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


// updating the status can be done here
const updateProjectBidStatus = async(req, res, next) =>{
    try{
        let filterQuery = req.query
        let {status} = req.body
        filterQuery={
            _id:req.params.id
        }
        let bidingDetail = await projectBidMiddleware.getSingleRecord({filterQuery, projectQuery:{}});
        if(!bidingDetail.status || !bidingDetail.data) throw({message: "Couldn't find the project bid details" });
        let userId = req.user._id;
        let projectDetail = await projectMiddleware.getSingleRecord({filterQuery:{_id:bidingDetail.data.projectId,userId:userId }, projectQuery:{}});
        if(!projectDetail.status || !projectDetail.data) throw({message: "Not permitted to Update the Project Bid" });

        if(status == 'selected'){
            // added the record to project contractor
            let projectContractor = await projectContractorMiddleware({projectId:bidingDetail.data.projectId,contractorId:bidingDetail.data.contractorId });
            console.log("added the contractor to a project")
        }
        projectBidMiddleware.updateRecord({filterQuery, updateObj}).then(data =>{
            res.json(data);
            // res.json({status:true, data});
        }).catch(err=>{
            console.log("err===",err);
            res.json({status:false, message:err.message});
        });
    }catch (err) {
        console.log("err===", err);
        res.json({ status: false, message: err.message });
      }
}


module.exports ={
    applyProjectBid,
    getProjectBid,
    getAllProjectBid,
    updateProjectBid,
    getAllAppliedContractor,
    getAllApplicantContractor,
    updateProjectBidStatus,
    getAppliedContractor,
}