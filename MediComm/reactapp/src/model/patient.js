const mongoose = require("mongoose");

//creating schema for users in database
const PatientSchema = mongoose.Schema({
    insurednumber: {
      type: String,
      required: true
    },
    healthinsurance: {
      type: String,
      required: true
    },
    mail: {
      type: String,
      required: true
    }
  });
  
  //export patient model with PatientSchema
  module.exports = mongoose.model("patient", PatientSchema);