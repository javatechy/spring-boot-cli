var http = require('http');
const cTable = require('console.table');

module.exports = {

	// print a content of a file
	print : function(string) {
		// console.log(string);
	},
	
	printTable : function(tableContent) {
		console.table(tableContent);
	},

	// convert bytes into MB/GB/TB
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

	}

};
