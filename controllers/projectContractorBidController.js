const projectBidMiddleware = require("../middlewares/projectContractorBidMiddleware");


const applyProjectBid = (req, res, next) =>{
    let {projectName,projectType,clientPhNumber,address,city,state,country,zipcode,startDate} =req.body;
    let userId = req.user._id;
    if(!projectName||!projectType||!clientPhNumber||!address||!city||!state||!country||!zipcode||!startDate||!userId) throw({message:"Required fields are missing"});
    projectBidMiddleware.createRecord({projectName,projectType,clientPhNumber,address,city,state,country,zipcode,startDate,userId}).then(data =>{
        res.json(data);
        // res.json({status:true, data});
    }).catch(err=>{
        console.log("err===",err);
        res.json({status:false, message:err.message});
    });
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



module.exports ={
    applyProjectBid,
    getProjectBid,
    getAllProjectBid,
    updateProjectBid,
}