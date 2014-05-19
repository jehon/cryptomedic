"use strict";

var cryptoApp = angular.module('app_cryptomedic', [ 'ngRoute' ])
.config([ '$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {
    	templateUrl: 'partials/home.php',
        controller: 'ctrl_home'
    }).when('/search', {
    	templateUrl: 'partials/search.php',
    }).when('/patient/:id', {
    	templateUrl: 'partials/patient.php',
    }).when('/blank', {
    	templateUrl: 'partials/blank.html',
    }).otherwise({ 'redirectTo': '/blank'});
}])
.config([ '$compileProvider', function( $compileProvider ) {
	$compileProvider.aHrefSanitizationWhitelist(/^\s*((https?|ftp|mailto|chrome-extension):|data:text,)/);
}]);

cryptoApp.controller('ctrl_cryptomedic', [ '$scope', 'service_rest', function($scope, service_rest) { 
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
	
	$scope.logged = false;
	$scope.pending = false;
	$scope.busyMessages = [ ];
	$scope.busyMessagesDone = false;
	
	$scope.doBusy = function(msg, wait) {
		if (typeof(wait) == 'undefined') wait = false;
		jQuery("#busy").modal('show');
		var c = this.busyMessages.push({ 'message': msg, 'done': false }) - 1;
		this.busyMessageDone = false;
		$scope.safeApply();
		return function() { 
			$scope.busyMessages[c].status = true;
			$scope.safeApply();
			// If all messages are ok, then hide it
			var allOk = true;
			for(var m in $scope.busyMessages) {
				allOk = allOk && $scope.busyMessages[m].status;
			}
			if (allOk) {
				$scope.busyMessagesDone = true;
				var done = function() {
					jQuery("#busy").modal('hide'); 
					$scope.busyMessages = [];
				};
				if (wait) {
					setTimeout(done, 2000);
				} else {
					done();
				}
			}
		};
	};

	$scope.username = "";
	$scope.password = "";
	if (typeof(cryptomedic) != "undefined" && cryptomedic.settings && cryptomedic.settings.username) {
		$scope.logged = true;
		$scope.username = cryptomedic.settings.username;
		console.log("conntected");
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
			}).always(function() {
				busyEnd();
			});
	};

	$scope.doLogout = function() {
		console.log("logout");
		var busyEnd = $scope.doBusy("Disconnecting from the server", true);
		service_rest.doLogout()
			.done(function() {})
			.fail(function(data) {})
			.always(function(data) {
				$scope.logged = false;
				busyEnd();
			});
	};

	// Events from the service_*
	$scope.$on("loggedOut", function(msg) { $scope.logged = false; });
	$scope.$on("pending", $scope.pending);
	$scope.$on("clear", $scope.clear);

	$scope.$on("$routeChangeError", function() { console.log("error in routes"); console.log(arguments); });
}]);
