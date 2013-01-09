var JSCallsPHPProxy = function() {
    function callCallbackFunctionIfPassed(args, data) {
    
        //is last args is a function, call it. The others are passed as parameter back to the callback function
        if(args.length>=1) {
            var func = args[args.length-1];
            if(typeof(func)=="function") {
                
                func.call(this, data);
            }
        }
    }

    function errorHandler(e) {
        alert(e);
    }

    this.requestData = function(args, url) {
        
        xmlhttp.open("get", url);
            xmlhttp.send(null);
            
            xmlhttp.onreadystatechange = function() {
                    if(xmlhttp.readyState==4) {
                        if(xmlhttp.status==404) {
                            errorHandler("Check your config.php file; Installation path is not filled properly");   
                        }
                        callCallbackFunctionIfPassed(args, evalJSON(xmlhttp.responseText));
                }
            }
    }

    function toJSCALLSPHPJSON(object) {
        for(var i=0; i<object.length; i++) {
            //alert(typeof(object[i])); 
            var type = typeof object[i];
            switch (type) {
              case 'undefined':
              case 'function':
              case 'unknown': return;
              case 'boolean': return object[i].toString();
            }
            if (object[i] === null) return 'null';
            if (toJSON(object[i])) return toJSON(object[i]);
            if (Object.isElement(object[i])) return;
            var results = [];
            for (var property in object[i]) {
                var value = Object.toJSON(object[i][property]);
                if (!Object.isUndefined(value))
                    results.push(property.toJSON() + ': ' + value);
            }
            
        
            return '{' + results.join(', ') + '}';
        
        }
    }

    this.iter = function(iterable) {
      if (!iterable) return [];
      //if (iterable.toArray) return iterable.toArray();
      var length = iterable.length || 0, results = new Array(length);
      while (length--) results[length] = iterable[length];
        
      return results;
    }

    var xmlhttp;
    try { 
        xmlhttp = new ActiveXObject("Msxml2.XMLHTTP"); 
    } catch (e) { 
        try { 
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP"); 
        } catch (E) { 
            xmlhttp = false; 
        } 
    } 

    if  (!xmlhttp && typeof  XMLHttpRequest != 'undefined' ) { 
        try  { 
            xmlhttp = new  XMLHttpRequest(); 
        } catch  (e) { 
            xmlhttp = false ; 
        } 
    } 

    /**
    * Eval no valor em JSON
    */
    function evalJSON (sanitize) {
        try {
         if (sanitize) return eval('(' + sanitize + ')');
        } catch (e) {throw e; }
        
    }
};
var JSCallsPHP = new JSCallsPHPProxy();

/*
    http://www.JSON.org/json2.js
    2008-11-19
    Public Domain.
*/

if (!this.JSCALLSPHPJSON) {
    JSCALLSPHPJSON = {};
}
(function () {

    function f(n) {
        // Format integers to have at least two digits.
        return n < 10 ? '0' + n : n;
    }

    if (typeof Date.prototype.toJSON !== 'function') {

        Date.prototype.toJSON = function (key) {

            return this.getUTCFullYear()   + '-' +
                 f(this.getUTCMonth() + 1) + '-' +
                 f(this.getUTCDate())      + 'T' +
                 f(this.getUTCHours())     + ':' +
                 f(this.getUTCMinutes())   + ':' +
                 f(this.getUTCSeconds())   + 'Z';
        };

        String.prototype.toJSON =
        Number.prototype.toJSON =
        Boolean.prototype.toJSON = function (key) {
            return this.valueOf();
        };
    }

    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        gap,
        indent,
        meta = {    // table of character substitutions
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"' : '\\"',
            '\\': '\\\\'
        },
        rep;


    function quote(string) {
        escapable.lastIndex = 0;
        return escapable.test(string) ?
            '"' + string.replace(escapable, function (a) {
                var c = meta[a];
                return typeof c === 'string' ? c :
                    '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
            }) + '"' :
            '"' + string + '"';
    }


    function str(key, holder) {


        var i,          // The loop counter.
            k,          // The member key.
            v,          // The member value.
            length,
            mind = gap,
            partial,
            value = holder[key];


        if (value && typeof value === 'object' &&
                typeof value.toJSCALLSPHPJSON === 'function') {
            value = value.toJSCALLSPHPJSON(key);
        }


        if (typeof rep === 'function') {
            value = rep.call(holder, key, value);
        }

        switch (typeof value) {
        case 'string':
            return '"'  + value + '"';

        case 'number':

            return isFinite(value) ? String(value) : 'null';

        case 'boolean':
        case 'null':

        return String(value);
        case 'object':

            if (!value) {
                return 'null';
            }
            gap += indent;
            partial = [];
            if (Object.prototype.toString.apply(value) === '[object Array]') {

                length = value.length;
                for (i = 0; i < length; i += 1) {
                    partial[i] = str(i, value) || 'null';
                }

                v = partial.length === 0 ? '[]' :
                    gap ? '[\n' + gap +
                            partial.join(',\n' + gap) + '\n' +
                                mind + ']' :
                          '[' + partial.join(',') + ']';
                gap = mind;
                return v;
            }

            if (rep && typeof rep === 'object') {
                length = rep.length;
                for (i = 0; i < length; i += 1) {
                    k = rep[i];
                    if (typeof k === 'string') {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            } else {

               for (k in value) {
                    if (Object.hasOwnProperty.call(value, k)) {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            }


            v = partial.length === 0 ? '{}' :
                gap ? '{\n' + gap + partial.join(',\n' + gap) + '\n' +
                        mind + '}' : '{' + partial.join(',') + '}';
            gap = mind;
            return v;
        }
    }

    if (typeof JSCALLSPHPJSON.stringify != 'function') {
        JSCALLSPHPJSON.stringify = function (value, replacer, space) {
			

            var i;
            gap = '';
            indent = '';


            if (typeof space === 'number') {
                for (i = 0; i < space; i += 1) {
                    indent += ' ';
                }


            } else if (typeof space === 'string') {
                indent = space;
            }


            rep = replacer;
            if (replacer && typeof replacer !== 'function' &&
                    (typeof replacer !== 'object' ||
                     typeof replacer.length !== 'number')) {
                throw new Error('JSCALLSPHPJSON.stringify');
            }
			
            return str('', {'': value});
        };
    }




    if (typeof JSCALLSPHPJSON.parse !== 'function') {
        JSCALLSPHPJSON.parse = function (text, reviver) {



            var j;

            function walk(holder, key) {



                var k, v, value = holder[key];
                if (value && typeof value === 'object') {
                    for (k in value) {
                        if (Object.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }




            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function (a) {
                    return '\\u' +
                        ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                });
            }



            if (/^[\],:{}\s]*$/.
test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@').
replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
              j = eval('(' + text + ')');

              return typeof reviver === 'function' ?
                    walk({'': j}, '') : j;
            }

// If the text is not JSON parseable, then a SyntaxError is thrown.

            throw new SyntaxError('JSCALLSPHPJSON.parse');
        };
    }
})();
