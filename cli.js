#!/usr/bin/env node
var fs = require('fs');
var path = require('path');
var readline = require('readline');
var readInput = readline.createInterface(process.stdin, process.stdout);

// Location of the script
var scriptLoc = process.argv[1];
// reading file utils
var fileUtils = require('./fileUtils.js');
// Operation to perform
var operationArg = process.argv[2];

// git clone https://github.com/javatechy/spring-boot-template.git .
fileUtils.foo();
console.log(process.argv[2]);

switch (operationArg) {
case "init":
	console.log("[init]setting up project");
	break;
}

readInput.question('Please enter groupId? ', (answer) => {
	  console.log('groupId => ', answer);
	  readInput.close();
	  });

// To remove
fs.readFile(path.resolve(__dirname, 'bears.txt'), function(err, data) {
	var bears = data.toString().split('\n');
	var bear = bears[Math.floor(Math.random() * bears.length)];
	console.log(bear);
});
