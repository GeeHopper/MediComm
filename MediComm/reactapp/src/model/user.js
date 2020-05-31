const mongoose = require("mongoose");


//creating schema for users in database
const UserSchema = mongoose.Schema({
    mail: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    agreement: {
        type: String,
        require: true
    },
    isDoc: {
        type: String,
        required: true
    },
    profilepic: {
        type: String,
        required: false
    },
    docid: {
        type: String,
        required: false
    },
    patid: {
        type: String,
        required: false
    },
    createdAt: {
      type: Date,
      default: Date.now()
    }
  });
  
  //export user model with UserSchema
  module.exports = mongoose.model("user", UserSchema);