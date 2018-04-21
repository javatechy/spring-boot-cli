#!/usr/bin/env node
var path = require("path");
var opn = require('opn');

var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended : true
})); // support encoded bodies

module.exports = {

	start : function() {

		app.get('/', function(req, res) {
			res.send('Backend Server has started');
		})

		app.post('/mytest', function(req, res) {

			console.log("Got a POST request for the homepage"
					+ JSON.stringify(req.body));

			res.setHeader('Content-Type', 'application/json');

			res.send(JSON.stringify({
				a : 1
			}));
		})

		var server = app.listen(8900, function() {
			var host = server.address().address
			var port = server.address().port
			console.log("Example app listening at http://%s:%s", host, port)
		})

	},

};