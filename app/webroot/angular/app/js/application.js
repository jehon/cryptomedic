"use strict";

// TODO: partials depend on version (like script) -> caching opportunities
function ApplicationException(msg) {
    this.message = msg;
}
ApplicationException.prototype = new Error();
ApplicationException.prototype.getMessage = function() { return this.message; };

var cryptoApp = angular.module('app_main', [ 'ngRoute' ])
.config([ '$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {
    	templateUrl: 'partials/home.php',
        controller: 'ctrl_home'
    }).when('/search', {
    	templateUrl: 'partials/search.php',
    	controller: 'ctrl_search',
    }).when('/folder/:id/:page?', {
    	controller: 'ctrl_folder',
    	templateUrl: 'partials/folder.php',
    }).otherwise({ 'redirectTo': '/home'});
}])
.config([ '$compileProvider', function( $compileProvider ) {
	$compileProvider.aHrefSanitizationWhitelist(/^\s*((https?|ftp|mailto|chrome-extension):|data:text,)/);
	$compileProvider.imgSrcSanitizationWhitelist($compileProvider.aHrefSanitizationWhitelist());
}])
.config(["$httpProvider", function ($httpProvider) {
	$httpProvider.defaults.transformResponse.push(function(responseData){
			if (typeof responseData !== "object") return responseData;
			responseData = objectify(responseData);
			return responseData;
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
							$element.html("<span>[" + e.getMessage() + "]</span>");
						} else {
							console.warn("not a correct error");
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
;

cryptoApp.controller('ctrl', [ '$scope', '$location', 'service_rest', function($scope, $location, service_rest) { 
	$scope.cryptomedic = cryptomedic;
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
		return (typeof(cryptomedic.settings.denied[transaction]) == "undefined");
	};
	
	$scope.link = function(key) {
		if (key == null) key = 0;
		if (typeof(cryptomedic.labels[key]) == "undefined")
			return "UNKNOWN LABEL " + key;
		return cryptomedic.labels[key].text;
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
	if (typeof(cryptomedic) != "undefined" && cryptomedic.settings && cryptomedic.settings.username) {
		$scope.logged = true;
		$scope.username = cryptomedic.settings.username;
	}

	$scope.doLogin = function() {
		$scope.loginError = false;
		var busyEnd = $scope.doBusy("Checking your login/password with the online server", true);
		service_rest.doLogin(this.username, this.password)
			.done(function() {
				console.log("login ok");
				$scope.loginError = false;
				$scope.logged = true;
				
				if (typeof(cryptomedic) == "undefined" || !cryptomedic.settings || !cryptomedic.settings.username) {
					window.location.reload();
				}
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
