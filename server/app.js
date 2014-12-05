var http = require('http');
var express = require('express');
var socket = require('socket.io');
var path = require('path');
var key = require('./generate_key');
var client = require('./client.js');

key.initKey();
var server = express();
var dirPath = path.join(__dirname, '../client/');

server.use(express.static(dirPath));

var app = http.createServer(server);
var io = socket.listen(app);

io.sockets.on('connection', function(socket) {
	console.log('Client connected !');

	socket.on('message', function (message) {
		console.log(message);
		var msgCut = message.split(' ');

		switch(msgCut[0]) {

			case 'CONNECT':
				msgConnect(socket, msgCut);
				break;
			case 'LOGIN':
				msgLogin(socket, msgCut);
				break;
			default:
				console.log('Unknow message : '+msgCut[0]);
		}

		socket.on('disconnect', function() {
			for(var i = 0; i < client.listClient.length; i++) {
				if(socket == client.listClient[i].socket) {
					console.log("Display " + client.listClient[i].id + " disconnected ");
					client.listClient.splice(i, 1);
					return;
				}
			}
		})

	});
});

function msgConnect(socket, msg) {

	switch(msg[1]) {
		case 'CONTROLLER':
			console.log('Controller connected');
			break;
		case 'DISPLAY':
			console.log('Display connected');
			var clt = new client.Client(socket);
			break;
	}
}

function msgLogin(socket, msg) {
	for(var i = 0; i < client.listClient.length; i++) {
		if(msg[1] == client.listClient[i].id) {
			client.listClient[i].addController(socket);
			client.listClient.splice(i, 1);
			socket.emit('message', 'LOGIN OK');
			return;
		}
	}
	socket.emit('message', 'LOGIN FAIL');
}
app.listen(8080);
console.log('Server running at http://127.0.0.1:8080/');
