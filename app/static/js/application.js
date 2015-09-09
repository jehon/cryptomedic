"use strict";

var application = {};
application.models = {};
var server = {};

///**
// * For this f*** old IE6-8
// */
//if (typeof(console) === 'undefined') { console = {}; }
//if (typeof(console.log) !== 'function') { console.log = function() {}; }
//if (typeof(console.info) !== 'function') { console.info = console.log; }
//if (typeof(console.error) !== 'function') { console.error = console.log; }
//if (typeof(console.trace) !== 'function') { console.trace = console.log; }
//if (typeof(console.warn) !== 'function') { console.warn = console.log; }

// Inspired from http://www.2ality.com/2014/10/es6-promises-api.html
Promise.prototype.myFinallyDone = function (callback) {
    callback = callback || function(data) { return data; };
    return this
    	.then(callback, callback)
    	.catch(function(reason) { console.error(reason); });
};

window.myEvents = function() {
    return {
	 /**
	  * Trigger a custom event
	  * 
	  * @param name: name of the event to be triggered
	  * @param params: additionnal cusom parameters 
	  * 
	  */
	'trigger': function(name, params) {
	    params = params || {};
	    document.dispatchEvent(new CustomEvent(name, { 'detail' : params }));	
	},
	/**
	 * Listen to a specific event
	 * 
	 * @param string name: name of the event
	 * @param function callback: callback will be called fn(params);
	 * 
	 */
	'on': function(name, callback) {
	    document.addEventListener(name, function (e) {
		callback(e.detail);
	    });
	}
    }
}();


function inherit(parent, constructor) {
	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create

	if (typeof(constructor) == "undefined")
		constructor = function() {};

	// shim for older browsers: 
	var ObjectCreateShim;
	if (typeof Object.create == 'function') {
		ObjectCreateShim = Object.create;
	} else {
		ObjectCreateShim = function(proto) {
			    function ctor() { }
			    ctor.prototype = proto;
			    return new ctor();
		};
	}

	// Create a Student.prototype object that inherits from Person.prototype.
	// Note: A common error here is to use "new Person()" to create the Student.prototype.
	// That's incorrect for several reasons, not least that we don't have anything to
	// give Person for the "firstName" argument. The correct place to call Person is
	// above, where we call it from Student.
	constructor.prototype = ObjectCreateShim(parent.prototype);

	// Set the "constructor" property to refer to Student
	constructor.prototype.constructor = constructor;

	// Add a custom parent field to refer to the inherited parent
	constructor.prototype._parent = parent.prototype;
}

function ApplicationException(msg) {
    this.message = msg;
}

inherit(Error, ApplicationException);
ApplicationException.prototype.getMessage = function() { return this.message; };

function date2CanonicString(d, dateOnly) {
    // d.setMilliseconds(0);
    if (d == null) return "0000-00-00 00:00:00 GMT+0000";

    var ts = - (new Date()).getTimezoneOffset()/60 * 100;

    var dateStr = d.getFullYear() + 
        "-" + 
        ("00" + (d.getMonth() + 1)).substr(-2) + 
        "-" +
        ("00" + (d.getDate())).substr(-2);

    if (dateOnly) return dateStr;
    
    if (((((d.getHours() + (ts / 100)) % 24) == 0) || (d.getHours() == 0)) 
    		&& (d.getMinutes() == 0) && (d.getSeconds() == 0)) {
    	return dateStr;
    }

    return dateStr + " " +
        ("00" + d.getHours()).substr(-2) +
        ":" +
        ("00" + d.getMinutes()).substr(-2) +
        ":" +
        ("00" + d.getSeconds()).substr(-2) +
        " GMT" + (ts < 0 ? "-" : "+") + 
        ("0000" + Math.abs(ts)).substr(-4)
}

