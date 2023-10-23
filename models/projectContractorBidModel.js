const mongoose = require("mongoose");

const projectContractorBidSchema = mongoose.Schema({
    projectId: { type: mongoose.Schema.Types.ObjectId},
    contractorId: { type: mongoose.Schema.Types.ObjectId},
    servicesProvided:[{type: String}],
    comment:{type: String},
    amount:{type: mongoose.Schema.Types.Decimal128},
    currency:{type: String},
    documentLink:[{type: String}],
    startDate: { type: Date },
    endDate: { type: Date },
    // status: { type: String, enum: ["active", "inactive"], default: "active" }, approved:-- final selection
    status: { type: String, enum: ["pending", "selected", "rejected","approved"], default: "pending" },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("br_project_contractor_bid", projectContractorBidSchema);
