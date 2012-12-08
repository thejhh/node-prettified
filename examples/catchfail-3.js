var errors = require('../src/index.js').errors;

function test() {
	var defer = require('q').defer();
	setTimeout(errors.catchfail(defer, function() {
		throw new TypeError("Example error");
	}), 200);
	return defer.promise;
}

test().fail(function(err) {
	errors.print(err);
});
