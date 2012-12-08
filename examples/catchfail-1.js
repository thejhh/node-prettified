var errors = require('../src/index.js').errors;
setTimeout(errors.catchfail(function() {
	throw new TypeError("Example error");
}), 200);
