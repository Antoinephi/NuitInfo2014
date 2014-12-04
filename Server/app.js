var express = require('express');
var fs = require('fs');
var path = require('path');

var app = express();
var dirPath = path.join(__dirname, '../client/');

app.use(express.static(dirPath));

app.listen(8080, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');
