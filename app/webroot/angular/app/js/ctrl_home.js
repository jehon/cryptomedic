"use strict";

cryptoApp.controller('ctrl_home', [ '$scope', 'service_rest' , function($scope, service_rest) { 
	$scope.searched = false;
	$scope.year = "";
	$scope.number = "";
	
	$scope.checkReference = function() {
		console.log($scope.year + "-" +  $scope.number);
	}
	
	
}]);