function objectify(what) {
    if (what === null) return what;
    switch(typeof(what)) {
	case "undefined": return null;
	case "string": 
	    if (what === date2CanonicString(null)) {
		return null;
	    }
	    if (what == "0000-00-00") {
		return null;
	    }
            if (what.match("[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2} GMT[+-][0-9]{4}") == what) {
            	if (what == "0000-00-00 00:00:00 GMT+0000") return null;
                return new Date(what.substr(0, 4), what.substr(5, 2) - 1, what.substr(8, 2),
                    what.substr(11, 2), what.substr(14, 2), what.substr(17, 2));
			};
            if (what.match("[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}") == what) {
            	if (what == "0000-00-00 00:00:00") return null;
                return new Date(what.substr(0, 4), what.substr(5, 2) - 1, what.substr(8, 2),
                    what.substr(11, 2), what.substr(14, 2), what.substr(17, 2));
            };
            if (what.match("[0-9]+") == what) {
        	return parseInt(what);
            }
            if (what.match("[0-9]+.[0-9]+") == what) {
        	return parseFloat(what);
            }
            return what;
	case "object":
	    angular.forEach(what, function(val, i) {
		what[i] = objectify(what[i]);
	    });
	    if (typeof(what['_type']) != "undefined") {
                what = new application.models[what['_type']](what);
            }
	    return what;
	default:
	    return what;		
    }
}

function stringify(what) {
    if (what === null) return what;
    if (what === "") return null;
    if (typeof(what) == "object") {
        if (what instanceof Date) {
        	return date2CanonicString(what);
        }
        angular.forEach(what, function (v, k) {
            what[k] = stringify(what[k]);
        });
    }
    return what;
}

var mainApp = angular.module('app_main', [ 'ngRoute' ])
.config([ '$compileProvider', function( $compileProvider ) {
	$compileProvider.aHrefSanitizationWhitelist(/^\s*((https?|ftp|mailto|chrome-extension):|data:text,)/);
	$compileProvider.imgSrcSanitizationWhitelist($compileProvider.aHrefSanitizationWhitelist());
}])
.filter('mypercentage', function() {
	return function(text, rnd) {
		text = text || '';
		rnd = rnd || 2;
		if (typeof(text) != 'number') {
			if (parseFloat(text) != text) return text;
			text = parseFloat(text);
		}
		return "" + (Math.round(text * 100 * Math.pow(10, rnd)) / Math.pow(10, rnd)) + "%";
	};
})
.directive('catchIt', [ "$compile", function($compile) {
    // http://tutorials.jenkov.com/angularjs/custom-directives.html#compile-and-link
    // http://stackoverflow.com/a/15298620
    return {
	restrict: 'A',
	transclude: true,
	scope: {
	    'tryit': '&', // executed in parent scope
	},
	template: "<span ng-if='error' class='catchedError'>{{errorMsg}}</span><span ng-if='!error' ng-transclude></span>",
	link:
	    function($scope, $element, $attrs, ctrl, $transclude) {
		function testIt() {
		    try {
			$scope.error = false;
			$scope.result = "";
			$scope.errorMSg = "";
			$scope.result = $scope.tryit();
		    } catch (e) {
			$scope.error = true;
			if (e instanceof ApplicationException) {
			    $scope.errorMsg = e.getMessage();
			} else {
			    $scope.errorMsg = "Uncatchable error";
			    console.warn(e);
			    throw e;
			}
		    }
		}
		$scope.$watch(function() {
        	    try  {
        		return $scope.tryit();
        	    } catch (e) {
        		return e.toString();
        	    }
		}, function() {
		    testIt();
		});
		testIt();
			
		// Destroy of the element
		$element.on('$destroy', function() {
		    $scope.$destroy();
		});
	} // end of link function
    };
}])
.directive('mycalendar', function() {
	return function (scope, elem, attrs) {
	    jQuery(elem).datepicker({ 
		dateFormat: "yy-mm-dd",
		changeMonth: true, 
		changeYear: true 
	    });
	}
})
.directive('preview', [ "$compile", function($compile) {
    return {
	restrict: 'A',
	// http://tutorials.jenkov.com/angularjs/custom-directives.html#compile-and-link
	compile: function(cElement, cAttrs, cTransclude) {
	    console.log("compiling preview");
	    return function($scope, $element, $attrs, ctrl, $transclude) {
		var canvas = document.getElementById($attrs.preview);
		var transcludeScope = $scope.$parent.$new();
		
		$element[0].onchange = function() {
		    var busy = $scope.doBusy("Reducing the picture");

		    // http://hacks.mozilla.org/2011/01/how-to-develop-a-html5-image-uploader/
		    var file = $element[0].files[0];
		    if (!file.type.match(/image.*/)) {
			console.error("Not a picture?");
			alert("Are you sure it is a picture? If it is a picture, please send it by email to marielineet.jean@gmail.com to debug the application. Thank you");
			busy();
		    }
			
		    var img = document.createElement("img");
		    var reader = new FileReader();
		    reader.onerror = function(e) {
			console.error(e);
			busy();
		    };
			
		    reader.onload = function(e) {
			console.log("reader loaded");
			img.src = e.target.result;
		    
			//var canvas = document.createElement("canvas");
			img.onload = function() {
			    var canvas = document.getElementById("preview");
			    var ctx = canvas.getContext("2d");
		
			    var schrink = 1;
			    var h = img.naturalHeight;
			    var w = img.naturalWidth;
				
			    // Resize the image
			    var MAX_SIZE = 200*1024;
			    if (h * w > MAX_SIZE) {
				schrink = Math.sqrt(h * w / MAX_SIZE);
				w = w / schrink;
				h = h / schrink;
			    }
		
			    // Adapt the canvas
			    canvas.width = w;
			    canvas.height = h;
			    canvas.style.width = w;
			    canvas.style.height = h;

			    // Add the image to the canvas
			    ctx.drawImage(img, 0, 0, w, h);
			    canvas.style.display = 'block';
		
			    var dataURI = canvas.toDataURL("image/jpeg");
			    $scope.currentFile().fileContent = dataURI;
			    $scope.currentFile().OriginalName = file.name;
			    $scope.$emit("revalidate");
			    busy();
			};
		    };
		    reader.readAsDataURL(file);
		}
	    };
	}
    }
}])
;

