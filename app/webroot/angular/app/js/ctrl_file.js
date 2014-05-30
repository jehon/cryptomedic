"use strict";

cryptoApp.controller('ctrl_file', [ '$scope', 'service_rest', function($scope, service_rest) {
	function myTryCatch(fn) {
		try {
			return $scope.currentFile()[fn]();
		} catch(e) {
			if (e instanceof DataMissingException) {
				return "#" + e.data + " unknown#";
			}
			throw e;
		}
	}
	
	$scope.ageAtConsultTimeStr = function() {
		try {
			return $scope.currentFile().ageAtConsultTime() + " years old at consultation time"; 
		} catch(e) {
			return "#" + e + "#";
		}
	};

	$scope.stats_ds_weight = function() { return myTryCatch("ds_weight"); };
	$scope.stats_ds_height = function() { return myTryCatch("ds_height"); };
	$scope.stats_ds_weight_height = function() { return myTryCatch("ds_weight_height"); };
	$scope.stats_ds_bmi = function() { return myTryCatch("ds_bmi"); };
	$scope.stats_bmi = function() { return myTryCatch("bmi"); };

}]);
