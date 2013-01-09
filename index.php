<?php
require "config.php";
/* check if class has been passed */
if(isset($_GET["class"])==false)
	die("No class defined");


/* instanciate object from the specified class */
$myClass = $_GET["class"];

$loadingClass = json_decode($jsCallsPhpClasses[$myClass]);

if(isset($loadingClass)==false)
	die("Class " . $myClass . " not exposed");

;
$path = $loadingClass->path . "/" . $loadingClass->name . ".php";
require ($path);
$class = new $loadingClass->name;
/* get the method name */
$method = $_GET["method"];

/*Converts data decoded by PHP's json_decode() into an Array */
function json_code ($json) { 
  $json = substr($json, strpos($json,'{')+1, strlen($json));
  $json = substr($json, 0, strrpos($json,'}'));
  $json = preg_replace('/(^|,)([\\s\\t]*)([^:]*) (([\\s\\t]*)):(([\\s\\t]*))/s', '$1"$3"$4:', trim($json));

  return json_decode('{'.$json.'}', true);
}  
$tmp =  urldecode($_GET["methodParameters"]);


//Converts the parameters list from JSON into an Array
$json = $_GET["methodParameters"];
$json = preg_replace('/\\\"/i','"',$json);

//call the method from the specified object, with the specified parameters
echo json_encode(call_user_func_array(array(&$class,$method), json_decode($json)));
?>