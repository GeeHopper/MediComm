const express = require("express");
const { check, validationResult } = require("express-validator/check");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();

const User = require("../model/User");
const Patient = require("../model/Patient");
const Doctor = require("../model/Doctor");
const Therapy = require("../model/therapy");
const Patientfile = require("../model/patientfile");
const Chat = require("../model/chat");

const auth = require("../src/middleware/auth");
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
        check("agreement", "Please accept the License Agreement")
            .not()
            .isEmpty(),
        check("phone", "Please Enter a Valid phone number")
            .not()
            .isEmpty(),
        check("fax", "Please Enter a Valid fax number")
            .not()
            .isEmpty(),
        check("docnum", "Please Enter a Doctor number")
            .not()
            .isEmpty(),
        check("establishmentnumber", "Please Enter a valid establishmentnumber")
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
            docnum,
            establishmentnumber,
            fieldofwork
        } = req.body;
        try {
            isDoc = true;
            let user = await User.findOne({
                mail
            });
            let doctor = await Doctor.findOne({
                docnum
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
                mail,
                phone,
                fax,
                establishmentnumber,
                docnum,
                fieldofwork
            });

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);

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
            user.password = await bcrypt.hash(password, salt);

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
        res.header('Access-Control-Allow-Origin', req.header('origin'));
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

            var payload;

            if (user.isDoc === "0") {
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

                payload = {
                    user: {
                        id: user.id
                    },
                    patient: {
                        id: patient.id
                    }
                };
            }
            else {
                let doctor = await Doctor.findOne({
                    mail
                });
                if (!doctor)
                    return res.status(400).json({
                        message: "Doctor Not Exist"
                    });

                const isMatch = await bcrypt.compare(password, user.password);
                if (!isMatch)
                    return res.status(400).json({
                        message: "Incorrect Password !"
                    });

                payload = {
                    user: {
                        id: user.id
                    },
                    doctor: {
                        id: doctor.id
                    }
                };
            }





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

        var patient;
        var doctor;
        if (user.isDoc === "0") {
            patient = await Patient.findById(user.patid);
            res.json({
                patient: patient,
                user: user
            });
        }
        else {
            doctor = await Doctor.findById(user.docid);
            res.json({
                doctor: doctor,
                user: user
            });
        }
        //res.send(JSON.stringify(user));
    } catch (e) {
        console.log(e.stack);
        res.send({ message: "Error in Fetching user: " + e.stack });
    }
});

