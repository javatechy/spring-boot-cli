#!/usr/bin/env node
var cu = require('../utils/commonUtils.js');
var fu = require('../utils/fileUtils.js');
var config = require('../utils/config.js');

module.exports = {

	generateApplicationProperties : function(request) {

		var appPropData = fu.readTemplate("application.properties",
				request.properties);

		fu.writeDataInFile(config.project.resourceLoc + "/"
				+ "application.properties", appPropData);

		return request;
	}
};