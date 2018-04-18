# Analysis of build
A CLI tool to setup Spring boot project and analyze builds (jars/wars)

Installation Steps
------------------
* npm install -g sboot 

```
npm install -g sboot
```

* To analyze an application run this command:

```
sboot -a my-test.jar
	  OR
sboot -a my-test.war
```
This will open analysis of all your jars that are used in your project with version  and size details in tabular form.

**Features:**
 
* Tabular representation of the jars used in the project.
* Sorting in table
* Searching
* Jar information is also printed in prompt

Sample Screenshot (Browser):

![Alt text](/screenshots/sboot_build_analysis.png?raw=true "Browser Screenshot")


Sample Screenshot (CLI):

![Alt text](/screenshots/sboot_build_analysis_cli_1.png?raw=true "CLI Screenshot - 1")

![Alt text](/screenshots/sboot_build_analysis_cli_2.png?raw=true "CLI Screenshot - 2")
 



