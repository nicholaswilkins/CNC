"use strict";
var net = require('net');
var events=require('events');
var needToListen=new events.EventEmitter();
var ignore = []; //sockets who are in a "sub program"
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
var clientListner=require('./clientListner.js');
var help = function(){
    return "help";
};
var request = function(request,socket){
	switch(request){
	    case "help":
	        sendData(socket,help());
	        break;
	    case "establishConnection":
	    	clientListner.createServer(socket,socket).listen(2000);
	    	needToListen.emit('ignore',socket);
	    	break;
        default:
            sendData(socket, "Command Not Found");
            break;
    }
};
needToListen.on('ignore',function(socket){
	ignore.push(socket);
})
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
				if(ignore.indexOf(socket)==-1){
					request(cleanInput(chunk),socket);
				}
			}
		});
	});
	return netServer;
};