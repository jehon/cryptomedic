"use strict";

// TODO: partials depend on version (like script) -> caching opportunities

var application = {};
application.models = {};
var server = {};

/**
 * For this f*** old IE6-8
 */
/* istanbul ignore next */
if (typeof(console) === 'undefined') { console = {}; }
/* istanbul ignore next */
if (typeof(console.log) !== 'function') { console.log = function() {}; }
/* istanbul ignore next */
if (typeof(console.info) !== 'function') { console.info = console.log; }
/* istanbul ignore next */
if (typeof(console.error) !== 'function') { console.error = console.log; }
/* istanbul ignore next */
if (typeof(console.trace) !== 'function') { console.trace = console.log; }
/* istanbul ignore next */
if (typeof(console.warn) !== 'function') { console.warn = console.log; }
/* istanbul ignore next */
if (typeof(console.group) !== 'function') { console.group = function(group) { console.log("GROUP: " + group); }; }
/* istanbul ignore next */
if (typeof(console.groupCollapsed) !== 'function') { console.groupCollapsed = console.group; }
/* istanbul ignore next */
if (typeof(console.groupEnd) !== 'function') { console.groupEnd = function() { console.log("GROUP END"); } ; }

/* istanbul ignore next */
if (window.location.search) {
	if (window.location.search.search("_nocollapse") > 0) {
		console.log("mode no-collapse");
		console.groupCollapsed = console.group;
	}
}

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
// ApplicationException.prototype = new Error();

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
			// TODO: problem with year parsing !!!
            if (what.match("[0-9]{4}-[0-9]{2}-[0-9]{2}") == what) {
            	if (what == "0000-00-00") return null;
                var d = new Date(what.substr(0, 4), what.substr(5, 2) - 1, what.substr(8, 2));
                return d;
			};
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
    if (what == null) return what;
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
.config(["$httpProvider", function ($httpProvider) {
	$httpProvider.defaults.transformResponse.push(function(responseData){
		if (typeof responseData !== "object") return responseData;
		return objectify(responseData);
	});
	$httpProvider.defaults.transformRequest.unshift(function(requestData){
		if (typeof requestData !== "object") return requestData;
		return stringify(requestData);
	});
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
	return {
		restrict: 'A',
		require: '^ngModel',
		transclude: true,
		scope: {
			'tryit': '&', // executed in parent scope
			'ngModel': '=',
		},
		// http://tutorials.jenkov.com/angularjs/custom-directives.html#compile-and-link
		compile: function(cElement, cAttrs, cTransclude) {
      		// TODO: what hapen if data is updated ? -> see the write mode
			return function($scope, $element, $attrs, ctrl, $transclude) {
				var transcludeScope = $scope.$parent.$new();

				function testIt() {
	        		//linking function here (not in the main attribute, thus)
					try {
						transcludeScope.result = $scope.tryit();
						// Angular.js#5350
						// TODO: clone scope and add result
						// parent.$new()
						// $destroy() when???
					    $transclude(transcludeScope, function(clone) {
							$element.empty();
					    	$element.append(clone);
					    });
						// var tr = cTransclude($scope);
						// $element.html(tr);
					} catch (e) {
						if (e instanceof ApplicationException) {
							$element.html("<span class='catchedError'>[" + e.getMessage() + "]</span>");
						} else {
							console.warn("not a correct error");
							console.warn(e);
							throw e;
						}
					}
				}
				$scope.$watch("ngModel", testIt);

				// Destroy of the element
				$element.on('$destroy', function() {
					transcludeScope.$destroy();
      			});
      		};
      	},
		// template: '<span ng-if="iserror">{{msg}}</span><span ng-if="!iserror" y-ng-transclude>{{result}}</span>',
		// link: function($scope, iElement, iAttrs) {
  //           // var html ='<div ng-repeat="item in items">I should not be red</div>';
  //           // var e =$compile(html)(scope);
  //           // element.replaceWith(e);
		// 	function testIt() {
		// 		$scope.iserror = false;
		// 		try {
		// 			$scope.result = $scope.tryit();
		// 		} catch (e) {
		// 			if (e instanceof ApplicationException) {
		// 				console.warn(e);
		// 				$scope.iserror = true;
		// 				$scope.msg = "[" + e.getMessage() + "]";
		// 			} else {
		// 				console.info("not a correct error");
		// 				throw e;
		// 			}
		// 		}
		// 	}
		// 	$scope.$watch("ngModel", testIt);
		// }
	};
}])
.directive('mycalendar', function() {
	return function (scope, elem, attrs) {
		if (!Modernizr.inputtypes.date) {
			jQuery(elem).datepicker({ dateFormat: 'yy-mm-dd' });
			elem.bind('blur', function() {
				console.info("my blur event");
				//scope.$apply(attrs.ngBlur);
			});
			elem.bind('focus', function() {
				console.info("my focus event");
				//scope.$apply(attrs.ngBlur);
			});
		}
	}
})
// .directive('myFocus', function() {
// 	return function (scope, elem, attrs) {
// 		scope.$watch(attrs.ngFocus, function(newval) {
// 			if (newval) {
// 				$timeout(function() {
// 					elem[0].focus();
// 				}, 0, false);
// 			}
// 		});
// 	}
// })
;

