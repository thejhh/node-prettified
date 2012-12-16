/* Conform feature tests */
var testCase = require('nodeunit').testCase;

module.exports = testCase({
	setUp: function (callback) {
		callback();
	},
	tearDown: function (callback) {
		callback();
	},
	/* */
	test_1: function(test){
		var self = this;
		test.expect(1);
		
		var e = new TypeError("Hello World");
		test.strictEqual( JSON.stringify(Object.getOwnPropertyNames( e )), '["type","arguments","stack","message"]');

		test.done();
	}
});

/* EOF */
