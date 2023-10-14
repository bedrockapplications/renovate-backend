const workLogMiddleware = require("../middlewares/workLogMiddleware");
const projectMiddleware = require("../middlewares/projectMiddleware");

const createWorkLog = (req, res, next) => {
  // need to add the validations

  // ===date
  // ===time
  // pow ===% of work completed
  //       ===project
  //       ===reporting person
  //       ===address
  //       ===country
  //       ===state
  //       ===city
  //       ===zipcode
  // weatherStatus ===weather status
  // groundCondition===ground conditions
  // weatherComment===weather comments
  // scheduleData===schedule (list of objects)
  // manpowerData===manpower (list of objects)
  // vistorsData===vistors (list of objects)
  // inventoryData===inventory (list of objects)
  // onsiteIssueData===onsite issues (list of objects)
  // images ===uploads
  // comment===comments
  // sign ===signature upload

  let {
    projectId,
    projectManagerId,
    date,
    time,
    comment,
    scheduleData,
    manpowerData,
    vistorsData,
    inventoryData,
    onsiteIssueData,
    weatherStatus,
    weatherComment,
    groundCondition,
    pow,
  } = req.body;
  let contractorId = req.user._id;
  if (!projectId || !projectManagerId)
    throw { message: "Required fields are missing" };
  let images, sign;
  sign = req.files.sign[0].location;
  images = req.files.images;
  images = images.map((value) => value.location);
  workLogMiddleware
    .createRecord({
      projectId,
      projectManagerId,
      contractorId,
      date,
      time,
      comment,
      scheduleData,
      manpowerData,
      vistorsData,
      inventoryData,
      onsiteIssueData,
      weatherStatus,
      weatherComment,
      groundCondition,
      images,
      sign,
      pow,
    })
    .then((data) => {
      res.json(data);
      // res.json({status:true, data});
    })
    .catch((err) => {
      console.log("err===", err);
      res.json({ status: false, message: err.message });
    });
};

const updateWorkLog = async (req, res, next) => {
  try {
    let filterQuery = req.query;
    let updateObj = req.body;
    filterQuery = {
      _id: req.params.id,
    };
    let projectQuery = {};

    const allowedInputs = ["subject", "description", "images"];
    const checkValidInputs = Object.keys(req.body);

    const isValid = checkValidInputs.every((item) =>
      allowedInputs.includes(item)
    );
    // fetch the workLog and check the logApproval
    let workLogData = await workLogMiddleware.getSingleRecord({
      filterQuery,
      projectQuery,
    });
    if (!isValid)
      return res.json({
        success: false,
        messages: "Invalid inputs are not allowed.",
      });
    if (workLogData.status && workLogData.data) {
      workLogData = workLogData.data;
      if (workLogData.logApproval !== "pending")
        res.json({ status: false, message: "Cannot Update the Working" });
      if (workLogData.contractorId !== req.user._id)
        res.json({ status: false, message: "Not Authorized to Update" });
      workLogMiddleware
        .updateRecord({ filterQuery, updateObj })
        .then((data) => {
          res.json(data);
          // res.json({status:true, data});
        })
        .catch((err) => {
          console.log("err===", err);
          res.json({ status: false, message: err.message });
        });
    }
  } catch (err) {
    console.log("err===", err);
    res.json({ status: false, message: err.message });
  }
};

const updateWorkLogApproval = async (req, res, next) => {
  try {
    let filterQuery = req.query;
    let { logApproval } = req.body;
    let updateObj = {};
    let projectQuery = {};
    filterQuery = {
      _id: req.params.id,
    };
    if (!logApproval)
      res.json({ status: false, message: "Required Field is Missing" });
    updateObj = {
      logApproval,
    };
    let projectManagerId = req.user._id;
    let workLogData = await workLogMiddleware.getSingleRecord({
      filterQuery,
      projectQuery,
    });
    if (workLogData.status && workLogData.data) {
      if (projectManagerId == workLogData.data._id) {
        workLogMiddleware
          .updateRecord({ filterQuery, updateObj })
          .then((data) => {
            res.json(data);
            // res.json({status:true, data});
          })
          .catch((err) => {
            console.log("err===", err);
            res.json({ status: false, message: err.message });
          });
      } else {
        res.json({ status: false, message: "UnAuthorized User" });
      }
    } else {
      res.json({ status: false, message: "Something went Wrong" });
    }
  } catch (err) {
    console.log("err===", err);
    res.json({ status: false, message: err.message });
  }
};

