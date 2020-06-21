const fs = require("fs");
const events = require("events");
const express = require("express");
const mongo = require("mongodb").MongoClient;
const bodyParser = require("body-parser");
const path = require("path");
const multer = require("multer");
const cookieParser = require("cookie-parser");

//self written requirements
const date = require("./tools/dateTools");
const dbTools = require("./tools/dbTools");
const InitiateMongoServer = require("./config/db"); 
const backend_routes = require("./routes/backend_routes"); //new addition

class Webserver
{

    constructor()
    {
        this.init();
    }

    initEventEmitters()
    {
        //initializing eventemitters
        var eventEmitter = new events.EventEmitter();
        var eventHandler = function() {
            console.log("Event caught");
        }
        eventEmitter.on("myEvent", eventHandler);
    }

    initAttributes()
    {
        //userdata for REST
        this.userData = null;
        //init express
        this.app = express();
        //Setting header to pass cookies conform CORS
        this.app.use(function(req, res, next) {
            //res.header("Access-Control-Allow-Origin", "http://localhost:3000");
            res.header("Access-Control-Allow-Origin", "http://10.0.2.2:5000");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, token");
            res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
            res.header("Access-Control-Allow-Credentials", "true");
            next();
        });
        //use bodyparser
        this.app.use(bodyParser.json());
        /* cookie usage */
        this.app.use(cookieParser());
        //extended: false->querystring,true->qs
        this.urlParser = bodyParser.urlencoded({extended:false});
        this.upload = multer({dest: "public/uploads/"});
    }

    

    expressMethods()
    {
        //sending to routes/backend_routes.js
        this.app.post("/pat-reg-sent", this.urlParser, backend_routes);
        this.app.post("/doc-reg-sent", this.urlParser, backend_routes);
        this.app.post("/addPatient", this.urlParser, backend_routes);
        this.app.post("/login-sent", this.urlParser, backend_routes);
        this.app.get("/me", this.urlParser, backend_routes);
        this.app.post("/checkUserUrl", this.urlParser, backend_routes);
        this.app.post("/checkFile", this.urlParser, backend_routes);
        this.app.post("/edit-sent-patient", this.urlParser, backend_routes);
        this.app.post("/edit-sent-doctor", this.urlParser, backend_routes);
        this.app.post("/edit-sent-patientfile", this.urlParser, backend_routes);
        this.app.post("/edit-sent-patnotes", this.urlParser, backend_routes);
        this.app.post("/edit-sent-docnotes", this.urlParser, backend_routes);
        this.app.post("/edit-sent-user", this.upload.single("profilepic"), this.urlParser, backend_routes);
        this.app.post("/chat-sent", this.urlParser, backend_routes);
        this.app.post("/chat-receive", this.urlParser, backend_routes);

        //adding file infos in database and putting file in another directory
        this.app.post("/patientfile-sent", this.urlParser, backend_routes);


        this.app.post("/overviewMyDocs", this.urlParser, backend_routes);
        this.app.post("/overviewMyPats", this.urlParser, backend_routes);
        this.app.post("/overviewMyFiles", this.urlParser, backend_routes);
        this.app.post("/searchMyDocs", this.urlParser, backend_routes);
        this.app.post("/searchMyPats", this.urlParser, backend_routes);
        this.app.post("/searchQuery", this.urlParser, backend_routes);

        //redirect to login
        this.app.get("/", function(request, response){
            response.sendFile(path.join(__dirname+"/src/static/content/login.html"));
        });


        //profilepic file upload
        this.app.post("/profilepic-sent", this.upload.single("file"), function(request, response){
            console.log("filename: " + request.body.newfilename);
            var file = __dirname + "/" + request.file.originalname;
            fs.rename(request.file.path,
                request.file.destination+request.body.newfilename,
                (error) => {
                    if(error)
                        throw error;
                    var responseJSON = {
                        message: "File uploaded successfull",
                        filename: request.file.originalname
                    };
                    response.end(JSON.stringify(responseJSON));
                });
        });

        //single file upload
        this.app.post("/fileUpload", this.upload.single("file"), function(request, response){
            console.log("filename: " + request.body.newfilename);
            var file = __dirname + "/" + request.file.originalname;
            fs.rename(request.file.path,
                request.file.destination+request.body.newfilename + "." + request.body.filetype,
                (error) => {
                    if(error)
                        throw error;
                    var responseJSON = {
                        message: "File uploaded successfull",
                        filename: request.file.originalname
                    };
                    response.end(JSON.stringify(responseJSON));
                });
        });

       

        //multiple file upload
        this.app.post("/filesupload", this.upload.array("files"), function(request, response){
            for (var index in request.files){
                var regFile = request.files[index];
                var file = __dirname + "/" + reqFile.originalname;
                fs.rename(reqFile.path,
                    reqFile.destination+reqFile.originalname,
                    (error) => {
                        if(error)
                            throw error;
                    });
            }
            responseJSON = {
                message: request.files.length+" files uploaded succesfully"
            };
            response.end(JSON.stringify(responseJSON));
        });

        /* end express app reactions */
    }

    startServer()
    {
        /* starting server using express */
        var server = this.app.listen(8080, function() {
            var host = server.address().address;
            //var host = "192.168.2.102";
            var port = server.address().port;

            console.log("Express app listening at http://%s:%s", host, port);
        });
    }

    init()
    {
        InitiateMongoServer();
        this.initEventEmitters();
        //this.mongoConnect();
        this.initAttributes();
        this.expressMethods();
        this.startServer();
    }

}

var webserver = new Webserver();