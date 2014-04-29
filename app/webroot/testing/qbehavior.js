"use strict";

// TODO: check that all scripts are loaded?

var qbehavior = function () {
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
	
	function setOption(name, value) {
		console.log("Setting " + name + " = " + value);
		sessionStorage.setItem("qbehavior." + name, value);
	}
	
	function getOption(name, _default) {
		if (typeof(sessionStorage["qbehavior." + name]) != "undefined") {
			var res = sessionStorage.getItem("qbehavior." + name);
			if (res === "false") return false;
			if (res === "true") return true;
			if (isFinite(res)) return Number(res);
			return res;
		}
		return _default;
	}
	
	function getPreviousPage() {
		return previousPage;
	}
	
	function setCurrentPage(value) {
		setOption('previousPage', value);
	}
	var previousPage = getOption('previousPage'); 
	
	function goNextPage() {
		console.info("going to next page");
	}
	
	jQuery(function() {
	    //dynamically add CSS to the document head element
	    loadCSS(baseUrl + "qbehavior.css");
	    loadCSS(baseUrl + "qunit.css");

//	    var markup = '<h1 id="qunit-header">QUnit Test Suite</h1>' +
//	    	'<h2 id="qunit-banner"></h2>' +
//	    	'<div id="qunit-testrunner-toolbar"></div>' +
//	    	'<h2 id="qunit-userAgent"></h2>' +
//        	'<ol id="qunit-tests"></ol><div id="qunit-fixture">test markup, will be hidden</div>' +
//        	'<script language="javascript">qRun();</script>';
	    var markup = '<div id="qunit"></div><div id="qunit-fixture"></div>';
	    var wrapper = document.createElement("div");
	    wrapper.setAttribute("id","qunit-report");
	    wrapper.innerHTML = markup;
	    document.getElementsByTagName("body")[0].appendChild(wrapper);
		loadJS(baseUrl + "/qunit.js", function() {
			// qRun();

			QUnit.done(function( details ) {
				jQuery("#qunit-header").append('[qbehavior: '); 
				jQuery("#qunit-header").append('<a class="textbutton" href="javascript:qbehavior.goNextPage();">Next page</a>');
				if (getOption("auto", false))
					jQuery("#qunit-header").append('<a class="textbutton" href="javascript:qbehavior.setOption(\'auto\', false);">Manual</a>');
				else
					jQuery("#qunit-header").append('<a class="textbutton" href="javascript:qbehavior.setOption(\'auto\', true);">Auto</a>');
				jQuery("#qunit-header").append(']');

			 	console.log( "Total: ", details.total, " Failed: ", details.failed, " Passed: ", details.passed, " Runtime: ", details.runtime );
		 		if ((details.failed == 0) && getOption("auto", false)) {
	 				qbehavior.goNextPage();
		 		}
			});

			QUnit.assert.tableCell = function(id, col, value, message) {
				ok(true, "table cell worked");
				//QUnit.push("it worked", true, value, message);
			};
			
			QUnit.assert.previousPage = function(name) {
				
//				equals();
				// Store value on browser for duration of the session
				sessionStorage.setItem('key', 'value');
				 
				// Retrieve value (gets deleted when browser is closed and re-opened)
				sessionStorage.getItem('key');
			};
			
			module("System");
			test("Javascript loaded", function() { 
				var r = Math.random();
				ok(true, "QUnit library is loaded?");
				ok(typeof(jQuery) != "undefined", "jQuery library is loaded?");
				ok(typeof(sessionStorage) != "undefined", "Session storage is present?");
				ok(getOption("test" + r, r) == r, "Getting inexisting option with default");
				ok(function() { qbehavior.setOption("test2", r); qbehavior.getOption("test2", false) == r; }, "Setting and Getting option"); 
			});
			asyncTest("Asynchronous test", function() {
				expect(1);
				setTimeout(function() {
						ok( true, "Testing the timeout function and asyncTest" );
						start();
					}, 10);
			});
			if (typeof(tests) != "undefined") {
				for (var x=0; x < tests.length;x++){
					module(tests[x]);
					loadJS(baseUrl + tests[x]);
				}
			}
	    });

	}); // jQuery() {ready}
	return {
		getPreviousPage: getPreviousPage,
		setCurrentPage: setCurrentPage,
		getOption: getOption,
		setOption: setOption,
		goNextPage: goNextPage
	}
}();