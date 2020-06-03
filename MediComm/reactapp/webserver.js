const http = require("http");
const url = require("url");
const chalk = require("chalk");
const formidable = require("formidable");
const fs = require("fs");
const util = require("util");
const events = require("events");
//var mysql = require("mysql");
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
const user = require("./routes/user"); //new addition

class Webserver
{

    //reading file from server
    /*fs.readFile("test.txt", function(error, data){
        //console.log(data)//binary output
        console.log(data.toString);
    })*/


    //writing file to server
    /*fs.writeFile("newFile.txt", "Inhalt der\nDatei", (error) => {
        if(error)
            throw error;
        console.log("file was saved");
    });*/

    //passed console arguments
    /*var arguments = process.argv;
    console.log(arguments[2]);*/

    //colored console
    /*console.log("default");
    console.log(chalk.red("rot"));*/

    //dateoutput
    //console.log(date.germanDate());

    //proper logging function
    /*var s = util.format("Guten %s", "Tag");
    util.log(s);
    console.log(s)*/

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



    /*mongoConnect()
    {
    //connecting to db
        mongo.connect("mongodb://localhost:27017/", {useNewUrlParser: true},
            function(error, client){
                if(error)
                    throw error;
                else{
                    const collUser = client.db("medicomm").collection("users");

                    dbTools.createData(collUser,
                        [{vorname:"Max", name:"Mustermann"},
                        {vorname:"Tim", name:"Struppi"}]);

                    client.close();
                }
            }
        );
    }*/

