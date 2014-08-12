"use strict";
var files=require("./fileServer");
files.makeServer().listen(8080);
var termServer = require ("./terminalServer.js");
termServer.createServer().listen(5000);