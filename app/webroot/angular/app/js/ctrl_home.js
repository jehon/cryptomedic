"use strict";

cryptoApp.controller('ctrl_home', [ '$scope', 'service_rest' , function($scope, service_rest) { 
	$scope.searched = false;
	$scope.year = "";
	$scope.order = "";
	$scope.generate = false;
	
	$scope.checkReference = function() {
		console.log($scope.year + "-" +  $scope.order);
		console.log($scope.generate);
		$scope.searched = true;
	};
	
	$scope.createReference = function() {
		console.log($scope.year + "-" +  $scope.order);
	};
	
}]);
