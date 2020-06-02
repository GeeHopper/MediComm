const mongoose = require("mongoose");

//creating schema for users in database
const TherapySchema = mongoose.Schema({
    doc_userid: {
      type: String,
      required: true
    },
    pat_userid: {
      type: String,
      required: true
    }
  });
  
  //export user model with UserSchema
  module.exports = mongoose.model("therapy", TherapySchema);