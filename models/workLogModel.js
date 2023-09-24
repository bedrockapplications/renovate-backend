const mongoose = require("mongoose");

const worklogSchema = mongoose.Schema(
  {
      contractorId: { type: mongoose.Schema.Types.ObjectId },
      projectId: { type: mongoose.Schema.Types.ObjectId },
      projectManagerId: { type: mongoose.Schema.Types.ObjectId },
      subject: { type: String },
      description: { type: String },
      images: { type: String },
      logApproval: {type: Boolean},
    //   logApproval: {type: Boolean},
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