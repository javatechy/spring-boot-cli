var fs = require("fs");

module.exports = {

	// Creating a file
	createFile : function(path) {
		fs.openSync(path, "w");
	},

	// Creating Directory
	createDir : function(dirPath) {
		if (!fs.existsSync(dirPath)) {
			fs.mkdirSync(dirPath);
		}
	},

	// Writing data into file
	writeDataInFile : function(path, content) {
		fs.writeFileSync(path, content, 'utf-8');
	},

	// Replace a template string by another string
	replaceContent : function(content, key, value) {
		return content.replace("${" + key + "}", value);
	},

	// Get the file size
	getFileSize : function(path) {
		const fileStats = fs.statSync(path);
		console.log("Getting file size" + fileStats.size);
		return fileStats.size;
	}
};
