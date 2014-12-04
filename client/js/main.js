
function debug(msg) {
	document.getElementById('debug').innerHTML += msg+'<br />'; 
}

function checkEvent(event) {
	if(event.alpha != null) {
		debug('Device');
	}
	else {
		debug('Display');
	}
	
	window.removeEventListener('deviceorientation', checkEvent);
}

function main() {
	if(window.DeviceOrientationEvent) {
		window.addEventListener('deviceorientation', checkEvent, false);
		var timeout_api = setTimeout(function () {
			debug('Display');
			window.removeEventListener('deviceorientation', checkEvent);
		}, 1000);
	} else {
		debug('Display');
	}
}