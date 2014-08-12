"use strict";
exports.establishHTTPConnection = function(clientReq,clientRes,adminReq,adminRes){
    clientReq.on('data', function(chunk){
        adminRes.write(chunk);
    });
    adminReq.on('data',function(chunk){
        clientRes.write(chunk);
    });
};
exports.establishSocketConnection=function(socket){
    
};