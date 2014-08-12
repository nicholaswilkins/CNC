"use strict";
var net = require('net');
function cleanInput(data) {
	return data.toString().replace(/(\r\n|\n|\r)/gm,"");
}
function sendData(socket, data) {
    socket.write(data + "\n\n");
    socket.write("$ ");
}
function passwordCheck(pass){
	if(pass==="pass"){
		return true;
	}else{
		return false;
	}
}
function welcome(socket){
socket.write("           )         \n");
socket.write("   (    ( /(    (    \n");
socket.write("   )\\   )\\())   )\\   \n");
socket.write(" (((_) ((_)\\  (((_)  \n");
socket.write(" )\\___  _((_) )\\___  \n");
socket.write("((/ __|| \\| |((/ __| \n");
socket.write(" | (__ | .` | | (__  \n");
socket.write("  \\___||_|\\_|  \\___| \n");
sendData(socket,"----------------------");
}

var help = function(){
    return "help";
};
var request = function(request,socket){
	switch(request){
	    case "help":
	        sendData(socket,help());
	        break;
        default:
            sendData(socket, "Command Not Found");
            break;
    }
};
exports.createServer = function(){
	var netServer = net.createServer(
	function (socket) {
	  var loggedIn=false;
		socket.write("password:");
		socket.on('data', 
		function(chunk){
			if(loggedIn===false){
				if(passwordCheck(cleanInput(chunk))===true){
					welcome(socket);
					loggedIn=true;
				}else{
                	socket.write("incorrect");
                	socket.end();
				}
			}else{
				//a valid user :-)
				request(cleanInput(chunk),socket);
			}
		});
	});
	return netServer;
};