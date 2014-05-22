"use strict";

cryptoApp.controller('ctrl_patient', [ '$scope', 'service_rest', function($scope, service_rest) {
	$scope.stats_base_actualage = "#Year of birth unknown#";
	if ($scope.files[$scope.page]['Yearofbirth'] >= 1900) {
		$scope.stats_base_actualage = (new Date().getFullYear() - $scope.files[$scope.page]['Yearofbirth']) + " years old today";
    }

}]);