mainApp.controller('ctrl', [ '$scope', '$location', 'service_rest', function($scope, $location, service_rest) { 
	$scope.cryptomedic = cryptomedic;
	$scope.application = application;
	$scope.server = server;
	$scope.safeApply = function (fn) {
		  var phase = this.$root.$$phase;
		  if(phase == '$apply' || phase == '$digest') {
			  	if(fn && (typeof(fn) === 'function')) {
		    		fn();
		    	}
		  } else {
			  this.$apply(fn);
		  }
	};
	
	$scope.go = function ( path ) {
  		$location.path( path );
	};

	$scope.logged = false;
	// $scope.pending = false;

	$scope.hasPermission = function(transaction) {
		if (typeof(server) == "undefined") return false;
		if (typeof(server.settings) == "undefined") return false;
		if (typeof(server.settings.authorized) == "undefined") return false;
		return (server.settings.authorized.indexOf(transaction) >= 0);
	};
	
	$scope.link = function(key) {
		if (key == null) key = 0;
		if (typeof(cryptomedic.labels[key]) == "undefined")
			return "UNKNOWN LABEL " + key;
		return cryptomedic.labels[key];
	};
	
	$scope.busy = [];
	$scope.busy.messages = [ ];
	$scope.busy.done = false;
	$scope.busy.isVisible = false;
	$scope.doBusy = function(msg, wait) {
		// TODO: wait 500ms before hide, anyway, but also check in hide if anything is pending...
		if (typeof(wait) == 'undefined') wait = false;
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

	$scope.endBusy = function() {}

	// On load, if cryptomedic.settings is set, we are logged in!
	$scope.username = "";
	$scope.password = "";
	if (typeof(server) != "undefined" && server.settings && server.settings.username) {
		$scope.logged = true;
	}

	$scope.doLogin = function() {
		$scope.loginError = false;
		var busyEnd = $scope.doBusy("Checking your login/password with the online server", true);
		service_rest.doLogin(this.username, this.password)
			.done(function(data) {
				console.log("login ok");
				console.log(data);
				server.settings = data;
				$scope.loginError = false;
				$scope.logged = true;

				if (typeof(server) == "undefined" || !server.settings || !server.settings.username) {
					window.location.reload();
				}
				$scope.safeApply();
			})
			.fail(function(data) {
				console.log("login ko");
				$scope.loginError = true;
				$scope.logged = false;
			})
			.always(function() {
				busyEnd();
			});
	};

	$scope.doLogout = function() {
		var busyEnd = $scope.doBusy("Disconnecting from the server", true);
		service_rest.doLogout()
			.always(function(data) {
				busyEnd();
			});
	};

	// Events from the service_*
	$scope.$on("rest_logged_out", function(msg) { 
		$scope.logged = false; 
	});

	$scope.$on("rest_logged_in", function(msg) { 
		$scope.logged = true; 
	});

	// $scope.$on("pending", $scope.pending);
	// $scope.$on("clear", $scope.clear);

	$scope.$on("$routeChangeError", function() { console.log("error in routes"); console.log(arguments); });
}]);

function debug_showLabels() {
	jQuery("label[for]").each(function(el) {
		jQuery(this).text(jQuery(this).attr("for"));
		jQuery(this).addClass("debug");
	})
}

server.setSettings = function(data) {
	server.settings = objectify(data);
}
