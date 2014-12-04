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
	console.log('Client connected !');
	
	socket.on('message', function (message) {

		var msgCut = message.split(' ');
		
		switch(msgCut[0]) {
		
			case 'CONNECT':
				msgConnect(msgCut);
				break;
			default:
				console.log('Unknow message : '+msgCut[0]);
		}

	});
});

function msgConnect(msg) {

	switch(msg[1]) {
		case 'CONTROLLER':
			console.log('Controller connected');
			break;
		case 'DISPLAY':
			console.log('Display connected');
			
			break;
	}
}

app.listen(8080, '127.0.0.1');
console.log('Server running at http://127.0.0.1:8080/');
