var doctor = require('./doc');

function Board(doctor) {
  this.width = 10;
  this.height = 10;
  this.doctor = doctor;
  this.listEntity = new Array(this.width);
  for(var i = 0; i < this.width; i++) {
    this.listEntity[i] = new Array(this.height);
  }
}

Board.prototype = {
  init: function() {
    for(var i = 0; i < this.width; i++) {
      for(var j = 0; j < this.height; j++) {
        if(i == this.doctor.x && j == this.doctor.y) {
          this.listEntity[i][j] = 'D'
        } else {
          this.listEntity[i][j] = '0';
        }
      }
    }
  },
  getInitMap: function() {
    var cmdName = 'INITMAP ' + this.width + ' ' + this.height;
    return cmdName
  },
  getCmdMap: function() {
    var cmdName = 'SENDMAP';
    for(var i = 0; i < this.width; i++) {
      for(var j = 0; j < this.height; j++) {
        cmdName += ' ' + this.listEntity[i][j];
      }
    }
    return cmdName
  },
  dropSeringue: function(nbSeringue) {
    var x = Math.floor(Math.random() * this.width);
    var y = Math.floor(Math.random() * this.height);
    while(this.listEntity[x][y] != '0') {
      x = Math.floor(Math.random() * this.width);
      y = Math.floor(Math.random() * this.height);
    }
    this.listEntity[x][y] = nbSeringue;
  },
  addPerson: function() {
    var x = Math.floor(Math.random() * this.width);
    var y = Math.floor(Math.random() * this.height);
    while(this.listEntity[x][y] != '0') {
      x = Math.floor(Math.random() * this.width);
      y = Math.floor(Math.random() * this.height);
    }
    this.listEntity[x][y] = 'S';
  },
  moveDoctor: function(x, y) {
    if(this.doctor.x + x < 0 || this.doctor.x + x >= this.width || this.doctor.y + y < 0 || this.doctor.y + y>= this.height)
      return;
    this.listEntity[this.doctor.x][this.doctor.y] = '0';
    this.doctor.move(x, y);
    if(this.listEntity[this.doctor.x, this.doctor.y] != '0') {
      this.doctor.addSeringue(parseInt(this.listEntity[this.doctor.x, this.doctor.y]));
    } else if(this.listEntity[this.doctor.x, this.doctor.y] == 'S') {
      this.doctor.savePerson();
    }
    this.listEntity[this.doctor.x][this.doctor.y] = 'D';
  }
}

module.exports.Board = Board;
