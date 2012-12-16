#!/usr/bin/env node
try {
    var reporter = require('nodeunit').reporters.default;
}
catch(e) {
    console.log("Cannot find nodeunit module.");
    console.log("You can download submodules for this project by doing:");
    console.log("");
    console.log("    npm install -d");
    console.log("");
    process.exit();
}

process.chdir(__dirname);

require('fs').readdir(__dirname, function(err, files) {
	if(err) {
		console.log("Error: " + err);
		return;
	}
	
	var tests = [];
	files.map(function(item) {
		//console.log('Item: ' + item);
		if(item.substr(0, 5) === 'test-') {
			tests.push(item);
		}
	});
	reporter.run(tests);
});

