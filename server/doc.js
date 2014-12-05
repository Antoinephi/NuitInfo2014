function Doc() {
  this.nbSeringue = 0;
  this.x = 5;
  this.y = 5;
  this.score = 0;
}

Doc.prototype = {
  addSeringue: function(nbSeringue) {
    this.nbSeringue += nbSeringue;
  },
  useSeringue: function() {
    this.nbSeringue--;
  },
  move: function(x, y) {
    this.x += x;
    this.y += y;
  },
  savePerson: function() {
    this.useSeringue();
    this.score++;
  },
  getCmdDoc: function() {
    var cmdName = 'SENDDOC ' + this.nbSeringue + ' ' + this.score;
    return cmdName;
  }
}

module.exports.Doc = Doc;
