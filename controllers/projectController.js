const projectMiddleware = require("../middlewares/projectMiddleware");
const userMiddleware = require("../middlewares/userMiddleware");
const intakeFormMiddleware = require("../middlewares/intakeFormMiddleware");
const { sendEmail } = require("../services/emailService");

const createProject = (req, res, next) =>{
    // doc_link category need Done
    // Need to add the file uload logic
    let {projectName,clientName,projectType,clientPhNumber,address,city,state,country,zipcode,startDate,endDate,moveDate, documents, serviceNeeded} =req.body;
    let userId = req.user._id;
    let fileDate = req.files;
    // filePath = fileDate.location;
    let filesLoc = fileDate.map(value => value.location);
    if(!projectName || !clientName ||!projectType||!clientPhNumber||!address||!city||!state||!country||!zipcode||!startDate||!endDate||!moveDate||!serviceNeeded ||!userId) throw({message:"Required fields are missing"});
    if(!documents)
    documents = [...filesLoc];
    projectMiddleware.createRecord({projectName,clientName,projectType,clientPhNumber,address,city,state,country,zipcode,startDate,endDate,moveDate,userId, documents, serviceNeeded}).then(data =>{
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
    // let dataaaa = await projectMiddleware.getSingleRecord({filterQuery, projectQuery});

    // console.log("========dataaaa",dataaaa)
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

const getMyProject = async(req, res, next) =>{ 
    try{
    let filterQuery = {};
    let projectQuery = {};
    let userId = req.user._id;
    filterQuery = {
        userId
    };
    let {status} = req.query;
    if(status) filterQuery.status = status;
    projectMiddleware.getAllRecords({filterQuery, projectQuery}).then(data =>{
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

const publishProject = async (req, res, next) => {
    try {
        let filterQuery = req.query;
        let updateObj = {
            status: "active",
        };
        filterQuery = {
            _id: req.params.id,
        };
        let servicesArray = [] //need to fetch from the project intakeform
        let intakefilterQuery = { projectId: req.params.id }
        let intakeProjectQuery = { serviceNeeded: 1 }
        let allIntakeForms = await intakeFormMiddleware.getAllRecords({
            filterQuery:intakefilterQuery,
            projectQuery:intakeProjectQuery,
        })
        if (allIntakeForms.status && allIntakeForms.data.length == 0) throw ({ message: "Cannot Publish a project without a Intakeform" });
        servicesArray = allIntakeForms.data[0].serviceNeeded;

        let userfilterQuery = { servicesProvided: { $in: servicesArray } };
        let userProjectQuery = { email: 1 };
        let serviceProviderEmails = []
        serviceProviderEmails = await userMiddleware.getAllRecords({
            filterQuery: userfilterQuery,
            projectQuery:userProjectQuery,
        });
        console.log("getAllRecords", serviceProviderEmails)
        let providerEmails = serviceProviderEmails.data.map(value => value.email);
        console.log("providerEmails=====", providerEmails);


        // TODO need to add the mailing logic to send mails to all contractors with service provided
        sendEmail("publish_project", { email: providerEmails });
        // mailing logic
        projectMiddleware
            .updateRecord({ filterQuery, updateObj })
            .then((data) => {
                res.json(data);
                // res.json({status:true, data});
            })
            .catch((err) => {
                console.log("err===", err);
                res.json({ status: false, message: err.message });
            });
    } catch (err) {
        console.log("err===", err);
        res.json({ status: false, message: err.message });
    }
};

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
    publishProject,
    getMyProject,
}