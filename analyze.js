#!/usr/bin/env node
var fs = require("fs");
var sys = require('util')
var exec = require('child_process').execSync;

function puts(error, stdout, stderr) {
	sys.puts(stdout)
	return stdout;
}

module.exports = {

	analyze : function(loc) {

		console.log("Ananlyzing the  jar file => " + loc);

		var command = "jar tvf "
				+ loc
				+ " | grep '\.jar' | grep 'lib' | sed 's/|/ /' | awk '{print $1, $8}' | awk '{gsub(\"BOOT-INF\/lib\/\", \"\");print}'";
		if (loc.endsWith(".war")) {
			command = "jar tvf "
					+ loc
					+ " | grep '\.jar' | grep 'lib' | sed 's/|/ /' | awk '{print $1, $8}' | awk '{gsub(\"WEB-INF\/lib\/\", \"\");print}'"
		}

		// Execute the command to find all jars
		var output = exec(command) + '';
		var lines = output.split('\n');
		var jars = [];
		// create object array of jars
		for (var i = 0; i < lines.length; i++) {
			var myArray = lines[i].split(" ");
			var jarSize = new Object();
			jarSize.size = this.getBytesWithUnit(myArray[0]);
			jarSize.sizeInBytes = myArray[0];
			jarSize.name = myArray[1];
			jars.push(jarSize);
		}

		jars = jars.sort(function(one, two) {
			return two.sizeInBytes - one.sizeInBytes;
		});
		console.log(" jars - > " + JSON.stringify(jars, null, 4));
		console.log("Total no of jars " + jars.length);
	},

	getBytesWithUnit : function(bytes) {
		if (isNaN(bytes)) {
			return;
		}
		var units = [ ' bytes', ' KB', ' MB', ' GB', ' TB', ' PB', ' EB',
				' ZB', ' YB' ];
		var amountOf2s = Math.floor(Math.log(+bytes) / Math.log(2));
		if (amountOf2s < 1) {
			amountOf2s = 0;
		}
		var i = Math.floor(amountOf2s / 10);
		bytes = +bytes / Math.pow(2, 10 * i);

		// Rounds to 3 decimals places.
		if (bytes.toString().length > bytes.toFixed(3).toString().length) {
			bytes = bytes.toFixed(3);
		}
		return bytes + units[i];
	}
};