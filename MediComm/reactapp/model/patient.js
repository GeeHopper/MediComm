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
    }
  });
  
  //export user model with UserSchema
  module.exports = mongoose.model("patient", PatientSchema);