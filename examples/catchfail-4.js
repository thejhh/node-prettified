var fs = require('fs');
var errors = require('../src/index.js').errors;
fs.exists('test.txt', errors.catchfail(function(exists) {
	console.log('test.txt ' + (exists ? 'exists' : 'not found') );
}));
