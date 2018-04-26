#!/usr/bin/env node
var path = require("path");
var opn = require('opn');
var path = require("path");
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();

var cu = require('./utils/commonUtils.js'); // reading common utils
var config = require('./utils/config.js'); // reading common utils

var application_property = require('./code_generator/application_properties.js'); 
var create_main_class = require('./code_generator/create_main_class.js');
var create_pom = require('./code_generator/create_pom.js');
var database_dtos = require('./code_generator/database_dtos.js');
var gen_controllers = require('./code_generator/gen_controllers.js');
var generate_empty_project = require('./code_generator/generate_empty_project.js');
var setup_project = require('./code_generator/setup_project.js');
	
var angular = path.resolve(path.join(__dirname, "codegen_ui"));


module.exports = {

	start : function() {
		
		this.intitalizeBackendServer();
		
		app.post('/project/create', function(req, res) {
			
			cu.debug('json -----> '  +  JSON.stringify(req.body));
			body = generate_empty_project.setupFolderStucture(req.body);
			body = generate_empty_project.createMainApplication(req.body);
			body = create_pom.createPom(req.body);
			body =  application_property.generateApplicationProperties(req.body);
			
			console.log("Recieved Post request" + JSON.stringify(body));		
			
			res.setHeader('Content-Type', 'application/json');

			res.send(config.project);
		})

		 this.intitalizeFrontEndServer();
		
	},
	
	// initialize Backend Server
	intitalizeBackendServer : function() {
		
		app.use(bodyParser.json());
		app.use(cors());
		app.use(bodyParser.urlencoded({
			extended : true
		})); // support encoded bodies
		app.use(express.static('files'))

		var server = app.listen(config.server.backEndPort, function() {
			
			var host = server.address().address
			var port = server.address().port
			console.log("Backend app listening at "+ port)

		})

	},
	
	// initialize FrontEnd Server
	intitalizeFrontEndServer : function() {
		 cu.runServerDir(angular, config.server.frontEndPort);
	}

};