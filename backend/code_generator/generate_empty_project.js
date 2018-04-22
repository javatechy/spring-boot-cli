#!/usr/bin/env node
var cu = require('../utils/commonUtils.js');
var fu = require('../utils/fileUtils.js');
var config = require('../utils/config.js');

module.exports = {

	/**
	 * Setup basic file structure.
	 */
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
		return request;
	},

	/**
	 * Create MainApplication.java in src/main/java/group/artifact
	 */
	createMainApplication : function(request) {
		var applicationClassName = cu.toCamelCase(request.properties.groupId)
				+ "Application";
		request.properties.applicationClassName = applicationClassName;
		cu.debug("After changing applicaiton name --> "
				+ fu.readTemplate("DemoApplication.java", request.properties));

		var mainFileContent = fu.readTemplate("DemoApplication.java",
				request.properties);

		fu.writeDataInFile(config.project.javaCodeLoc + "/"
				+ request.properties.applicationClassName + ".java",
				mainFileContent);
		return request;
	},

	/**
	 * find java code location
	 */
	getJavaCodeLoc : function(request) {
		return (config.project.srcMainJavaLoc + "/"
				+ request.properties.artifactId + "/" + request.properties.groupId)
				.replace(".", "/");
	}

};