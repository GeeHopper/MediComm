const express = require("express");
const { check, validationResult} = require("express-validator/check");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();

const User = require("../model/User");
const Patient = require("../model/Patient");
const Doctor = require("../model/Doctor");

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
            phone,
            fax,
            establishmentnumber,
            fieldofwork
        } = req.body;
        try {
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
                profilepic
            });

            doctor = new Doctor({
                phone,
                fax,
                establishmentnumber,
                fieldofwork
            });


            const salt = await bcrypt.genSalt(10);
            user.password  = await bcrypt.hash(password, salt);

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
                patobj,
                profilepic
            });

            patient = new Patient({
                insurednumber,
                healthinsurance
            });

            //hashing password
            const salt = await bcrypt.genSalt(10);
            user.password  = await bcrypt.hash(password, salt);

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
  
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
          return res.status(400).json({
            message: "Incorrect Password !"
          });
  
        const payload = {
          user: {
            id: user.id
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
  
  

module.exports = router;