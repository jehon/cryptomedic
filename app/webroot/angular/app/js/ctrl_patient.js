"use strict";

cryptoApp.controller('ctrl_patient', [ '$scope', 'service_rest', function($scope, service_rest) {
	$scope.currentFile = function() {
		return $scope.folder.getMainFile();
	};
}]);
