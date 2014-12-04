var md5 = require('./md5');

/* unique key to link both "clients" */
var currentKey;

/* Init the generate Key : first call of md5 */
function initKey() {
	currentKey =  md5.md5(1);
}

/* generate the nextKey with the date and the previous key */
function nextKey() {
	var hashKey = new Date();
	currentKey = md5.md5(currentKey + hashKey.getTime());
}

/* print the current key */
function printCurrentKey() {
	console.log(currentKey);
}

/* return the current key */
function getKey() {
	return currentKey.substring(0,5);
}

module.exports.initKey = initKey;
module.exports.nextKey = nextKey;
module.exports.getKey = getKey;
