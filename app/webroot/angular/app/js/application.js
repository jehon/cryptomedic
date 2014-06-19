"use strict";

// TODO: partials depend on version (like script) -> caching opportunities

var cryptoApp = angular.module('app_cryptomedic', [ 'ngRoute' ])
.config([ '$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {
    	templateUrl: 'partials/home.php',
        controller: 'ctrl_home'
    }).when('/search', {
    	templateUrl: 'partials/search.php',
    }).when('/patient/:id/:page?', {
    	controller: 'ctrl_folder',
    	templateUrl: 'partials/folder.php',
    }).when('/blank', {
    	templateUrl: 'partials/blank.html',
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
.filter('mynumber', function() {
	return function(text, rnd, ext) {
		text = text || '';
		rnd = rnd || 2;
		ext = ext || '';
		if (typeof(text) != 'number') {
			if (parseInt(text) != text) return text;
			text = parseInt(text);
		}
		return "" + (Math.round(text * 10) / 10) + ext;
	};
});

cryptoApp.controller('ctrl', [ '$scope', 'service_rest', function($scope, service_rest) { 
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
	
	$scope.logged = false;
	$scope.pending = false;

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
	$scope.busy.shown = false;
	$scope.doBusy = function(msg, wait) {
		// TODO: wait 500ms before hide, anyway, but also check in hide if anything is pending...
		if (typeof(wait) == 'undefined') wait = false;
		var c = $scope.busy.messages.push({ 'message': msg, 'done': false }) - 1;
		$scope.busy.done = false;
		if (!$scope.busy.shown) {
			jQuery("#busy").modal('show');
			$scope.busy.shown = true;
		}
		$scope.safeApply();
		function allOk() {
			var ok = true;
			for(var m in $scope.busy.messages) {
				ok = ok && $scope.busy.messages[m].status;
			}
			return ok;
		}
		return function() { 
			$scope.busy.messages[c].status = true;
			$scope.safeApply();
			// If all messages are ok, then hide it
			if (allOk()) {
				$scope.busy.done = true;
			}
			setTimeout(function() {
				if (allOk()) {
					jQuery("#busy").modal('hide');
					// See http://stackoverflow.com/a/11544860
					jQuery('body').removeClass('modal-open');
					jQuery(".modal-backdrop").remove();
					$scope.busyMessages = [];
				}
			}, (wait ? 2000 : 1));
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
