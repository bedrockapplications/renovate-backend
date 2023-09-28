const mongoose = require("mongoose");

const intakeFormSchema = mongoose.Schema({
  projectId: { type: mongoose.Schema.Types.ObjectId },
  comments:{type: String},
  serviceNeeded:[{type: String}],
  documents:[{type: String}],
},
{
  timestamps: true,
}
);

module.exports = mongoose.model("br_intakeform", intakeFormSchema);