router.post("/addPatient", auth, async (req, res) => {

    // request.user is getting fetched from Middleware after token authentication
    const doctor = await User.findById(req.user.id);
    if (doctor.isDoc === "1") {
        doc_userid = req.body.doc_userid;
        pat_userid = req.body.pat_userid;
        patNotes = '';
        docNotes = '';

        console.log("You're a doc");
        console.log("your id is: " + req.body.doc_userid);
        console.log("your patients id is: " + req.body.pat_userid);



        try {
            let therapy = await Therapy.findOne({ doc_userid: doc_userid, pat_userid: pat_userid })
                .exec(function (err, user) {
                    console.log("Already in therapy");
                    return res.status(400).json({
                        msg: "Therapy Already Exists"
                    });
                });
            console.log("pat notes are: " + patNotes);
            therapy = new Therapy({
                doc_userid,
                pat_userid,
                patNotes,
                docNotes
            });

            await therapy.save();


        } catch (err) {
            console.log(err.message);
            console.log(err.stack)
            res.status(500).send("Error in Saving");
        }
    }
    else {
        console.log("you're not a doctor, returning...");
        return;
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
            firstname,
            lastname,
            address,
            agreement,
            profilepic,
            userid,
        } = req.body;
        try {
            let user = await User.findOne({
                "_id": ObjectID(userid)
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
                "_id": ObjectID(patid)
            });
            if (!patient) {
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

router.post(
    "/edit-sent-doctor",
    [
        check("fieldofwork", "Please Enter a Valid fieldofwork")
            .not()
            .isEmpty(),
        check("establishmentnumber", "Please Enter a Valid establishmentnumber")
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
            phone,
            fax,
            docnum,
            establishmentnumber,
            fieldofwork,
            mail,
            docid
        } = req.body;
        try {
            let doctor = await Doctor.findOne({
                "_id": ObjectID(docid)
            });
            if (!doctor) {
                console.log("no patient found with the requested id");
            }

            doctor.phone = req.body.phone;
            doctor.fax = req.body.fax;
            doctor.docnum = req.body.docnum;
            doctor.establishmentnumber = req.body.establishmentnumber;
            doctor.fieldofwork = req.body.fieldofwork;
            doctor.mail = req.body.mail;
            doctor.save();
        } catch (err) {
            console.log(err.message);
            console.log(err.stack)
            res.status(500).send("Error in Saving");
        }
    }
);






router.post(
    "/edit-sent-patientfile",
    [
        check("filename", "oppps wata filename")
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
            shareWithString,
            notes,
            filename
        } = req.body;

        try {
            console.log("shareWithString is: " + req.body.shareWithString)
            let patientfile = await Patientfile.findOne({
                "filename": filename
            });
            if (!patientfile) {
                console.log("no patientfile found with the requested filename");
            }

            patientfile.shareWith = req.body.shareWithString;
            patientfile.notes = req.body.notes;
            patientfile.save();
        } catch (err) {
            console.log(err.message);
            console.log(err.stack)
            res.status(500).send("Error in Saving");
        }
    }
);

router.post(
    "/edit-sent-patnotes",
    [
        
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        const {
            patid,
            doctorid,
            patNotes
        } = req.body;

        try {
            console.log("patid is: " + req.body.patid);
            console.log("docid is: " + req.body.doctorid);
            const therapy = await Therapy.findOne({ doc_userid: req.body.doctorid, pat_userid: req.body.patid });
        
            console.log("docid is: " + therapy.pat_userid + " added");
            therapy.patNotes = req.body.patNotes;
         
            therapy.save();
        
        } catch (err) {
            console.log(err.message);
            console.log(err.stack)
            res.status(500).send("Error in Saving");
        }
    }
);

router.post(
    "/edit-sent-docnotes",
    [
        
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        const {
            patientid,
            docid,
            docNotes
        } = req.body;

        try {
            console.log("patid is: " + req.body.patientid);
            console.log("docid is: " + req.body.docid);
            const therapy = await Therapy.findOne({ doc_userid: req.body.docid, pat_userid: req.body.patientid });
        
            console.log("patid is: " + therapy.pat_userid + " added");
            console.log("notes " + req.body.docNotes);
            therapy.docNotes = req.body.docNotes;
         
            therapy.save();
        
        } catch (err) {
            console.log(err.message);
            console.log(err.stack)
            res.status(500).send("Error in Saving");
        }
    }
);

router.post("/checkUserUrl", auth, async (req, res) => {
    try {
        // request.user is getting fetched from Middleware after token authentication
        console.log("User id is: " + req.body.data.userid);
        const user = await User.findById(req.body.data.userid);
        const patient = await Patient.findById(user.patid);
        const doctor = await Doctor.findById(user.docid);
        if (user.patid) {
            res.json({
                user: user,
                patient: patient
            });
        }
        else {
            res.json({
                user: user,
                doctor: doctor
            });
        }

        //res.send(JSON.stringify(user));
    } catch (e) {
        console.log(e.stack);
        res.send({ message: "Error in Fetching patient: " + e.stack });
    }
});

router.post("/overviewMyDocs", auth, async (req, res) => {
    try {
        // request.user is getting fetched from Middleware after token authentication
        console.log("in my docs search");
        console.log("pat id is: " + req.body.data.pat_userid);
        const therapies = await Therapy.find({ pat_userid: req.body.data.pat_userid });
        var doctors = [];
        var docNotes = [];

        for (i = 0; i < therapies.length; i++) {
            console.log("therapy: " + i + " added");
            console.log("docid is: " + therapies[i].doc_userid + " added");
            doctors.push(await User.findOne({ "_id": therapies[i].doc_userid }));
            docNotes.push(therapies[i].docNotes);
        }
        res.json({
            doctors: doctors,
            docNotes: docNotes
        })
        console.log(therapies[0].doc_userid + "is the doc");

        //res.send(JSON.stringify(user));
    } catch (e) {
        console.log(e.stack);
        res.send({ message: "Error in Fetching patient: " + e.stack });
    }
});

router.post("/overviewMyFiles", auth, async (req, res) => {
    try {
        // request.user is getting fetched from Middleware after token authentication
        //User.find({ "mail": { $regex: ".*" + req.body.data.query + ".*" } });
        //Chat.find({ $or:[ {'sender':req.body.data.userid}, {'receiver':req.body.data.userid}]});
        console.log("pat id is: " + req.body.data.pat_userid);
        console.log("doc id is: " + req.body.data.doc_userid);
        //const patientfiles = await Patientfile.find({ pat_userid: req.body.data.pat_userid });
        const patientfiles = await Patientfile.find({ $or:[{"pat_userid": req.body.data.pat_userid }, {"shareWith": { $regex: ".*" + req.body.data.doc_userid + ".*" }}]});
        

        res.json({
            patientfiles: patientfiles
        })
        
        //res.send(JSON.stringify(user));
    } catch (e) {
        console.log(e.stack);
        res.send({ message: "Error in Fetching patient: " + e.stack });
    }
});

router.post("/overviewMyPats", auth, async (req, res) => {
    try {
        // request.user is getting fetched from Middleware after token authentication
        console.log("in my pats search");
        console.log("doc id is: " + req.body.data.doc_userid);
        const therapies = await Therapy.find({ doc_userid: req.body.data.doc_userid });
        var patients = [];
        var patNotes = [];

        for (i = 0; i < therapies.length; i++) {
            console.log("therapy: " + i + " added");
            console.log("docid is: " + therapies[i].pat_userid + " added");
            patients.push(await User.findOne({ "_id": therapies[i].pat_userid }));
            patNotes.push(therapies[i].patNotes);
        }


        res.json({
            patients: patients,
            patNotes: patNotes
        })
        console.log(therapies[0].doc_userid + "is the doc");

        //res.send(JSON.stringify(user));
    } catch (e) {
        console.log(e.stack);
        res.send({ message: "Error in Fetching patient: " + e.stack });
    }
});

router.post("/searchMyDocs", auth, async (req, res) => {
    try {
        // request.user is getting fetched from Middleware after token authentication
        console.log("in my docs search");
        console.log("pat id is: " + req.body.data.pat_userid);
        console.log("lastname filter is: " + req.body.data.doc_lastname)
        const therapies = await Therapy.find({ pat_userid: req.body.data.pat_userid });
        var doctors = [];
        var doc;

        for (i = 0; i < therapies.length; i++) {
            console.log("therapy: " + i + " added");
            console.log("docid is: " + therapies[i].doc_userid);
            console.log("query is is: " + req.body.data.doc_lastname);
            doc = await User.findOne({ "_id": therapies[i].doc_userid });
            console.log("lastname of DOC: " + doc.lastname);
            try
            {
                if (doc.lastname.includes(req.body.data.doc_lastname)) {
                    console.log("it fits")
                    doctors.push(doc);
                }
            }
            catch{
                console.log("no lastname");
            };
        }
        res.json({
            doctors: doctors
        });
        console.log(therapies[0].doc_userid + "is the doc");

        //res.send(JSON.stringify(user));
    } catch (e) {
        console.log(e.stack);
        res.send({ message: "Error in Fetching patient: " + e.stack });
    }
});

router.post("/searchMyPats", auth, async (req, res) => {
    try {
        // request.user is getting fetched from Middleware after token authentication
        console.log("in my pats search");
        console.log("doc userid is: " + req.body.data.doc_userid);
        console.log("lastname filter is: " + req.body.data.pat_lastname)
        const therapies = await Therapy.find({ doc_userid: req.body.data.doc_userid });
        var patients = [];
        var pat;

        for (i = 0; i < therapies.length; i++) {
            console.log("therapy: " + i + " added");
            console.log("patid is: " + therapies[i].pat_userid);
            console.log("query is is: " + req.body.data.pat_lastname);
            pat = await User.findOne({ "_id": therapies[i].pat_userid });
            console.log("lastname of pat: " + pat.lastname);
            try
            {
                if (pat.lastname.includes(req.body.data.pat_lastname)) {
                    console.log("it fits")
                    patients.push(pat);
                }
            }
            catch{
                console.log("no lastname");
            };
        }
        res.json({
            patients: patients
        });

        //res.send(JSON.stringify(user));
    } catch (e) {
        console.log(e.stack);
        res.send({ message: "Error in Fetching patient: " + e.stack });
    }
});


router.post("/searchQuery", auth, async (req, res) => {
    try {
        // request.user is getting fetched from Middleware after token authentication
        console.log("search Query is: " + req.body.data.query);
        const users = await User.find({ "mail": { $regex: ".*" + req.body.data.query + ".*" } });
        var patients = [];
        console.log("user 0: " + users[0].patid)
        for (i = 0; i < users.length; i++) {
            patients.push(await Patient.findById(users[i].patid));
            console.log("user: " + i + " added");


            const doctors = await Doctor.findById(users[i].docid);
            if (users[0].patid) {
                res.json({
                    users: users,
                    patients: patients
                });
            }
            else {
                res.json({
                    users: users,
                    doctors: doctors
                });
            }
        }

        //res.send(JSON.stringify(user));
    } catch (e) {
        console.log(e.stack);
        res.send({ message: "Error in Fetching patient: " + e.stack });
    }
});


router.post(
    "/patientfile-sent",
    [
       
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }
        const {
            pat_userid,
            filename,
            original_filename,
            filetype,
            notes,
            shareWith
        } = req.body;
        try {
           
            //setting the patid of the user object to the Obj id of the Patient :)
            var patientfile = new Patientfile({
                pat_userid: req.body.pat_userid,
                filename: req.body.filename,
                original_filename: req.body.original_filename,
                filetype: req.body.filetype,
                notes: req.body.notes,
                shareWith: req.body.shareWith
            })
            await patientfile.save();
            //await patient.save();

        } catch (err) {
            console.log(err.message);
            console.log(err.stack)
            res.status(500).send("Error in Saving");
        }
    }
);


router.post("/checkFile", auth, async (req, res) => {
    try {
        // request.user is getting fetched from Middleware after token authentication
        
        const filename = req.body.data.filename
        console.log("filename is: " + filename);
        const patientfile = await Patientfile.findOne({"filename": filename});

        if(!patientfile)
        {
            console.log("no file");
        }
        else
        {
            console.log("found one! :)");
            console.log("type: " + patientfile.filetype);
        }
        res.json({
            patientfile: patientfile
        });

        //res.send(JSON.stringify(user));
    } catch (e) {
        console.log(e.stack);
        res.send({ message: "Error in Fetching File: " + e.stack });
    }
});

router.post(
    "/chat-sent",
    [
       
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }
        const {
            sender,
            receiver,
            message,
            type,
        } = req.body;
        try {
           
            //setting the patid of the user object to the Obj id of the Patient :)
            var nChat = new Chat({
                sender: req.body.sender,
                receiver: req.body.receiver,
                message: req.body.message,
                type: req.body.type,
            })
            await nChat.save();
            //await patient.save();

        } catch (err) {
            console.log(err.message);
            console.log(err.stack)
            res.status(500).send("Error in Saving");
        }
    }
);


router.post("/chat-receive", auth, async (req, res) => {
    try {
        // request.user is getting fetched from Middleware after token authentication
        console.log("receiving chat");
        //console.log("user id is: " + req.body.data.userid);
        //const messages = await Chat.find({ sender: req.body.data.userid });
        const messages = await Chat.find({ $or:[ {'sender':req.body.data.mail}, {'receiver':req.body.data.mail}]});

        /*for (i = 0; i < messages.length; i++) {
            console.log("therapy: " + i + " added");
            console.log("docid is: " + therapies[i].pat_userid + " added");
            messages.push(await User.findOne({ "_id": therapies[i].pat_userid }));
            patNotes.push(therapies[i].patNotes);
        }*/


        res.json({
            messages: messages,
        })

        //res.send(JSON.stringify(user));
    } catch (e) {
        console.log(e.stack);
        res.send({ message: "Error in Fetching patient: " + e.stack });
    }
});


module.exports = router;