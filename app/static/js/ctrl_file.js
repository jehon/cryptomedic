"use strict";

mainApp.controller('ctrl_file', [ '$scope', 'service_backend', function($scope, service_backend) {
	$scope.currentFile = function() {
		// The link need to be kept with parent, so that when the data is loaded, 
		// we inherit from it "live".
	    console.info($scope.$index);
	    	if ((typeof($scope.$index) == 'undefined')) {
			return $scope.$parent.currentFile();
	    	}
		return $scope.folder.getSubFile($scope.$index);
	}
}]);
