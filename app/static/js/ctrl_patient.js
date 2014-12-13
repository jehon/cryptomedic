"use strict";

mainApp.controller('ctrl_patient', [ '$scope', 'service_backend', function($scope, service_backend) {
	$scope.currentFile = function() {
		return $scope.folder.getMainFile();
	};
}]);
