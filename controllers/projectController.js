const projectMiddleware = require("../middlewares/projectMiddleware");

const createProject = (req, res, next) =>{
    let {projectName,projectType,clientPhNumber,address,city,state,country,zipcode,startDate,endDate,moveDate} =req.body;
    let userId = req.user._id;
    if(!projectName||!projectType||!clientPhNumber||!address||!city||!state||!country||!zipcode||!startDate||!endDate||!moveDate||!userId) throw({message:"Required fields are missing"});
    projectMiddleware.createRecord({projectName,projectType,clientPhNumber,address,city,state,country,zipcode,startDate,endDate,moveDate,userId}).then(data =>{
        res.json(data);
        // res.json({status:true, data});
    }).catch(err=>{
        console.log("err===",err);
        res.json({status:false, message:err.message});
    });
}

const getProject = async(req, res, next) =>{
  try {

    let filterQuery = req.query;
    let projectQuery = {}
    filterQuery ={
        _id:req.params.id
    }
    let dataaaa = await projectMiddleware.getSingleRecord({filterQuery, projectQuery});

    console.log("========dataaaa",dataaaa)
    projectMiddleware.getSingleRecord({filterQuery, projectQuery}).then(data =>{
        res.json(data);
        // res.json({status:true, data});
    }).catch(err=>{
        console.log("err===",err);
        res.json({status:false, message:err.message});
    }); 
} catch (err) {
    console.log("err===", err);
    res.json({ status: false, message: err.message });
  }
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

const publishProject = (req, res, next) =>{
    let filterQuery = req.query
    let updateObj = {
        status:active
    }
    filterQuery={
        _id:req.params.id
    }
    // TODO need to add the mailing logic to send mails to all contractors with service provided
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
    publishProject
}