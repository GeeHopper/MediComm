const express = require("express");
const { check, validationResult} = require("express-validator/check");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();

const User = require("../model/User");
const Patient = require("../model/Patient");
const Doctor = require("../model/Doctor");

const auth = require("../middleware/auth");
var ObjectID = require('mongodb').ObjectID;
var fs = require("fs");

/**
 * @method - POST
 * @param - /signup
 * @description - User SignUp
 */


router.post(
    "/doc-reg-sent",
    [
        check("firstname", "Please Enter a Valid firstname")
        .not()
        .isEmpty(),
        check("lastname", "Please Enter a Valid lastname")
        .not()
        .isEmpty(),
        check("mail", "Please enter a valid email").isEmail(),
        check("password", "Please enter a valid password").isLength({
            min: 6
        }),
        check("address", "Please Enter a Valid address")
        .not()
        .isEmpty(),
        check("agreement", "Please Enter a Valid address")
        .not()
        .isEmpty(),
        check("phone", "Please Enter a Valid phone number")
        .not()
        .isEmpty(),
        check("fax", "Please Enter a Valid fax number")
        .not()
        .isEmpty(),
        check("establishmentnumber", "Please Enter a valid addrestablishmentnumber")
        .not()
        .isEmpty(),
        check("fieldofwork", "Please Enter a Valid field of work")
        .not()
        .isEmpty(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }
        const {
            mail,
            password,
            firstname,
            lastname,
            address,
            agreement,
            profilepic,
            docid,
            patid,
            phone,
            fax,
            establishmentnumber,
            fieldofwork
        } = req.body;
        try {
            isDoc = true;
            let user = await User.findOne({
                mail
            });
            let doctor = await Doctor.findOne({
                establishmentnumber
            });

            if (user || doctor) {
                return res.status(400).json({
                    msg: "User Already Exists"
                });
            }

            user = new User({
                mail,
                password,
                firstname,
                lastname,
                address,
                agreement,
                profilepic,
                docid,
                patid,
                isDoc: "1"
            });

            doctor = new Doctor({
                phone,
                fax,
                establishmentnumber,
                fieldofwork,
                isDoc
            });

            const salt = await bcrypt.genSalt(10);
            user.password  = await bcrypt.hash(password, salt);

            /*try{
              console.log("doc id:" + doctor.id)
            }catch{
              print("errorrr");
            }*/
            
            //setting the docid of the user object to the Obj id of the doctor :)
            user.docid = doctor.id;
            await user.save();
            await doctor.save();

            const payload = {
                user: {
                    id: user.id
                },
                doctor: {
                    id: doctor.id
                }
            };

            jwt.sign(
                payload,
                "randomString", {
                    expiresIn: 10000
                },
                (err, token) => {
                    if (err) throw err;
                    res.status(200).json({
                        token
                    });
                }
            );
        } catch (err) {
            console.log(err.message);
            res.status(500).send("Error in Saving");
        }
    }
);

router.post(
    "/pat-reg-sent",
    [
        check("firstname", "Please Enter a Valid firstname")
        .not()
        .isEmpty(),
        check("lastname", "Please Enter a Valid lastname")
        .not()
        .isEmpty(),
        check("mail", "Please enter a valid email").isEmail(),
        check("password", "Please enter a valid password").isLength({
            min: 6
        }),
        check("address", "Please Enter a Valid address")
        .not()
        .isEmpty(),
        check("agreement", "Please accept the agreement")
        .not()
        .isEmpty(),
        check("insurednumber", "Please Enter a Valid insurednumber")
        .not()
        .isEmpty(),
        check("healthinsurance", "Please Enter a Valid healthinsurance")
        .not()
        .isEmpty()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }
        const {
            mail,
            password,
            firstname,
            lastname,
            address,
            agreement,
            profilepic,
            insurednumber,
            healthinsurance
        } = req.body;
        try {
            let user = await User.findOne({
                mail
            });
            let patient = await Patient.findOne({
                insurednumber
            });
            if (user || patient) {
                return res.status(400).json({
                    msg: "User Already Exists"
                });
            }

            user = new User({
                mail,
                password,
                firstname,
                lastname,
                address,
                agreement,
                profilepic,
                isDoc: "0"
            });

            patient = new Patient({
                insurednumber,
                healthinsurance,
                mail
            });

            

            //hashing password
            const salt = await bcrypt.genSalt(10);
            user.password  = await bcrypt.hash(password, salt);
            
            console.log("mail: " + req.body.mail);
            //setting the patid of the user object to the Obj id of the Patient :)
            user.patid = patient.id;

            await user.save();
            await patient.save();

            const payload = {
                user: {
                    id: user.id,
                },
                patient: {
                    id: patient.id
                }
            };

            jwt.sign(
                payload,
                "randomString", {
                    expiresIn: 10000
                },
                (err, token) => {
                    if (err) throw err;
                    res.status(200).json({
                        token
                    });
                }
            );
        } catch (err) {
            console.log(err.message);
            console.log(err.stack)
            res.status(500).send("Error in Saving");
        }
    }
);

