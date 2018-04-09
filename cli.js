#!/usr/bin/env node
var fs = require('fs');
var path = require('path');
var readline = require('readline');

var request = require('./templateConfig.json');
var readInput = readline.createInterface(process.stdin, process.stdout);

// Location of the script
var scriptLoc = process.argv[1];
var fileUtils = require('./fileUtils.js'); // reading file utils
var analyzeFile = require('./analyze.js');  // reading analyze utils

// Operation to perform
var operationArg = process.argv[2];

console.log("Current File running => "+scriptLoc);
console.log("Current File templateJson => "+request.temp);
console.log("Current Path => "+ __dirname);

var content = fileUtils.replaceContent("${hel}","hel","peace");
console.log(process.argv[2]+"content=>"+content);

switch (operationArg) {
case "init":
	// git clone https://github.com/javatechy/spring-boot-template.git .
	fileUtils.createDir("/Users/deepak/Desktop/temp");
	fileUtils.createFile("/Users/deepak/Desktop/temp/abc.txt");
	fileUtils.writeDataInFile("/Users/deepak/Desktop/temp/abc.txt","writeDataInFile");

	console.log("[init]setting up project");
	break;
case "analyze":
	console.log("[init]Analyzing ur project"+ process.argv[3]);
	analyzeFile.analyze(process.argv[3]);
	break;

}

readInput.question('Please enter groupId ? ', (answer) => {
	  console.log('groupId => ', answer);
	  readInput.close();
	  });

// To remove
fs.readFile(path.resolve(__dirname, 'bears.txt'), function(err, data) {
	var bears = data.toString().split('\n');
	var bear = bears[Math.floor(Math.random() * bears.length)];
	console.log(bear);
});
