<?php
/*
Config file for JSCallsPHP
For each class you want to expose in javascript, you should add an item to jsCallsPhpClasses. The key is the name used javascript
Each item is an json with:
path: path of the file in the fileSystem
name: name of the PHP file
[methods]: list of methods
*/


$jsCallsPhpClasses['math'] = '{
	"path": "demo/lib",
	"name": "Math",
	"methods": ["add", "mul", "div", "sub"]
}';

/*Root path*/
$jsCallsPhpInstallPath = "/";
			 
/* Environment Variables */
$debugMode = true;

?>
