"use strict";

mainApp.controller('ctrl_offline', [ '$scope', 'service_rest', function($scope, service_rest) {
	$scope.info_available = false;
	$scope.offline = "";
	$scope.refreshAvailable = false;
	
	window.applicationCache.onprogress = function(progress) {
		console.log(progress.loaded);
		$scope.info_available = true;
		$scope.offline = "Downloading next version: " + progress.loaded + " of " + progress.total;
		$scope.safeApply();
	};

	window.applicationCache.onupdateready = function(progress) {
		console.log("update ready");
		
		$scope.info_available = true;
		$scope.offline = "A new version of the application is available.";
		$scope.refreshAvailable = true;
		$scope.safeApply();
	};

	window.applicationCache.oncached = function(progress) {
		console.log("cached event");
		$scope.info_available = false;
		$scope.safeApply();
	};
	
	$scope.applicationRefresh = function() {
		console.log("let's go !");
		window.location.reload();
	}
}]);
