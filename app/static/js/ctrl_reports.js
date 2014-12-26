 "use strict";

mainApp.controller('ctrl_reports', [ '$scope', '$routeParams', 'service_backend', 'cache_commons', function($scope, $routeParams, service_backend, cache_commons) {
	var report = $routeParams['report'];
	$scope.values = cache_commons.getAll();
	angular.forEach($scope.values, function(v, k) {
		if (v === null) $scope.values[k] = "";
	});
	
	var reports = {
		'daily': [ "center", "date", "examiner" ],
		'monthly': [ "month" ]
	}
	
	$scope.getReport = function() {
		if (report) {
			return report;
		}
		return false;
	}

	$scope.isParam = function(name) {
		return reports[report].indexOf(name) > -1;
	}

	$scope.refresh = function() {
		angular.forEach(reports[report], function(v) {
			cache_commons.set(v, $scope.values[v]);
		});

		var res = report + ".html?";
		if ($scope.values.date) {
			$scope.values.date.setUTCHours(0, 0, 0, 0);
		}

		angular.forEach(reports[report], function(value) {
			if (typeof($scope.values[value]) != 'undefined') {
				var v = $scope.values[value];
				if (v instanceof Date) {
					v = v.toISOString();
				}
				res += value + "=" + v + "&";
			}
		});
		res += "ts=" + (new Date()).getTime();
		$scope.url = res;
	}

	$scope.refresh();
}]);
