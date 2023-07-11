const projectMiddleware = require("../middlewares/projectMiddleware");

const createProject = (req, res, next) =>{
    let {projectName,ClientPhNumber,Address,City,State,Zipcode,StartDate,userId} =req.body;
    if(!projectName||!ClientPhNumber||!Address||!City||!State||!Zipcode||!StartDate||!userId) throw({message:"Required fields are missing"});
    projectMiddleware.createRecord({projectName,ClientPhNumber,Address,City,State,Zipcode,StartDate,userId}).then(data =>{
        res.json(data);
        // res.json({status:true, data});
    }).catch(err=>{
        console.log("err===",err);
        res.json({status:false, message:err.message});
    });
}

const getProject = (req, res, next) =>{
    let filterQuery = req.query;
    let projectQuery = {}
    filterQuery ={
        _id:req.params.id
    }
    projectMiddleware.getSingleRecord({filterQuery, projectQuery}).then(data =>{
        res.json(data);
        // res.json({status:true, data});
    }).catch(err=>{
        console.log("err===",err);
        res.json({status:false, message:err.message});
    }); 
}
const getAllProject = (req, res, next) =>{
    let filterQuery = req.query;
    let projectQuery = {}
    projectMiddleware.getAllRecords({filterQuery, projectQuery}).then(data =>{
        res.json(data);
        // res.json({status:true, data});
    }).catch(err=>{
        console.log("err===",err);
        res.json({status:false, message:err.message});
    }); 
}
const updateProject = (req, res, next) =>{
    let filterQuery = req.query
    let updateObj = req.body
    filterQuery={
        _id:req.params.id
    }
    projectMiddleware.updateRecord({filterQuery, updateObj}).then(data =>{
        res.json(data);
        // res.json({status:true, data});
    }).catch(err=>{
        console.log("err===",err);
        res.json({status:false, message:err.message});
    });
}
const deleteProject = (req, res, next) =>{
    let filterQuery = req.query
    let updateObj = {
        status:"cancelled"
    }
    filterQuery={
        _id:req.params.id
    }
    projectMiddleware.updateRecord({filterQuery, updateObj}).then(data =>{
        res.json(data);
        // res.json({status:true, data});
    }).catch(err=>{
        console.log("err===",err);
        res.json({status:false, message:err.message});
    });
}
module.exports ={
    createProject,
    getProject,
    getAllProject,
    updateProject,
    deleteProject,
}