    initAttributes()
    {
        //userdata for REST
        this.userData = null;
        //init express
        this.app = express();
        //Setting header to pass cookies confrom CORS
        this.app.use(function(req, res, next) {
            res.header("Access-Control-Allow-Origin", "http://localhost:3000");
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
        this.upload = multer({dest: "src/uploads/"});
    }

    

    expressMethods()
    {
        


        this.app.get("/cookie_set", function(request, response){
            response.cookie("hshl", "myValue", {expire: new Date() + 10000})
                .end("set cookie");
        });

        this.app.get("/cookie_get", function(request, response){
            console.log(request.cookies);
            response.end("Cookie: " + request.cookies["hshl"])
        });

        this.app.get("/cookie_delete", function(request, response){
            response.clearCookie("hshl");
            response.end("Cookie deleted");
        });
        /* end cookie usage */


        this.app.post("/pat-reg-sent", this.urlParser, user);
        //this.app.post("/pat-reg-sent", this.urlParser, patient);
        this.app.post("/doc-reg-sent", this.urlParser, user);
        this.app.post("/addPatient", this.urlParser, user);
        this.app.post("/login-sent", this.urlParser, user);
        this.app.get("/me", this.urlParser, user);
        this.app.post("/checkUserUrl", this.urlParser, user);
        this.app.post("/edit-sent-patient", this.urlParser, user);
        this.app.post("/edit-sent-user", this.upload.single("profilepic"), this.urlParser, user);

        //adding file infos in database and putting file in another directory
        this.app.post("/patientfile-sent", this.urlParser, user);


        this.app.post("/overviewMyDocs", this.urlParser, user);
        this.app.post("/overviewMyPats", this.urlParser, user);
        this.app.post("/searchMyDocs", this.urlParser, user);
        this.app.post("/searchMyPats", this.urlParser, user);
        this.app.post("/searchQuery", this.urlParser, user);

        /* restful function examples */
        this.app.get("/listUsers", function(request, responseJSON){
            response.end(JSON.stringify(this.readUserData()));
        });

        this.app.get("/getUser=:id", function(request, response){
            data = this.readUserData();
            var user = data["user"+request.params.id];
            response.end(JSON.stringify(user));
        });

        this.app.get("/addUser", function(request, response){
            fs.readFile(__dirname+"/users.json", "utf8",
                function(error, data){
                    data = this.readUserData();
                    data["user4"] = {
                        "name" : "Mustermann",
                        "vorname" : "Max",
                        "email" : "max.mustermqnn@web.de"
                    };
                    response.end(JSON.stringify(data));
                })
        });

        this.app.get("/removeUser=:id", function(request, response){
            data = this.readUserData();
            delete data["user"+request.params.id];

            response.end(JSON.stringify(data));
        });
        /* end restful function examples */

        this.app.get("/", function(request, response){
            

            //response.writeHead(200, {"content-type": "text/html; charset=utf-8"});
            

            //MySQL Database tools
            /*
            var con = mysql.createConnection({
                host: "localhost",
                database: "medicomm",
                user: "root",
                password: ""
            });

            var message = "msgtemplate";

            eventEmitter.on("db-ready", sendResponse);
            con.connect(function(error){
                if(error){
                    message = "Connection error: " + error.message;
                    eventEmitter.emit("db-ready");
                    throw error;
                }
                else{
                    con.query("SELECT * FROM users",
                    function(error, result, fields){
                        if(error){
                            
                            message = "Query error: " + error.message;
                            eventEmitter.emit("db-ready");
                        }
                        else{
                            message = result[0].mail;
                            eventEmitter.emit("db-ready");
                        }
                    });
                    
                }
            });

            function sendResponse(){
                var htmlResponse = this.getHTMLStruct("MediComm",
                "<h1 style='color:red;'>" + message + "</h1>");
            
                response.end(htmlResponse);
            }*/

            //File upload
            response.sendFile(path.join(__dirname+"/src/static/content/login.html"));
            
            /*var body =
                "<form action='fileupload' method='post' enctype='multipart/form-data'>"+
                "<input type='file' name='file'><br>"+
                "<input type='submit'>"+
                "</form>";
            var htmlResponse = this.getHTMLStruct("MediComm", body);


            var urlRequest = url.parse(request.url, true);
            var name = "";



            if(urlRequest.query.name != undefined) {
                name = urlRequest.query.name;
            }

            response.send(htmlResponse);*/

            //response.write("Guten Tag " + name);

            //response.end(htmlResponse);

        });

        /* Express app reactions */

        //old version
        /*app.post("/fileupload", function(request, response){
            var form = new formidable.IncomingForm();
                form.parse(request, function(error, fields, files){
                    var oldpath = files.file.path;
                    var newpath = __dirname+"/files/"+files.file.name;

                    fs.rename(oldpath, newpath, function(error){
                        if(error)
                            throw error;
                        response.write("File uploaded");
                        response.end();
                    });
                });
        });*/

        //app.post("file")

        this.app.get("/login", this.urlParser, function(request, response){
            //getting values of POST
            /*responseJSON = {
                username:request.body.name,
                password:request.body.password
                //request.url.attribute for GET I think 
            };
            response.end(JSON.stringify(responseJSON));*/
            response.sendFile(path.join(__dirname+"/static/content/login.html"));

        });

       

        this.app.get("/doc-reg", this.urlParser, function(request, response){
            //getting values of POST
            /*responseJSON = {
                username:request.body.name,
                password:request.body.password
                //request.url.attribute for GET I think 
            };
            response.end(JSON.stringify(responseJSON));*/
            response.sendFile(path.join(__dirname+"/static/content/doc-reg.html"));

        });

        this.app.get("/pat-reg", this.urlParser, function(request, response){
            //getting values of POST
            /*responseJSON = {
                username:request.body.name,
                password:request.body.password
                //request.url.attribute for GET I think 
            };
            response.end(JSON.stringify(responseJSON));*/
            response.sendFile(path.join(__dirname+"/static/content/pat-reg.html"));

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


    readUserData(renewData = false){
        if(userData == null || renewData){
            userData = JSON.parse(
                fs.readFileSync(
                    __dirname+"/users.json", "utf8")
            );
        }
        return userData;
    }

    getHTMLStruct(title, body){
        var htmlStruct = "<!DOCTYPE html>"
        + "<html>"
            + "<head>"
                + "<meta charset='utf-8'>"
                + "<title>" + title + "</title>"
            + "</head>"
            + "<body>"
                + body
            + "</body>"
        + "</html>";

        return htmlStruct;
    }

}

var webserver = new Webserver();