const getWorkLog = (req, res, next) => {
  let filterQuery = req.query;
  let projectQuery = {};
  filterQuery = {
    _id: req.params.id,
  };
  workLogMiddleware
    .getSingleRecord({ filterQuery, projectQuery })
    .then((data) => {
      res.json(data);
      // res.json({status:true, data});
    })
    .catch((err) => {
      console.log("err===", err);
      res.json({ status: false, message: err.message });
    });
};

//contractor id and project id
const getAllWorkLog = (req, res, next) => {
  let filterQuery = req.query;
  let projectQuery = {};
  workLogMiddleware
    .getAllRecords({ filterQuery, projectQuery })
    .then((data) => {
      res.json(data);
      // res.json({status:true, data});
    })
    .catch((err) => {
      console.log("err===", err);
      res.json({ status: false, message: err.message });
    });
};

const getAllContractorWorkLog = (req, res, next) => {
  let filterQuery = req.query;
  let projectQuery = {};
  filterQuery = {
    _id: req.params.id,
  };
  workLogMiddleware
    .getAllRecords({ filterQuery, projectQuery })
    .then((data) => {
      res.json(data);
      // res.json({status:true, data});
    })
    .catch((err) => {
      console.log("err===", err);
      res.json({ status: false, message: err.message });
    });
};

const deleteWorkLog = async (req, res, next) => {
  try {
    let filterQuery = req.query;
    let updateObj = {
      status: "inactive",
    };
    filterQuery = {
      _id: req.params.id,
    };
    let projectQuery = {};

    // fetch the workLog and check the logApproval
    let workLogData = await workLogMiddleware.getSingleRecord({
      filterQuery,
      projectQuery,
    });

    if (workLogData.status && workLogData.data) {
      workLogData = workLogData.data;
      if (workLogData.logApproval !== "pending")
        res.json({ status: false, message: "Cannot Delete the Working" });
      if (workLogData.contractorId !== req.user._id)
        res.json({ status: false, message: "Not Authorized to Delete" });

      workLogMiddleware
        .updateRecord({ filterQuery, updateObj })
        .then((data) => {
          res.json(data);
          // res.json({status:true, data});
        })
        .catch((err) => {
          console.log("err===", err);
          res.json({ status: false, message: err.message });
        });
    }
  } catch (err) {
    console.log("err===", err);
    res.json({ status: false, message: err.message });
  }
};

// project id group by contractor details
const getAllProjectWorkLog = async (req, res, next) => {
  try{
  // TODO
  console.log("need to work on this");
  let filterQuery = req.query;
  filterQuery = {
    _id: req.params.id,
  };
  let projectQuery = {};
  // get the project Detail and vaildate the user id
  let projectDetail = await projectMiddleware.getSingleRecord({
    filterQuery,
    projectQuery,
  });
  if (projectDetail.status && projectDetail.data) {
    if(projectDetail.data.userId !== req.user._id) res.json({ status: false, message: "Not Authorized to get the Data" });
    
    // call the aggregate function to fetch all the work log grouped by contractor
    
  }
      
} catch (err) {
  console.log("err===", err);
  res.json({ status: false, message: err.message });
}
};

module.exports = {
  // for contractor
  createWorkLog,
  updateWorkLog,
  getWorkLog,
  getAllWorkLog,
  updateWorkLogApproval,
  deleteWorkLog,
  getAllContractorWorkLog,
  // get all worklog for project_id
  // for mgr
  // get all worklog by project_id
  // get all worklog by projectmgr_id
  // get all worklog by contractorid
};
