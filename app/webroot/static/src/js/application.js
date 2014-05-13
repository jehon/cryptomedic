var cryptoApp = angular.module('Cryptomedic_app', []);
cryptoApp.controller('Cryptomedic_ctrl', [ '$scope', 'service_rest' , function($scope, service_rest) { 
	$scope.loggedIn = service_rest.isLoggedIn();
}]);
