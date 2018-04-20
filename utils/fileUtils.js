var fs = require("fs");
var pathLib = require("path");

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

	// Read a file Content
	readFileContent : function(filePath) {
		return fs.readFileSync(filePath) + '';
	},

	// Writing data into file
	writeDataInFile : function(path, content) {
		fs.writeFileSync(path, content, 'utf-8');
	},

	// Replace a template string by another string
	replaceContent : function(content, key, value) {
		return content.replace("${" + key + "}", value);
	},

	// Replace a template string by another string
	replace : function(content, key, value) {
		return content.replace("${" + key + "}", value);
	},

	// Get the file size
	getFileSize : function(path) {
		const fileStats = fs.statSync(path);
		return fileStats.size;
	},

	// get file name from path
	getFileName : function(path) {
		return pathLib.basename(path);
	},

	// get file extension
	getFileExtension : function(path) {
		var extName = pathLib.extname(path);
		return extName.replace(".","").toUpperCase();
		
	}
};
