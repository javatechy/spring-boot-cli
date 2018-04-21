#!/usr/bin/env node
var path = require("path");
var opn = require('opn');
var path = require("path");
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

var angular = path.resolve(path.join(__dirname, "codegen_ui"));
var cu = require('./utils/commonUtils.js'); // reading common utils

var app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({
	extended : true
})); // support encoded bodies

module.exports = {

	start : function() {

		// Backend Start
		app.post('/project/create', function(req, res) {

			console.log("Recieved Post request" + JSON.stringify(req.body));

			res.setHeader('Content-Type', 'application/json');

			// sending response
			res.send(JSON.stringify({
				status : "sucess"
			}));
		})

		var server = app.listen(8900, function() {
			var host = server.address().address
			var port = server.address().port
			console.log("Example app listening at http://%s:%s", host, port)
		})

		// Backend End

		// Frontend start
		cu.runServerDir(angular, 8100);
		// Frontend End
	},

};