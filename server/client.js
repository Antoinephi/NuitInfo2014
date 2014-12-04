var key = require('./generate_key');
var listClient = [];

function Client(socket) {
	this.socket = socket;
	key.nextKey()
	this.id = key.getKey();
	socket.emit('message', 'SENDID ' + this.id);
	this.controllerSocket = null;

	listClient.push(this);

	console.log('Add client '+this.id);
}

Client.prototype = {
	addController: function(socket) {
		this.controllerSocket = socket;
		this.socket.emit('message', 'NEW_CONTROLLER');
		console.log('Add controller to client '+this.id);
	}

}

module.exports.Client = Client;
module.exports.listClient = listClient;
