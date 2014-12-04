var listClient = [];

function Client(socket) {
	this.socket = socket;
	this.id = 42;
	this.controllerSocket = null;
	
	listClient.push(this);
	
	console.log('Add client '+this.id);
}

Client.prototype = { 
	addController: function(socket) {
		this.controllerSocket = socket;
		console.log('Add controller to client '+this.id);
	}
		
}

module.exports.Client = Client;
module.exports.listClient = listClient;
