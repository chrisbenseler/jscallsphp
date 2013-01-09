<?php
require "config.php";
//if MOD_REWRITE is active, try to parse only the required class
if(isset($_GET["param"])) {
	$check = true;
} else {
	$check = false;
}
//echo json_decode($jsCallsPhpClasses);

//foreach($jsCallsPhpClasses as $class) {
	
	$class = json_decode($jsCallsPhpClasses[$_GET["param"]]);

	echo '
	function ' . strtoupper($_GET["param"]) . "() {
		";

		
		foreach($class->methods as $method) {
			$pars = 'class=' . $_GET["param"] . "&method=" . $method . "&methodParameters=\" + JSCALLSPHPJSON.stringify(JSCallsPHP.iter(arguments))";
			echo "
			
			this." . $method . " = function () {
				var args = arguments;
				var url = \"" . $jsCallsPhpInstallPath ."index.php?" . $pars . ";
				JSCallsPHP.requestData(args, url);
			};";
		}	
	
	
	//create a blank method and finish the class
	echo "
	};
	var " . $_GET["param"] . " = new " . strtoupper($_GET["param"]) . "();
	";
	
	
//}
?>