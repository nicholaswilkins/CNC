"use strict";
var files=require("./fileServer");
files.makeServer().listen(8080);
var termServer = require ("./terminalServer.js");
termServer.createServer().listen(5000);
var tty = require('tty.js');

var app = tty.createServer({
  shell: 'bash',
  users: {
    nicbit:"pass"
  },
  port: 800
});

app.get('/', function(req, res, next) {
  res.send('bar');
});

app.listen();