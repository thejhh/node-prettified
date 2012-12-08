Prettified error handling for Node.js
=====================================

Installing
----------

  npm install prettified

Pretty printing exceptions
--------------------------

This sample code:

	var errors = require('prettified').errors;
	try {
		throw new Error("Example error");
	} catch(err) {
		errors.print(err);
	}

...will print errors using console.error() like this:

	/---------------------------------- Error -----------------------------------\
	| Error: Example error
	+---------------------------------- stack -----------------------------------+
	|     at Object.<anonymous> (/home/jhh/git/node-prettified/examples/format.js:3:8)
	|     at Module._compile (module.js:449:26)
	|     at Object.Module._extensions..js (module.js:467:10)
	|     at Module.load (module.js:356:32)
	|     at Function.Module._load (module.js:312:12)
	|     at Module.runMain (module.js:492:10)
	|     at process.startup.processNextTick.process._tickCallback (node.js:244:9)
	\----------------------------------------------------------------------------/

Setting default error type
--------------------------

You can set default error type for uncatched errors like this:

	errors.setDefaultError(MySystemError);

Catch errors inside callbacks
-----------------------------

The `errors.catchfail([opts, ]callback)` is a wrapper builder to catch 
exceptions inside function call.

It returns a function which when invoked calls the `callback` and 
passes all original arguments and returns the value untouched. 

If exceptions are thrown it will catch them and print them using 
`console.error()` or by using a handler specified in `opts`. Handlers 
can be functions or Promise A defers (see 
[q](http://documentup.com/kriskowal/q/)).

For example you can use it to catch errors inside a callback:

	setTimeout(errors.catchfail(function() {
		throw new TypeError("Example error");
	}), 200);

If you like to handle the error you can pass an error handler as a 
first argument:

	function do_error(err) {
		errors.print(err);
	}
	setTimeout(errors.catchfail(do_error, function() {
		throw new TypeError("Example error");
	}), 200);

If you use defers from q you can 
