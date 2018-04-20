#!/usr/bin/env node
var exec = require('child_process').execSync;
var path = require("path");
var fu = require('./utils/fileUtils.js'); // reading file utils
var cu = require('./utils/commonUtils.js'); // reading common utils
var currentExecutingPath = process.cwd();
var htmlPath = path.resolve(path.join(__dirname, "ui_html",
		"build_analysis_template.html"));
var opn = require('opn');

module.exports = {

	analyze : function(loc) {

		cu.debug("Ananlyzing the  jar file => " + loc);

		if (loc.indexOf(currentExecutingPath) >= 0) {
			cu.debug("Not an absolute path");
		} else {
			cu.debug("Not an absolute path");
			loc = currentExecutingPath + "/" + loc
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
			var jar = new Object();
			totalJarSize = +totalJarSize + +myArray[0];
			jar.size = cu.convertBytes(myArray[0]);
			jar.sizeInBytes = myArray[0];
			jar.name = myArray[1];
			jar.version = this.findJarVer(myArray[1]);
			if (jar.name != undefined)
				jars.push(jar);
		}

		// sort jar list in decreasing order
		jars = jars.sort(function(one, two) {
			return two.sizeInBytes - one.sizeInBytes;
		});

		cu.printTable(jars);

		// console.log(" jars - > " + JSON.stringify(jars));// , null, 4));
		console.log("Total no of jars " + jars.length);

		var html = fu.readFileContent(htmlPath);

		var data = '';

		for (var i = 0; i < jars.length; i++) {
			data += "<tr><td>" + jars[i].name + "</td><td>" + jars[i].version
					+ "</td><td>" + jars[i].sizeInBytes + "</td><td>"
					+ jars[i].size + "</td></tr>";
		}

		html = fu.replace(html, 'data', data);
		html = fu.replace(html, 'total_jars', jars.length);
		html = fu
				.replace(html, 'total_jar_size', cu.convertBytes(totalJarSize));
		html = fu.replace(html, 'build_name', fu.getFileName(loc));
		html = fu.replace(html, 'build_type', fu.getFileExtension(loc));

		html = fu.replace(html, 'build_original_size', cu.convertBytes(fu
				.getFileSize(loc)));

		cu.debug("Current Path => " + __dirname + "  ..... " + " .. "
				+ currentExecutingPath);
		cu.debug("Current LOC => " + loc);
		cu.runServer(html, 2000);
		console.log("Server is running on port 2000 ....");
		opn('http://localhost:2000');
	},

	findJarVer : function(str) {
		str = str + '';
		str = str.substring(str.lastIndexOf("-") + 1, str.lastIndexOf(".jar"));
		return str;
	}

};