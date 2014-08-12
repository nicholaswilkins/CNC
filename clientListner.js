exports.createServer=function(adminReq,adminRes){
    var http = require("http");
    var serv = http.createServer(function(req,res){
        var cont = require('./socketController.js');
        cont.establishHTTPConnection(req,res,adminReq,adminRes);
    })
    return serv;
};