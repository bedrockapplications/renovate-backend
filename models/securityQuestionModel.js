const mongoose = require("mongoose");

const questionSchema = mongoose.Schema(
  {
    question: { type: String },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("br_securityQuestion", questionSchema);
