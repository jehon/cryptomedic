"use strict";

cryptoApp.controller('ctrl_login', [ '$scope', 'service_rest' , function($scope, service_rest) {
	$scope.login = function() {
		$scope.$broadcast("pending");
		$scope.loginError = false;
		service_rest.doLogin($scope.username, $scope.password)
			.fail(function() {
				console.log("login failed ");
				$scope.loginError = true;
			})
		.done(function() {
			console.log("main logged in");

		});
};

}]);
