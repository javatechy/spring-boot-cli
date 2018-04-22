#!/usr/bin/env node
var cu = require('../utils/commonUtils.js');
var fu = require('../utils/fileUtils.js');
var config = require('../utils/config.js');

module.exports = {

	setupFolderStucture : function(request) {

		config.project.javaCodeLoc = this.getJavaCodeLoc(request);

		fu.createDir(config.project.srcMainJavaLoc);
		fu.createDir(config.project.resourceLoc);
		fu.createDir(config.project.javaCodeLoc);
		fu.createDir(config.project.javaCodeLoc + "/service/impl");
		fu.createDir(config.project.javaCodeLoc + "/controller");
		fu.createDir(config.project.javaCodeLoc + "/exception");
		fu.createDir(config.project.javaCodeLoc + "/dao");
		fu.createDir(config.project.javaCodeLoc + "/entity");

		cu.debug("After changing applicaiton name --> "
				+ fu.readTemplate("DemoApplication.java"));

		return request;
	},

	createMainApplication : function(request) {
		cu.debug("Debug mode ");

		var applicationName = cu.toCamelCase(request.properties.groupId)
				+ "Application";

		cu.debug("Debug applicationName " + applicationName);

		config.project.applicationName = applicationName;

		cu.debug("After changing applicaiton name "
				+ JSON.stringify(config.project));
		return request;
	},

	getJavaCodeLoc : function(request) {
		return (config.project.srcMainJavaLoc + "/"
				+ request.properties.artifactId + "/" + request.properties.groupId)
				.replace(".", "/");
	}

};