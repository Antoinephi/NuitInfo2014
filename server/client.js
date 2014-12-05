var key = require('./generate_key');
var board = require('./board');
var doctor = require('./doc')
var listClient = [];

function Client(socket) {
	this.freeMove = true;
	this.socket = socket;
	key.nextKey();
	this.id = key.getKey();
	socket.emit('message', 'SENDID ' + this.id);
	this.controllerSocket = null;
	this.doctor = new doctor.Doc();
	this.board = new board.Board(this.doctor);
	this.timer = 120;

	listClient.push(this);

	console.log('Add client '+this.id);
}

Client.prototype = {
	addController: function(socket) {
		this.controllerSocket = socket;
		var clientTmp = this;
		this.controllerSocket.on("message", function(message){

			var msgCut = message.split(' ');
			var x,y;
			var old_x, old_y;

			switch(msgCut[0]) {

				case 'DIRECTION':
					if(!clientTmp.freeMove)
						return;
					switch(msgCut[1]){
						case 'NORTH':
							x = 0;
							y = -1;
							break;
						case 'EAST':
							x = 1;
							y = 0;
							break;
						case 'SOUTH':
							x = 0;
							y = 1;
							break;
						case 'WEST':
							x = -1;
							y = 0;
							break;
						default:
							return;
					}
					clientTmp.freeMove = false;
					setTimeout(function() {
						clientTmp.freeMove = true;
					}, 250);
					clientTmp.board.moveDoctor(x, y);
					clientTmp.sendGame();
					break;
				default:
					console.log('Unknow message : '+msgCut[0]);
			}
		})
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
		this.decreaseTimer(this);
		
	},
	sendGame: function() {
		var cmdName = this.board.getCmdMap();
		this.socket.emit('message', cmdName);
		cmdName = this.doctor.getCmdDoc();
		this.socket.emit('message', cmdName);
		console.log("send game");
	},
	decreaseTimer: function(clientT) {
		if(clientT.timer == 0) {
			clientT.socket.emit('message', "GAMEOVER");
		}
		else {
			clientT.timer--;
			clientT.socket.emit('message', "TIMER "+clientT.timer);
			setTimeout(function() {
				clientT.decreaseTimer(clientT);
				}, 1000);
				
		}
	}
	
}

module.exports.Client = Client;
module.exports.listClient = listClient;
