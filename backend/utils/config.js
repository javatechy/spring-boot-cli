// for spring boot project configuration

//var currentLoc = __dirname;
var currentLoc = "/Users/deepak/Desktop/project";

var project = {
	projectLocation : currentLoc,
	pomLocation : "template/pom.xml",
	applicationClassLocation : "template/DemoApplication.java",
	controllerClassLocation : "template/TemplateController.java",
	srcMainJavaLoc : currentLoc + "/src/main/java",
	resourceLoc : currentLoc + "/src/main/resources",
	applicationProp : "template/application.properties",
	javaCodeLoc : ""
}

var server = {
	frontEndPort : 8100,
	backEndPort : 8900
}

var common = {
	isDebugEnabled : true
// isDebugEnabled : false
}

var request = {
	properties : {
		name : '',
		groupId : '',
		artifactId : '',
		description : '',
		applicationClassName : '',
		language : '',
		applicationPort : '',
		developerName : '',
		springVerison : '',
		isConstantFile : false,
		isGlobalExceptionEnabled : false,
		isLombokEnabled : true,
		isActuatorEnabled : true
	},
	jars : [ {
		name : '',
		version : ''
	}

	],
	controllers : [ {
		name : '',
		docsComment : ''
	} ],
	swagger : {
		isEnabled : true,
		apiDocName : '',
		developerEmailId : ''
	},
	database : {
		isDatabaseEnabled : false,
		databaseType : '',
		userName : '',
		password : ''
	},
	entities : [ {
		name : '',
		primaryKey : '',
		fields : [ {
			name : '',
			dbName : '',
			type : '',
			isUnique : false,
			isNullable : true
		} ]

	} ],
	logging : {
		isEnabledLog : true,
		loggingFile : '',
		rotationSize : ''
	},
	deployment : {
		isDockerEnabled : true
	}
}

// export the courses so other modules can use them
exports.project = project;
exports.server = server;
exports.common = common;
exports.request = request;