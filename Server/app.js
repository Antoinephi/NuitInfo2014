var http = require('http');
var express = require('express');
var socket = require('socket.io');
var path = require('path');

var server = express();
var dirPath = path.join(__dirname, '../client/');

server.use(express.static(dirPath));

var app = http.createServer(server);
var io = socket.listen(app);

io.sockets.on('connection', function(socket) {
  console.log('An user is connected !');
});

app.listen(8080, '127.0.0.1');
console.log('Server running at http://127.0.0.1:8080/');
