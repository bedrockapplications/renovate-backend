const mongoose = require("mongoose");

const projectSchema = mongoose.Schema(
  {
    projectName: { type: String },
    projectType: { 
      type: String,
      enum: ["DesignAI", "RenovateAI", "EstimateAI"],
     },
    clientName: { type: String },
    clientPhNumber: { type: Number },
    address: { type: String },
    city: { type: String },
    state: { type: String },
    country: { type: String },
    zipcode: { type: Number },
    startDate: { type: Date },
    endDate: { type: Date },
    moveDate: { type: Date },
    userId: { type: mongoose.Schema.Types.ObjectId }, // ref: "br_user_profile"
    status: {
      type: String,
      enum: ["pending", "active", "paused", "completed", "cancelled"],
      default:"pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("br_project", projectSchema);
