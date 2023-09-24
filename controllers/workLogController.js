const workLogMiddleware = require("../middlewares/workLogMiddleware");

const createWorkLog = (req, res, next) =>{
    // need to add the validations
    workLogMiddleware.createRecord({}).then(data =>{
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

const approveWorkLog = (req, res, next) =>{
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
    // get all worklog for project_id
    // for mgr
    // get all worklog by project_id
    // get all worklog by projectmgr_id
    // get all worklog by contractorid
}