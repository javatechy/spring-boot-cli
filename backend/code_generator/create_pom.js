#!/usr/bin/env node
var cu = require('../utils/commonUtils.js');
var fu = require('../utils/fileUtils.js');
var config = require('../utils/config.js');

module.exports = {

	createPom : function(request) {

		var pomXmlData = fu.readTemplate("pom.xml", request.properties);

		fu.writeDataInFile(config.project.projectLocation + "/" + "pom.xml",
				pomXmlData);

		return request;
	}
};