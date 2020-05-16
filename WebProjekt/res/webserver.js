var http = require("http");
var url = require("url");
var chalk = require("chalk");
var formidable = require("formidable");
var fs = require("fs");
var util = require("util");
var events = require("events")
var mysql = require("mysql");

//self written requirements
var date = require("./node_modules/dateTools");

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

var eventEmitter = new events.EventEmitter();


var eventHandler = function() {
    console.log("Event caught");
}

eventEmitter.on("myEvent", eventHandler);






http.createServer(function(request, response) {

    if (request.url == "/fileupload"){
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
    }

    else
    {


        response.writeHead(200, {"content-type": "text/html; charset=utf-8"});
        
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
                        console.log(result);
                        console.log(result[0].mail);
                        eventEmitter.emit("db-ready");
                        console.log("emitted :)");
                    }
                });
                
            }
        });

        function sendResponse(){
            var htmlResponse = getHTMLStruct("MediComm",
            "<h1 style='color:red;'>" + message + "</h1>");
        
            response.end(htmlResponse);
        }

        var body =
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

        response.write("Guten Tag " + name);

        response.end(htmlResponse);
    }
}).listen(8080, "127.0.0.1");
console.log("Webserver wird ausgeführt.");

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

