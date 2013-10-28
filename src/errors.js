/** Prettified Error Management */

var util = require('util');
var line_width = 78;
var line_buffer = new Array(line_width).join("-");
var default_error_type = Error;
var errors = module.exports = {};

/** Set default error type */
errors.setDefaultError = function(type) {
	if(type && (type instanceof Function)) {
		default_error_type = type;
	}
};

/** Pretty print error messages */
errors.print = function(info, err, print_func) {

	print_func = ((typeof print_func === "function") && print_func) || console.error.bind(console);

	function format_line(text, buf) {
		var rows = buf.split("\n");
		return ""+text + rows.join('\n'+text);
	}
	if(err === undefined) {
		err = info;
		info = '';
	}
	var info = info || 'Error';
	var err_str = '' + err;
	var err_str_rows = err_str.split('\n');
	var width = Math.floor((line_width - 4 - info.length) / 2);
	var title = '/' + line_buffer.substr(0, width) + ' ' + info + ' ' + line_buffer.substr(0, line_width - info.length - width - 4) + '\\';
	print_func('\n' + title);
	print_func(format_line("| ", err_str));
	//['stack', 'arguments', 'type', 'message']
	if(typeof err === 'object') {
		Object.getOwnPropertyNames(err).map(function(key) {
			var i;
			if(!err[key]) return;
			if( (key === 'message') && err_str.match(err[key]) ) return;
			var w2 = Math.floor((line_width - 4 - key.length) / 2);
			print_func('+' + line_buffer.substr(0, w2) + ' ' + key + ' ' + line_buffer.substr(0, line_width - w2 - key.length - 4) + '+');
			var rows = (err[key]!==undefined) ? (''+err[key]).split("\n") : [];
			if(rows.length === 1) {
				print_func('| ' + rows.shift());
				return;
			}
			if(key === 'stack') {
				i = 0;
				while( (''+err_str_rows[i]).trim() === (''+rows[0]).trim()) {
					rows.shift();
					i += 1;
				}
			}
			print_func('| ' + rows.join('\n| ') );
		});
	}
	print_func('\\' + line_buffer.substr(0, line_width - 2) + '/\n');
};

/* Check if value is function */
function is_object(o) {
	return ( o && (('object' === typeof o) || (o instanceof Object)) ) ? true : false;
}

function is_function(f) {
	return ( f && (('function' === typeof f) || (f instanceof Function)) ) ? true : false;
}

function is_defer(o) {
	return (is_object(o) && is_function(o.reject) && is_function(o.resolve) ) ? true : false;
}

/* Failsave try-catch for errors */
errors.catchfail = function(opts, block) {
	var f, error_callback, error_type;
	if(is_function(opts) && (block === undefined) ) {
		block = opts;
		opts = {};
	} else if(is_function(opts)) {
		opts = {'errors':opts};
	} else if(is_defer(opts)) {
		opts = {'defer':opts};
	}
	
	opts = opts || {};
	if(is_defer(opts.defer)) {
		error_callback = function(err) {
			return opts.defer.reject(err);
		};
	}
	if(is_function(opts.errors)) {
		error_callback = opts.errors;
	}
	if(!is_function(error_callback)) {
		error_callback = function(err) {
			errors.print('Uncatched Exception', err);
		};
	}
	error_type = opts.type || default_error_type;
	f = function() {
		var self = this;
		var args = Array.prototype.slice.call(arguments, 0, arguments.length);
		//console.error('errors.js: DEBUG: arguments.length = ' + arguments.length);
		//console.error('errors.js: DEBUG: args = [' + args.join(', ') + ']');
		try {
			return block.apply(self, args);
		} catch(err) {
			return error_callback(err);
		}
	};
	return f;
};

/* EOF */
