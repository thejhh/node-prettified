var prettified = require('../src/index.js');
try {
	throw new TypeError("Example error");
} catch(err) {
	prettified.errors.print(err);
}
