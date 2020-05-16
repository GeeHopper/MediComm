var http = require("http");
var url = require("url");
var chalk = require("chalk")



//passed console arguments
/*var arguments = process.argv;
console.log(arguments[2]);*/

//colored console
/*console.log("default");
console.log(chalk.red("rot"));*/

http.createServer(function(request, response) {
    response.writeHead(200, {"content-type": "text/html; charset=utf-8"});
    
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

    response.write("Guten Tagg " + name);

    response.end(htmlResponse);
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