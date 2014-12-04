var socket = null;

function main() {
	socket = io.connect('http://'+location.host);
	socket.emit('message', 'CONNECT DISPLAY');

	socket.on('message', function (message) {
		var msgCut = message.split(' ');

		switch(msgCut[0]) {

			case 'SENDID':
				document.getElementById('key_span').innerHTML = msgCut[1];
				break;
				
			case 'NEW_CONTROLLER':
				document.getElementById('main-frame').innerHTML = '';
				break;
				
			default:
				console.log('Unknow message : '+msgCut[0]);
		}
	});
}
