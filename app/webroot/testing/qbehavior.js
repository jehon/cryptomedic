"use strict";

console.warn("testing enabled");
var a = function () {
	var scripts = document.getElementsByTagName('script');
	var scriptUrl = scripts[scripts.length - 1].src;
	var baseUrl = scriptUrl.split("?")[0].split("/");
	baseUrl.pop();
	baseUrl = baseUrl.join("/") + "/";
	console.log(baseUrl);

	var random = "?" + Math.floor(Math.random()*10000000);
	
    function loadCSS(filename) {
        var lnk = document.createElement('link');
        lnk.setAttribute("rel", "stylesheet");
        lnk.setAttribute("type", "text/css");
        lnk.setAttribute("href", filename + random);

        document.getElementsByTagName('head')[0].appendChild(lnk);
	}
	
	function loadJS(filename, cb) {
	    var script = document.createElement( 'script' );
	    script.setAttribute("type", "text/javascript");
	    script.setAttribute("src", filename + random);
	    if(cb) script.onload = script.onreadystatechange = function() {
	    	console.warn("script is ready");
	        var rs = this.readyState;
	        if(rs && rs != 'complete' && rs!='loaded') return;
	        cb.apply(document);
	    };
	    document.getElementsByTagName('head')[0].appendChild(script);
	}
	
	jQuery(function() {
	    //dynamically add CSS to the document head element
	    loadCSS(baseUrl + "qbehavior.css");
	    loadCSS(baseUrl + "qunit.css");

	    var markup = '<h1 id="qunit-header">QUnit Test Suite</h1><h2 id="qunit-banner"></h2>' +
	    	'<div id="qunit-testrunner-toolbar"></div><h2 id="qunit-userAgent"></h2>' +
        	'<ol id="qunit-tests"></ol><div id="qunit-fixture">test markup, will be hidden</div>' +
        	'<script language="javascript">qRun();</script>';
	    var wrapper = document.createElement("div");
	    wrapper.setAttribute("id","qunit-report");
	    wrapper.innerHTML = markup;
	    document.getElementsByTagName("body")[0].appendChild(wrapper);
		loadJS(baseUrl + "/qunit.js", function() {
			QUnit.done(function( details ) {
				  console.log( "Total: ", details.total, " Failed: ", details.failed, " Passed: ", details.passed, " Runtime: ", details.runtime );
			});

			// extending assertions:
			QUnit.assert.contains = function( needle, haystack, message ) {
			  var actual = haystack.indexOf(needle) > -1;
			  QUnit.push(actual, actual, needle, message);
			};

			QUnit.assert.tableCell = function(id, col, value, message) {
				QUnit.push(true, true, value, message);
			};
			
			
			module("System");
			test("Javascript loaded", function() { 
				expect(2);
				ok(true, "That QUnit is loaded");
				ok(typeof(jQuery) != "undefined", "That JQuery is loaded");
			});
			asyncTest("Asynchronous test", function() {
				expect(1);
				setTimeout(function() {
					ok( true, "Test the timeout function and asyncTest" );
					start();
					}, 10);
			});
			module("");
			if (typeof(tests) != "undefined") {
				for (var x=0; x < tests.length;x++){
					loadJS(baseUrl + tests[x]);
				}
			}
	    });

	}); // jQuery() {ready}
}();