mainApp.controller('ctrl', [ '$scope', '$location', 'service_backend', function($scope, $location, service_backend) { 
    $scope.cryptomedic = cryptomedic;
    $scope.application = application;
    $scope.server = server;
    $scope.safeApply = function (fn) {
    	if (this.$root && (this.$root.$$phase == '$apply' || this.$root.$$phase == '$digest')) {
    	    if(fn && (typeof(fn) === 'function')) {
    		fn();
    	    }
    	} else {
    	    this.$apply(fn);
    	}
    };
	
    $scope.go = function(path, replaceInHistory) {
	if ((typeof(replaceInHistory) !== "undefined") && replaceInHistory) {
	    $location.replace();
	}
  	$location.path( path );
    };
	
    $scope.sync = { lastSync: '?', _final: false };
    
    $scope.busy = [];
    $scope.busy.messages = [ ];
    $scope.busy.done = false;
    $scope.busy.isVisible = false;
    $scope.doBusy = function(msg, wait) {
	// TODO: refactor this with the new system!!!
	
	// TODO LOW GUI: auto hide the message box after 500ms if anything is pending ?
	if (typeof(wait) == 'undefined') {
	    wait = false;
	}
	var c = $scope.busy.messages.push({ 'message': msg, 'done': false }) - 1;
	$scope.busy.done = false;
	if (!$scope.busy.isVisible) {
	    jQuery("#busy").modal('show');
	    $scope.busy.isVisible = true;
	}
	$scope.safeApply();
	function allOk() {
	    var ok = true;
	    for(var m in $scope.busy.messages) {
		ok = ok && $scope.busy.messages[m].status;
	    }
	    return ok;
	}

	function endBusy() {
	    if (allOk()) {
		jQuery("#busy").modal('hide');
		$scope.busy.done = true;
		$scope.busy.isVisible = false;
		$scope.busy.messages = [];
		// See http://stackoverflow.com/a/11544860
		jQuery('body').removeClass('modal-open');
		jQuery(".modal-backdrop").remove();
	    } else {
		console.warn("end busy with not allOk");
	    }
	}
	$scope.endBusy = endBusy;

	return function() { 
	    $scope.busy.messages[c].status = true;
	    $scope.safeApply();
	    // If all messages are ok, then hide it
	    if (allOk()) {
		$scope.busy.done = true;
		setTimeout(endBusy, (wait ? 2000 : 1));
	    }
	};
    };

    $scope.endBusy = function() {};

    $scope.logged = false;
    $scope.username = "";
    $scope.password = "";
    $scope.hasPermission = function(transaction) {
	if (typeof(server) == "undefined") return false;
	if (typeof(server.settings) == "undefined") return false;
	if (typeof(server.settings.authorized) == "undefined") return false;
	return (server.settings.authorized.indexOf(transaction) >= 0);
    };

    myEvents.on('backend_cache_progress', function(data) {
//	console.log("Cache progress: " + data.checkpoint + " " + (data.final ? " terminated " : " data pending")); 
	$scope.sync = data;
	$scope.safeApply();
    }, false);
    
    myEvents.on('backend_unauthorized', function(data) {
	console.info("ctrl: unauthorized");
	$scope.logged = false; 
    });

    $scope.doLogin = function() {
	$scope.username = jQuery("#login_username").val();
	$scope.password = jQuery("#login_password").val();
	if ($scope.username == "") {
	    alert("No username detected");
	    return;
	}
	if ($scope.password == "") {
	    alert("No password detected");
	    return;
	}
	$scope.loginError = false;
	var busyEnd = $scope.doBusy("Checking your login/password with the online server", true);
	service_my_backend.login(this.username, this.password)
		.then(function(data) {
		    server.settings = data;
		    $scope.loginError = false;
		    $scope.logged = true;
		    // if (typeof(server) == "undefined" || !server.settings || !server.settings.username) {
		    console.log("Reloading the page");
		    window.location.reload();
		    // }
		    $scope.safeApply();
		})
		.catch(function(data) {
		    $scope.loginError = true;
		})
		.myFinallyDone(function() {
		    busyEnd();
		});
    };
    
    $scope.doCheckLogin = function() {
	$scope.loginError = false;
	var busyEnd = $scope.doBusy("Checking your login/password with the online server", true);
	service_my_backend.checkLogin()
		.then(function(data) {
		    server.settings = data;
		    $scope.logged = true;
		    $scope.$broadcast("message", { "level": "info", "text": "Welcome " +  data.name + "!"});
		    $scope.safeApply();
		})
		.myFinallyDone(function() {
		    busyEnd();
		});
    };

    $scope.doSync = function() {
	service_my_backend.sync().then(function(data) {
	    console.log("sync executed");
	})
    };
    
    $scope.doLogout = function() {
	var busyEnd = $scope.doBusy("Disconnecting from the server", true);
	service_my_backend.logout()
		.then(function(data) {
    			server.settings = null;
			$scope.logged = false;
		})
		.myFinallyDone(function(data) {
		    busyEnd();
		});
    };

    // Events from the service_*
    $scope.$on("backend_logged_out", function(msg) { 
	$scope.logged = false; 
    });
    
    $scope.$on("$routeChangeError", function() { console.log("error in routes"); console.log(arguments); });

    $scope.messages = [];
    var interval = 0;
    $scope.$on("message", function(event, data) {
	data = jQuery.extend({}, { level: "success", text: "Error!", seconds: 8 }, data);
	var t = new Date();
	data.timeout = t.setSeconds(t.getSeconds() + data.seconds);
	$scope.messages.push(data);
	if (interval == 0) {
	    interval = setInterval(function() {
		var now = new Date();
	       	$scope.messages = $scope.messages.filter(function(value, index) {
	       	    return (value.timeout >= now);
	       	});
	       	if ($scope.messages.length == 0) {
	       	    clearInterval(interval);
	       	    interval = 0;
	       	}
	       	$scope.safeApply();
	    }, 1000);
	}
    });
	
    $scope.doCheckLogin();
}]);

function debug_showLabels() {
    jQuery("label[for]").each(function(el) {
	jQuery(this).text(jQuery(this).attr("for"));
	jQuery(this).addClass("debug");
    });
}

server.setSettings = function(data) {
    server.settings = objectify(data);
}

function are_cookies_enabled() {
    var cookieEnabled = (navigator.cookieEnabled) ? true : false;

    if (typeof(navigator.cookieEnabled) == "undefined" && !cookieEnabled) { 
        document.cookie="testcookie";
        cookieEnabled = (document.cookie.indexOf("testcookie") != -1) ? true : false;
    }
    return (cookieEnabled);
}

if (!are_cookies_enabled()) {
    alert("Your cookie are disabled. Please enable them.\nVos cookies sont désactivés. Merci de les activer.");
}
