"use strict";

var cryptoApp = angular.module('app_cryptomedic', [ 'ngRoute' ])
.config([ '$routeProvider', function($routeProvider) {
    $routeProvider.when('/login', {
        templateUrl: 'partials/login.html',
        controller: 'ctrl_cryptomedic'
    })
    .when('/patients/:id', {
        templateUrl: 'partials/patient.html',
        controller: 'ctrl_cryptomedic'
    }).when('/home', {
    	templateurl: 'partials/home.html',
    	controller: 'ctrl_cryptomedic'
    })
    .otherwise({ 'redirectTo': '/home'});
}])
.config([ '$compileProvider', function( $compileProvider ) {
	$compileProvider.aHrefSanitizationWhitelist(/^\s*((https?|ftp|mailto|chrome-extension):|data:text,)/);
}]);

cryptoApp.controller('ctrl_cryptomedic', [ '$scope', 'service_rest' , function($scope, service_rest) { 
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
	
	$scope.$on("loggedOut", function(msg) {
		console.log("event notlogged");
		$scope.logged = false;
//		if (typeof(msg) == 'undefined') msg = false;
//		$scope.errorLogin = msg;
	});
	
	$scope.doBusy = function(msg) {
		jQuery("#busy").modal('show');
		var c = this.busyMessages.push({ 'message': msg, 'done': false }) - 1;
		this.busyMessageDone = false;
		return function() { 
			console.log("doBusy is done");
			$scope.busyMessages[c].status = true;
			// TODO trigger busyMessageDone:
			var allOk = true;
			for(var m in $scope.busyMessages) {
				allOk = allOk && $scope.busyMessages[m].status;
			}
			$scope.busyMessagesDone = true;
			$scope.safeApply();
			setTimeout(function() {
				jQuery("#busy").modal('hide'); 
				$scope.safeApply();
			}, 2000);
		};
	};

	$scope.username = "";
	$scope.password = "";
	if (typeof(cryptomedic) != "undefined" && cryptomedic.settings && cryptomedic.settings.username) {
		$scope.logged = true;
		console.log("conntected");
	}
	$scope.doLogin = function() {
		$scope.loginError = false;
		var busyEnd = $scope.doBusy("Checking your login/password with the online server");
		service_rest.doLogin(this.username, this.password)
			.done(function() {
				console.log("login ok");
				$scope.loginError = false;
				$scope.logged = true;
				busyEnd();
			})
			.fail(function(data) {
				console.log("login ko");
				$scope.loginError = true;
				$scope.logged = false;
				busyEnd();
			});
	};

	$scope.doLogout = function() {
		var busyEnd = $scope.doBusy("Disconnecting from the server");
		
	}
	
	// Events from the service_*
	$scope.$on("pending", $scope.pending);
	$scope.$on("clear", $scope.clear);
}]);
