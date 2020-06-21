const mongoose = require("mongoose");

//creating schema for Patientfile in database
const PatientfileSchema = mongoose.Schema({
    pat_userid: {
      type: String,
      required: true
    },
    filename: {
        type: String,
        required: true
    },
    original_filename: {
        type: String,
        required: true
    },
    filetype: {
        type: String,
        required: true
    },
    notes: {
        type: String,
        required: true
    },
    shareWith: {
        type: String,
        required: true
    }

  });
  
  //export Patientfile model with Patientfileschema
  module.exports = mongoose.model("patientfile", PatientfileSchema);