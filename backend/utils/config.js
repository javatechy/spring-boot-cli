// for spring boot project configuration

var project = {
	projectLocation : "/Users/deepak/Desktop/project",
	pomLocation : "template/pom.xml",
	applicationClassLocation : "template/DemoApplication.java",
	controllerClassLocation : "template/TemplateController.java",
	srcMainJavaLoc : "/src/main/java",
	resourceLoc : "/src/main/resources",
	applicationProp : "template/application.properties"
}

var server = {
	frontEndPort : 8100,
	backEndPort : 8900
}

var common = {
	isDebugEnabled : true
	// isDebugEnabled : false
}
// export the courses so other modules can use them
exports.project = project;
exports.server = server;
exports.common = common;