router.post(
    "/login-sent",
    [
      check("mail", "Please enter a valid email").isEmail(),
      check("password", "Please enter a valid password").isLength({
        min: 6
      })
    ],
    async (req, res) => {
      res.header('Access-Control-Allow-Origin', req.header('origin') );
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array()
        });
      }
  
      const { mail, password } = req.body;
      try {
        let user = await User.findOne({
          mail
        });
        if (!user)
          return res.status(400).json({
            message: "User Not Exist"
          });

        const userid = user.id;
        console.log("user id: " + userid);
        let patient = await Patient.findOne({
            mail
        });
        if (!patient)
          return res.status(400).json({
            message: "Patient Not Exist"
          });
          
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
          return res.status(400).json({
            message: "Incorrect Password !"
          });
  
        const payload = {
          user: {
            id: user.id
          },
          patient: {
            id: patient.id
          }
        };
  
        jwt.sign(
          payload,
          "randomString",
          {
            expiresIn: 3600
          },
          (err, token) => {
            if (err) throw err;
            //setting cookie to identify user on secured content
            res.cookie('token', token, { httpOnly: false })
            res.status(200).json({
              token
            });
          }
        );
      } catch (e) {
        console.error(e);
        res.status(500).json({
          message: "Server Error"
        });
      }
    }
  );

  router.get("/me", auth, async (req, res) => {
    try {
      // request.user is getting fetched from Middleware after token authentication
      const user = await User.findById(req.user.id);
      const patient = await Patient.findById(req.patient.id);
      res.json({
          patient: patient, 
          user: user
        });
      //res.send(JSON.stringify(user));
    } catch (e) {
        console.log(e.stack);
      res.send({ message: "Error in Fetching user: " + e.stack });
    }
  });
  
  router.post(
    "/edit-sent-user",
    [
        check("firstname", "Please Enter a Valid firstname")
        .not()
        .isEmpty(),
        check("lastname", "Please Enter a Valid lastname")
        .not()
        .isEmpty(),
        check("mail", "Please enter a valid email").isEmail(),
        check("password", "Please enter a valid password").isLength({
            min: 6
        }),
        check("address", "Please Enter a Valid address")
        .not()
        .isEmpty()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }
        const {
            mail,
            password,
            firstname,
            lastname,
            address,
            agreement,
            profilepic,
            userid,
        } = req.body;
        try {
            let user = await User.findOne({
              "_id" : ObjectID(userid)
            });
            if (!user) {
                return res.status(400).json({
                    msg: "no user found with the requested id"
                });
            }
            /*var file = __dirname + "/" + req.file.originalname;
            fs.rename(req.file.path,
              req.file.destination+req.fiel.originalname);*/

            //hashing password
            const salt = await bcrypt.genSalt(10);
            user.password  = await bcrypt.hash(password, salt);
            
            //setting the patid of the user object to the Obj id of the Patient :)
            user.mail = req.body.mail;
            user.firstname = req.body.firstname;
            user.lastname = req.body.lastname;
            user.address = req.body.address;
            user.profilepic = req.body.profilepic

            await user.save()
            //await patient.save();

        } catch (err) {
            console.log(err.message);
            console.log(err.stack)
            res.status(500).send("Error in Saving");
        }
    }
);

router.post(
  "/edit-sent-patient",
  [
      check("insurednumber", "Please Enter a Valid insurednumber")
      .not()
      .isEmpty(),
      check("healthinsurance", "Please Enter a Valid healthinsurance")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
          return res.status(400).json({
              errors: errors.array()
          });
      }
      const {
          insurednumber,
          healthinsurance,
          patid
      } = req.body;
      try {
          let patient = await Patient.findOne({
              "_id" : ObjectID(patid)
          });
          if(!patient)
          {
            console.log("no patient found with the requested id");
          }

          patient.healthinsurance = req.body.healthinsurance;
          patient.insurednumber = req.body.insurednumber
          patient.save();
      } catch (err) {
          console.log(err.message);
          console.log(err.stack)
          res.status(500).send("Error in Saving");
      }
  }
);

module.exports = router;