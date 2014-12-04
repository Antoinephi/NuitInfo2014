var SIZE_CASE = 50;

var WIDTH_GAMEBOARD;
var HEIGHT_GAMEBOARD;

var WIDTH_HUD;
var HEIGHT_HUD;

var WIDTH_ITEM = 100;
var HEIGHT_ITEM = 10;

var canvas;
var context2D;

var item = 5;

function Doctor(x,y) {
	this.x = x;
	this.y = y;
}

Doctor.prototype = {
	moveX:function(offsetx) {
		if (this.x + offsetx < WIDTH_GAMEBOARD &&
			this.x + offsetx > 0)
				this.x += offsetx;
	},
	
	moveY:function(offsety) {
		if (this.y + offsety < HEIGHT_GAMEBOARD &&
			this.y + offsety > 0)
				this.y += offsety;
	}
};

var doctor = new Doctor(SIZE_CASE*4 + SIZE_CASE/2, SIZE_CASE*4 + SIZE_CASE/2);

function run () {
	canvas = document.getElementById('canvas');
	context2D = canvas.getContext('2d');
	
	/* define differents areas */
	WIDTH_HUD = 100;
	HEIGHT_HUD = canvas.height;
	WIDTH_GAMEBOARD = canvas.width - WIDTH_HUD;
	HEIGHT_GAMEBOARD = canvas.height;

	window.requestAnimationFrame(draw);
}

function draw () {

	/* Browser doesn't support canvas maggle */
	if (!canvas || !context2D)
		return;
	
	/* cleaning the whole canvas */
	context2D.fillStyle = 'white';
	context2D.fillRect(0,0,canvas.width,canvas.height);
	
	for (var x = 0 ; x < WIDTH_GAMEBOARD ; x = x + SIZE_CASE) {
		context2D.moveTo(x,0);
		context2D.lineTo(x,HEIGHT_GAMEBOARD);
		context2D.stroke();
	}

	for (var y = 0 ; y < HEIGHT_GAMEBOARD ; y = y + SIZE_CASE) {
		context2D.moveTo(0,y);
		context2D.lineTo(WIDTH_GAMEBOARD,y);
		context2D.stroke();
	}
	
	drawHUD();
	
	context2D.font = "18px sans-serif";
	
	context2D.strokeText("D", doctor.x, doctor.y);
	
	context2D.strokeRect(0,0,WIDTH_GAMEBOARD,HEIGHT_GAMEBOARD);
	
	console.log('1');
	
	window.requestAnimationFrame(draw);
}

function drawHUD() {

	context2D.fillStyle = 'green';
	for (var i = 0 ; i <= item ; i++) {
		context2D.fillStyle = 'green';
		context2D.fillRect(WIDTH_GAMEBOARD,HEIGHT_HUD-(i*HEIGHT_ITEM),WIDTH_ITEM,HEIGHT_ITEM);
		context2D.fillStyle = 'black';
		context2D.strokeRect(WIDTH_GAMEBOARD,HEIGHT_HUD-(i*HEIGHT_ITEM),WIDTH_ITEM,HEIGHT_ITEM);
	}
	
	context2D.fillStyle = 'black';
	context2D.strokeRect(WIDTH_GAMEBOARD,0,WIDTH_HUD,HEIGHT_HUD);
	
}