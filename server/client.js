var key = require('./generate_key');
var board = require('./board');
var doctor = require('./doc')
var listClient = [];

function Client(socket) {
	this.socket = socket;
	key.nextKey();
	this.id = key.getKey();
	socket.emit('message', 'SENDID ' + this.id);
	this.controllerSocket = null;
	this.doctor = new doctor.Doc();
	this.board = new board.Board(this.doctor);

	listClient.push(this);

	console.log('Add client '+this.id);
}

Client.prototype = {
	addController: function(socket) {
		this.controllerSocket = socket;
		this.socket.emit('message', 'NEW_CONTROLLER');
		this.socket.emit('message', 'STARTGAME');
		this.board.init();
		for(var i = 0; i < 10; i++) {
			this.board.addPerson();
			this.board.dropSeringue(5);
		}
		this.initGame()
		this.sendGame();
		console.log('Add controller to client '+this.id);
	},
	initGame: function() {
		var cmdName = this.board.getInitMap();
		this.socket.emit('message', cmdName);
		console.log("init game");
	},
	sendGame: function() {
		var cmdName = this.board.getCmdMap();
		this.socket.emit('message', cmdName);
		cmdName = this.doctor.getCmdDoc();
		this.socket.emit('message', cmdName);
		console.log("send game");
	}
}

module.exports.Client = Client;
module.exports.listClient = listClient;
