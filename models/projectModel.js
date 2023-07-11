const mongoose = require("mongoose");

const projectSchema = mongoose.Schema(
  {
    projectName: { type: String },
    ClientPhNumber: { type: Number },
    Address: { type: String },
    City: { type: String },
    State: { type: String },
    Zipcode: { type: Number },
    StartDate: { type: String },
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
