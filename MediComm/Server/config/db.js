//FILENAME : db.js

const mongoose = require("mongoose");

//mlab mongouri
const MONGOURI = "mongodb+srv://MediComm:mcLx8se6d@medicomm-w3ph6.mongodb.net/test?retryWrites=true&w=majority";

const InitiateMongoServer = async () => {
  try {
    await mongoose.connect(MONGOURI, {
      useNewUrlParser: true
    });
    console.log("Connected to DB !!");
  } catch (e) {
    console.log(e);
    throw e;
  }
};

module.exports = InitiateMongoServer;