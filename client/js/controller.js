function main() {
	var socket = io.connect('http://localhost:8080');
	socket.emit('message', 'CONNECT CONTROLLER');
}