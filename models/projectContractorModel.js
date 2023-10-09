const mongoose = require("mongoose");

const projectContractorSchema = mongoose.Schema({
    projectId: { type: mongoose.Schema.Types.ObjectId},
    contractorId: { type: mongoose.Schema.Types.ObjectId},
    status: { type: String, enum: ["active", "completed", "inactive"], default: "active" },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("br_project_contractor", projectContractorSchema);
