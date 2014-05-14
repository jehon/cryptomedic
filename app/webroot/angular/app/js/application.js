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
	
	function tryApply() {
		try {
			$scope.$apply();
		} catch (e) {}
	}
	
	$scope.loggedIn = service_rest.isLoggedIn();
	$scope.pending = false;
	
	$scope.$on("login", function() {
		console.log("login");
		$scope.loggedIn = true;
	});
	
	$scope.$on("logout", function() {
		console.log("logout");
		$scope.loggedIn = false;
	});
	
	$scope.$on("pending", function() {
		console.log("pending");
		$scope.pending = true;
	});
	
	$scope.$on("clear", function() {
		console.log("clear");
		$scope.pending = false;
	});
	
}]);
