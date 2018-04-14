#!/usr/bin/env node
var fs = require("fs");
var sys = require('util')
var exec = require('child_process').execSync;
var path = require("path");
var fileUtils = require('./fileUtils.js'); // reading file utils
var common = require('./commonUtils.js'); // reading file utils
var currentExecutingPath = process.cwd();
var htmlPath = path.resolve(path.join(__dirname, "ui_html",
		"analyze_template.html"));

module.exports = {

	analyze : function(loc) {
		var currentDir = exec("pwd").toString();
		console.log("Ananlyzing the  jar file => " + loc);

		if (loc.indexOf(currentExecutingPath) >= 0) {
			common.print("Not an absolute path");
		}else{
			common.print("Not an absolute path");
			loc = currentExecutingPath+ "/"+ loc
		}

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
			jarSize.size = common.getBytesWithUnit(myArray[0]);
			jarSize.sizeInBytes = myArray[0];
			jarSize.name = myArray[1];
			jars.push(jarSize);
		}

		// sort jar list in decreasing order
		jars = jars.sort(function(one, two) {
			return two.sizeInBytes - one.sizeInBytes;
		});

		common.printTable(jars);

		// console.log(" jars - > " + JSON.stringify(jars));// , null, 4));
		console.log("Total no of jars " + jars.length);

		var html = fs.readFileSync(htmlPath) + '';

		var data = '';

		for (var i = 0; i < jars.length; i++) {
			if (jars[i].name != undefined)
				data += "<tr><td>" + jars[i].name + "</td><td>" + jars[i].size
						+ "</td><td>" + jars[i].sizeInBytes + "</td></tr>";
		}

		html = html.replace('${data}', data);
		html = html.replace('${total_jars}', jars.length);
		html = html.replace('${total_jar_size}', common
				.getBytesWithUnit(totalJarSize));
		html = html.replace('${build_name}', loc);
		html = html.replace('${build_original_size}', common
				.getBytesWithUnit(fileUtils.getFileSize(loc)));

		console.log("Current Path => " + __dirname + "  ..... " + currentDir
				+ " .. " + currentExecutingPath);
		console.log("Current LOC => " + loc);
		

				common.runServer(html, 1234);
		console.log("Server is running on port 1234 ....");
	}
};