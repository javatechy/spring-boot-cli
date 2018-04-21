var http = require('http');
const cTable = require('console.table');
var connect = require('connect');
var serveStatic = require('serve-static');

var config = require('./config.js');

module.exports = {

	// print a content of a file
	print : function(string) {
		console.log(string);
	},

	// print a content of a file
	debug : function(string) {
		if (config.common.isDebugEnabled)
			console.log(string);
	},

	printTable : function(tableContent) {
		console.table(tableContent);
	},

	// Convert into camel case
	toTitleCase : function(str) {
		str = str.toLowerCase().split(' ');
		for (var i = 0; i < str.length; i++) {
			str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
		}
		return str.join(' ');
	},

	// convert bytes into MB/GB/TB
	convertBytes : function(bytes) {
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
	},

	// Run a server on a given port
	runServer : function(htmlContent, port) {
		// run a server
		http.createServer(function(request, response) {
			response.writeHeader(200, {
				"Content-Type" : "text/html"
			});
			response.write(htmlContent);
			response.end();
		}).listen(port);

	},

	runServerDir : function(dirPath, port) {
		connect().use(serveStatic(dirPath)).listen(port, function() {
			console.log('Server running on 8080...');
		});
	}

};
