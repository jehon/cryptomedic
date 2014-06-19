"use strict";

cryptoApp.controller('ctrl_allGraphics', [ "$scope", function($scope) {
	$scope.hovered = -1;
	$scope.$on("hovered", function(event, i) {
		console.log(i);
		$scope.hovered = i;
	})
}]);
