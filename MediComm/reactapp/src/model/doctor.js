const mongoose = require("mongoose");

//creating schema for users in database
const DoctorSchema = mongoose.Schema({
    phone: {
      type: String,
      required: true
    },
    fax: {
      type: String,
      required: true
    },
    docnum: {
        type: String,
        required: false
    },
    establishmentnumber: {
        type: String,
        required: true
    },
    fieldofwork: {
        type: String,
        required: true
    },
    mail: {
      type: String,
      required: true
    },
  });
  
  //export user model with UserSchema
  module.exports = mongoose.model("doctor", DoctorSchema);