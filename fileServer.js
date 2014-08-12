"use strict";
var http=require('http');
var fs = require('fs');
exports.makeServer=function(){
    var serv=http.createServer(function(req,res){
        var filePath = "/home/ubuntu/workspace/payloads"+req.url;
        if(fs.existsSync(filePath)){
            if(fs.lstatSync(filePath).isFile()){
                res.writeHead(200);
                res.write(fs.readFileSync(filePath));
                res.end();
            }else{
                res.writeHead(404);
                res.write("file not found");
                res.end();
            }
        }else{
            res.writeHead(404);
            res.write("file not found");
            res.end();
        }
    });
    return serv;
};