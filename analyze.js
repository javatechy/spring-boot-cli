#!/usr/bin/env node
var fs = require("fs");
var sys = require('util')
var exec = require('child_process').execSync;
var http = require('http');
const cTable = require('console.table');

module.exports = {

	analyze : function(loc) {

		const fileStats = fs.statSync(loc);
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
		var output = exec(command).toString();
		var lines = output.split('\n');
		var jars = [];
		var totalJarSize = 0;
		for (var i = 0; i < lines.length; i++) {
			var myArray = lines[i].split(" ");
			var jarSize = new Object();
			totalJarSize = +totalJarSize + +myArray[0];
			jarSize.size = this.getBytesWithUnit(myArray[0]);
			jarSize.sizeInBytes = myArray[0];
			jarSize.name = myArray[1];
			jars.push(jarSize);
			console.log(totalJarSize);
		}
		// sort jar list in decreasing order
		jars = jars.sort(function(one, two) {
			return two.sizeInBytes - one.sizeInBytes;
		});

		console.table(jars);
		// console.log(" jars - > " + JSON.stringify(jars));// , null, 4));
		console.log("Total no of jars " + jars.length);

		var html = fs.readFileSync('./index.html') + '';

		var data = '';

		for (var i = 0; i < jars.length; i++) {
			data += "<tr><td>" + jars[i].name + "</td><td>" + jars[i].size
					+ "</td><td>" + jars[i].sizeInBytes + "</td></tr>";
		}

		html = html.replace('${data}', data);
		html = html.replace('${total_jars}', jars.length);
		html = html.replace('${total_jar_size}', this
				.getBytesWithUnit(totalJarSize));
		html = html.replace('${build_name}', loc);
		html = html.replace('${build_original_size}', this
				.getBytesWithUnit(fileStats.size));

		http.createServer(function(request, response) {
			response.writeHeader(200, {
				"Content-Type" : "text/html"
			});
			response.write(html);
			response.end();
		}).listen(8000);
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