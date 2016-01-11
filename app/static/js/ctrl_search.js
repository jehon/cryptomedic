"use strict";

mainApp.controller("ctrl_search", [ "$scope", function($scope) {
	  if (typeof($scope.params) == "undefined")
		  $scope.params = {};

	  if (typeof($scope.listing) == "undefined")
		  $scope.listing = [];

	  $scope.page = function() {
		// TODO GUI: render the results in pages of 20 ?
		  $scope.currentPage = $scope.listing;
	};

	  $scope.submit = function() {
		  var busyEnd = $scope.doBusy("Searching for matching patients");

		  service_backend.searchForPatients($scope.params)
		.then(function(data) {
			  $scope.listing = data;
			  $scope.page();
			  $scope.safeApply();
		}, function(data) {
			  console.error(data);
		}).myFinallyDone(function() {
			  busyEnd();
		});
	};

	  $scope.reset = function() {
		  $scope.params = {};
		  $scope.listing = [];
		  $scope.safeApply();
	};
}]);
