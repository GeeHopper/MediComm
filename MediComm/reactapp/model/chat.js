const mongoose = require("mongoose");

//creating schema for Patientfile in database
const ChatSchema = mongoose.Schema({
    sender: {
      type: String,
      required: true
    },
    receiver: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
  });
  
  //export Patientfile model with Patientfileschema
  module.exports = mongoose.model("chat", ChatSchema);