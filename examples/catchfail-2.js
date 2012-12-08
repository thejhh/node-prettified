var errors = require('../src/index.js').errors;
function do_error(err) {
	errors.print(err);
}
setTimeout(errors.catchfail(do_error, function() {
	throw new TypeError("Example error");
}), 200);
