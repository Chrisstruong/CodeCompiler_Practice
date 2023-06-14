
const mongoose = require("mongoose");

///////////////////////////////
// MODELS
////////////////////////////////
const JobSchema = new mongoose.Schema({
  language: {
    type: String,
    required: true,
    enum: ["cpp", "py", "js"]
  },
  filepath: {
    type: String,
    required: true,
  },
  submittedAt: {
    type: Date,
    default: Date.now
  },
  startedAt: {
    type: Date,
  }, 
  completedAt: {
    type: Date,
  },
  output: {
    type: String,
  },
  status: {
    type: String,
    default: "pending",
    enum: ["pending", "success", "error"]
  }
},{timestamps: true});

const Job = mongoose.model("job", JobSchema);

module.exports = Job
