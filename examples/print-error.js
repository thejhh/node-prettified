var errors = require('../src/index.js').errors;
errors.print("hello");
errors.print(new TypeError("Hello"));
