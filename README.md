jscallsphp
==========

JS Calls PHP allows easy integration between javascript and PHP classes.

A method called my_method from My_Class PHP class can be called in javascript with the following syntax:
<pre>
my_class.my_method(params)
</pre>

How it Works
============

In config.php there is the $jsCallsPhpClasses variable. It stores the list of PHP Classes which are exposed to javascript.

Syntax:
<pre>
$jsCallsPhpClasses['name_used_in_javascript'] = '{
	"path": "[path to the PHP class file]",
	"name": "php_file_class",
	"methods": [array of method names]
}';

//example
$jsCallsPhpClasses['math'] = '{
	"path": "demo/lib",
	"name": "Math",
	"methods": ["add", "mul", "div", "sub"]
}';
</pre>

Than, in your html, call JS Calls PHP's engine and one JSCallsPHP.js.php?param=[] for each PHP exposed class. The param name is the key used in jsCallsPHpClasses.

<pre>
<script type="text/javascript" src="engine.js"></script>
<script type="text/javascript" src="JSCallsPHP.js.php?param=math"></script>
</pre>

In the example, the methods add, mul, div and sub from demo/lib/Math.php class are exposed to javascript. To use, is simples:

<pre>
math.add(10, 10, function(dataFromServer) {
	alert(dataFromServer);
});
</pre>

If Math.add method from PHP expects 2 parameters, in javascript you have to pass 3 parameters. The last parameter is the callback function, that receives the return value from the PHP method.

TODO
====
- Use rewrite from webserver to allow call 'name_used_in_javascript.js' instead of JSCallsPHP.js.php?param=name_used_in_javascript

