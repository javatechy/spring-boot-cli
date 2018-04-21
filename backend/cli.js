#!/usr/bin/env node
var fs = require('fs');
var path = require('path');
var readline = require('readline');

var request = require('./templateConfig.json');

// Location of the script
var scriptLoc = process.argv[1];
var fileUtils = require('./utils/fileUtils.js'); // reading file utils
var analyzeFile = require('./analyze.js');  // reading analyze utils
var intializerFile = require('./initialzer.js');  // reading analyze utils

// Operation to perform
var operationArg = process.argv[2];

switch (operationArg) {
case "init":
	intializerFile.start();
	console.log("[init]setting up project");
	break;
case "analyze":
case "-a":
	console.log("\n\n Analyzing ...  \n ");
	analyzeFile.analyze(process.argv[3]);
	break;

}