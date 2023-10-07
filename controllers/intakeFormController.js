const intakeFormMiddleware = require("../middlewares/intakeFormMiddleware");

const createIntakeform = (req, res, next) =>{
    let {projectId,comments,serviceNeeded,documents} =req.body;
    if(!projectId||!comments||!documents||!serviceNeeded) throw({message:"Required fields are missing"});
    intakeFormMiddleware.createRecord({projectId,comments,serviceNeeded,documents}).then(data =>{
        res.json(data);
    }).catch(err=>{
        console.log("err===",err);
        res.json({status:false, message:err.message});
    });
}

const getIntakeform = (req, res, next) =>{
    let filterQuery = req.query;
    let projectQuery = {}
    filterQuery ={
        _id:req.params.id
    }
    intakeFormMiddleware.getSingleRecord({filterQuery, projectQuery}).then(data =>{
        res.json(data);
        // res.json({status:true, data});
    }).catch(err=>{
        console.log("err===",err);
        res.json({status:false, message:err.message});
    }); 
}

const getAllIntakeform = (req, res, next) =>{
    let filterQuery = req.query;
    let projectQuery = {}
    intakeFormMiddleware.getAllRecords({filterQuery, projectQuery}).then(data =>{
        res.json(data);
        // res.json({status:true, data});
    }).catch(err=>{
        console.log("err===",err);
        res.json({status:false, message:err.message});
    }); 
}

const updateIntakeform = (req, res, next) =>{
    let filterQuery = req.query
    let updateObj = req.body
    filterQuery={
        _id:req.params.id
    }
    intakeFormMiddleware.updateRecord({filterQuery, updateObj}).then(data =>{
        res.json(data);
        // res.json({status:true, data});
    }).catch(err=>{
        console.log("err===",err);
        res.json({status:false, message:err.message});
    });
}

const deleteIntakeform = (req, res, next) =>{
    let filterQuery = req.query
    let updateObj = {
        status:"cancelled"
    }
    filterQuery={
        _id:req.params.id
    }
    intakeFormMiddleware.updateRecord({filterQuery, updateObj}).then(data =>{
        res.json(data);
        // res.json({status:true, data});
    }).catch(err=>{
        console.log("err===",err);
        res.json({status:false, message:err.message});
    });
}

module.exports = {
    createIntakeform,
    getIntakeform,
    getAllIntakeform,
    updateIntakeform,
    deleteIntakeform,
}