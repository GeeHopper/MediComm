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
const parser = require("body-parser");
const path = require("path");
const multer = require("multer");
const cookieParser = require("cookie-parser");

//self written requirements
const date = require("./tools/dateTools");
const dbTools = require("./tools/dbTools");

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


//initializing eventemitters
var eventEmitter = new events.EventEmitter();
var eventHandler = function() {
    console.log("Event caught");
}
eventEmitter.on("myEvent", eventHandler);

//connecting to db
mongo.connect("mongodb://localhost:27017/", {useNewUrlParser: true},
    function(error, client){
        if(error)
            throw error;
        else{
            const collUser = client.db("medicomm").collection("users");

            dbTools.createData(collUser,
                [{vorname:"Alinaa", name:"münschhh"},
                {vorname:"steven", name:"gee"}]);

            client.close();
        }
    }
);


//express init
var app = express();

//extended: false->querystring,true->qs
var urlParser = parser.urlencoded({extended:false})
var upload = multer({dest: "uploads/"});

app.use(cookieParser());

/* cookie usage */

app.get("/cookie_set", function(request, response){
    response.cookie("hshl", "myValue", {expire: new Date() + 10000})
        .end("set cookie");
})

app.get("/cookie_get", function(request, response){
    response.cookie("hshl", "myValue", {expire: new Date() + 10000})
        .end("set cookie");
})

app.get("/cookie_delete", function(request, response){
    response.cookie("hshl", "myValue", {expire: new Date() + 10000})
        .end("set cookie");
})

/* end cookie usage */

app.get("/", function(request, response){
    

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
        var htmlResponse = getHTMLStruct("MediComm",
        "<h1 style='color:red;'>" + message + "</h1>");
    
        response.end(htmlResponse);
    }*/

    //File upload
    response.sendFile(path.join(__dirname+"/static/content/upload_test.html"));
    
    /*var body =
        "<form action='fileupload' method='post' enctype='multipart/form-data'>"+
        "<input type='file' name='file'><br>"+
        "<input type='submit'>"+
        "</form>";
    var htmlResponse = getHTMLStruct("MediComm", body);


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

app.post("/login", urlParser, function(request, response){
    responseJSON = {
        username:request.body.name,
        password:request.body.password
    };
    response.end(JSON.stringify(responseJSON));
});

//single file upload
app.post("/fileupload", upload.single("file"), function(request, response){
    var file = __dirname + "/" + request.file.originalname;
    fs.rename(request.file.path,
        request.file.destination+request.file.originalname,
        (error) => {
            if(error)
                throw error;
            responseJSON = {
                message: "File uploaded successfull",
                filename: request.file.originalname
            };
            response.end(JSON.stringify(responseJSON));
        });
});

//multiple file upload
app.post("/fileupload", upload.array("files"), function(request, response){
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


/* starting server using express */

var server = app.listen(8080, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Express app listening at http://%s:%s", host, port);
});





function getHTMLStruct(title, body){
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

