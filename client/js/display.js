var socket = null;

function main() {
	socket = io.connect('http://localhost:8080');
	socket.emit('message', 'CONNECT DISPLAY');

	socket.on('message', function (message) {
		var msgCut = message.split(' ');

		switch(msgCut[0]) {

			case 'SENDID':
				document.getElementById('key_span').innerHTML = msgCut[1];

			default:
				console.log('Unknow message : '+msgCut[0]);
		}
	});
}
