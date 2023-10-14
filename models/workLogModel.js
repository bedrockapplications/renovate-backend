const mongoose = require("mongoose");

const scheduleDataObj = mongoose.Schema(
  {
    activity:{ type: String },
    contractor:{ type: String },
    comment:{ type: String },
  }
);

const manpowerDataObj = mongoose.Schema(
  {
    team:{ type: String },
    coount:{ type: String },
    hours:{ type: String },
    comment:{ type: String },
  }
);

const vistorsDataObj = mongoose.Schema(
  {
    entryType:{ type: String },
    name:{ type: String },
    comment:{ type: String },
  }
);

const inventoryDataObj = mongoose.Schema(
  {
    inventoryType:{ type: String },
    material:{ type: String },
    quantity:{ type: String },
    measure:{ type: String },
  }
);

const onsiteIssueDataObj = mongoose.Schema(
  {
    issueType:{ type: String },
    reason:{ type: String },
    comment:{ type: String },
  }
);

const worklogSchema = mongoose.Schema(
  {
      contractorId: { type: mongoose.Schema.Types.ObjectId },
      projectId: { type: mongoose.Schema.Types.ObjectId },
      projectManagerId: { type: mongoose.Schema.Types.ObjectId },
      // subject: { type: String },
      // description: { type: String },
      date: { type: String },
      time: { type: String },
      comment: { type: String },
      scheduleData:[scheduleDataObj],
      manpowerData:[manpowerDataObj],
      vistorsData:[vistorsDataObj],
      inventoryData:[inventoryDataObj],
      onsiteIssueData:[onsiteIssueDataObj],
      weatherStatus: { type: String },
      weatherComment: { type: String },
      groundCondition: { type: String },
      images: [{ type: String }],
      sign: { type: String },
      pow: {type: Number},
      // logApproval: {type: Boolean,},
      logApproval: {type: String,enum: ["review", "pending", "approved"], default:"pending" },
      status: { type: String, enum: ["active", "inactive"], default: "active" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("br_worklog", worklogSchema);



// Field required
// project id
// contrator id
// projectmanager id
// subject
// discription
// images
// log approve (from manager side)


// contractorId collected from token
// projectId 
// projectManagerId
// date
// time
// comment
// scheduleData arrayobj
// manpowerData arrayobj 
// vistorsData arrayobj
// inventoryData arrayobj
// onsiteIssueData arrayobj
// weatherStatus
// weatherComment
// groundCondition
// images 3 array 
// sign 1
// pow  percentage