var socket = null;

function main() {
	socket = io.connect('http://localhost:8080');
	socket.emit('message', 'CONNECT CONTROLLER');
	socket.on('message', function (message) {
		var msgCut = message.split(' ');
		
		switch(msgCut[0]) {
		
			case 'LOGIN':
				controller_msgLogin(msgCut);
				break;
			default:
				console.log('Unknow message : '+msgCut[0]);
		}
	});
}

function controller_msgLogin(msg) {
	console.log('>'+msg[1]);
	switch(msg[1]) {
		case 'OK':
			document.getElementById('main-frame').innerHTML = '';
			break;
		case 'FAIL':
			document.getElementById('msg').innerHTML = 'Unknown ID';
			break;
	}
}

function controller_sendId() {
	socket.emit('message', 'LOGIN '+ document.getElementById('input_id').value);
}