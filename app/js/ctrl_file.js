"use strict";

mainApp.controller('ctrl_file', [ '$scope', 'service_rest', function($scope, service_rest) {
	$scope.currentFile = function() {
		// The link need to be kept with parent, so that when the data is loaded, 
		// we inherit from it "live".
		if ($scope.$index) return $scope.folder.getSubFile($scope.$index);
		return $scope.$parent.currentFile();
	}
}]);
