const mongoose = require("mongoose");

const documentSchema = mongoose.Schema(
  {
    fileName: String,
    contentType: String,
    fileType: String,
    userId: { type: mongoose.Schema.Types.ObjectId,  }, // ref: "br_user_profile"  //TODO try to remove ref collection name for better use
    projectId: { type: mongoose.Schema.Types.ObjectId,  }, // ref: "br_project_contractor"
    categoryType: String,
    filePath: String,
    status: { type: String, enum: ["active", "inactive"], default: "active" },

  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("br_document", documentSchema);
