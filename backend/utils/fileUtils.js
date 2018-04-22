var fs = require("fs");
var pathLib = require("path");

module.exports = {

	// Creating a file
	createFile : function(path) {
		fs.openSync(path, "w");
	},

	// Creating Directory
	createDir : function(dirPath) {
		console.log("\n\nCreating dir " +  dirPath);
		dirPath = pathLib.normalize(dirPath).split(pathLib.sep);
		dirPath.forEach((sdir,index)=>{
	        var pathInQuestion = dirPath.slice(0,index+1).join(pathLib.sep);
	        if((!this.isDir(pathInQuestion)) && pathInQuestion) fs.mkdirSync(pathInQuestion);
	    });

	},
	
	isDir : function(dpath) {
	    try {
	        return fs.lstatSync(dpath).isDirectory();
	    } catch(e) {
	        return false;
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
		key = "${" + key + "}";
	    while(content.indexOf(key) != -1) {
	    	content = content.replace(key, value);
	    }
	    return content;
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
		return extName.replace(".", "").toUpperCase();

	},

	// replace json key value in content
	replaceFromJson : function(content, obj) {
		for ( var key in obj) {
			if (obj.hasOwnProperty(key)) {
				var property = obj[key];
				content = this.replace(content, key , property);
			}
		}
		return content;
	},
	
	// Read a file Content and replace all dynamic param from it.
	readTemplate : function(fileName,obj) {
		var fileCont = pathLib.resolve(pathLib.join("./templates",
		fileName));
		return this.replaceFromJson(fs.readFileSync(fileCont) + '', obj);
	}

};
