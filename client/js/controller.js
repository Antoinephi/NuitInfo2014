var socket = null;

var global_alpha;
var global_beta;
var global_gamma;

function main() {
	socket = io.connect('http://'+location.host);
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
	switch(msg[1]) {
		case 'OK':
			document.getElementById('main-frame').innerHTML = '';
			calibration();
			process();
			break;
		case 'FAIL':
			document.getElementById('msg').innerHTML = 'Unknown ID';
			break;
	}
}

function controller_sendId() {
	socket.emit('message', 'LOGIN '+ document.getElementById('input_id').value);
}


function calibration(){
	var cpt = 0;
	if(window.DeviceOrientationEvent) {	
		  	window.addEventListener("deviceorientation", function(event){
		  		if(cpt == 0){		
			  		global_alpha = event.alpha;
			  		global_beta = event.beta;
			  		global_gamma = event.gamma;
			  		document.getElementById("calibrage").innerHTML = "<ul><li>Alpha : " + global_alpha + "</li><li>Beta : " 
			  		+ global_beta + "</li><li>Gamma : " + global_gamma + "</li></ul>";
				  	cpt = 1;

		  		}
		  	}, false);
		}
	
}

function process(){
	if(window.DeviceOrientationEvent) {			
		  	window.addEventListener("deviceorientation", function(event){


			var alpha = event.alpha;
			var beta = event.beta;
			var gamma = event.gamma;

							if(event.beta <= 10) {
								socket.emit('message', 'DIRECTION NORTH');  			
					  		}
					  		else if(event.beta >= 35) {
					  			socket.emit('message', 'DIRECTION SOUTH');
					  		}
					  		else if(event.gamma >= 20) {
					  			socket.emit('message', 'DIRECTION EAST');
					  		}
					  		else if(event.gamma <= 20) {
					  			socket.emit('message', 'DIRECTION WEST');
					  		}
			/*
			window.addEventListener("touchend", function(){
				var cpt = 0;
				if(window.DeviceOrientationEvent) {	
					  	window.addEventListener("deviceorientation", function(event){
					  		/*if(cpt == 0){		
						  		global_alpha = event.alpha;
						  		global_beta = event.beta;
						  		global_gamma = event.gamma;
						  		document.getElementById("calibrage").innerHTML = "<ul><li>Alpha : " + global_alpha + "</li><li>Beta : " 
						  		+ global_beta + "</li><li>Gamma : " + global_gamma + "</li></ul>";
							  	cpt = 1;

					  		}
					  		if(event.beta <= 10) {
								socket.emit('message', 'DIRECTION NORTH');  			
					  		}
					  		else if(event.beta >= 35) {
					  			socket.emit('message', 'DIRECTION SOUTH');
					  		}
					  		else if(event.gamma >= 20) {
					  			socket.emit('message', 'DIRECTION EAST');
					  		}
					  		else if(event.gamma <= 20) {
					  			socket.emit('message', 'DIRECTION WEST');
					  		}
					  	}, false);
		}
			});*/
			document.getElementById("orientation").innerHTML = "<ul><li>Alpha : " + alpha + "</li><li>Beta : " + beta + "</li><li>Gamma : " + gamma + "</li></ul>"; 
			/*
			  if(beta >= global_beta + 40){
			  		$("#largeur").text("gauche");
			  		$(".display-command").attr('id', 'W');
			  		socket.emit('message', 'DIRECTION WEST');
			  }  else if(beta <= global_beta -40) {
			  		$(".display-command").attr('id', 'E');
			  		$("#largeur").text("droite");
			  		socket.emit('message', 'DIRECTION EAST');
			  } else { 
			  		$("#largeur").text("milieu");
			  		socket.emit('message', 'DIRECTION MIDDLE-H');
			  }

		  	  if((alpha >= 100 + global_alpha) && (beta >= global_beta + 150)){
			  		$("#hauteur").text("bas");
			  		socket.emit('message', 'DIRECTION SOUTH');
			  		$(".display-command").attr('id', 'S');


			  } else if( gamma <= global_gamma-10) {
			  		$("#hauteur").text("haut");
			  		socket.emit('message', 'DIRECTION NORTH');
			  		$(".display-command").attr('id', 'N');


			  } else {
			  		$("#hauteur").text("milieu");
			  		socket.emit('message', 'DIRECTION MIDDLE-V');
			  }*/
		}, false);
	}
}