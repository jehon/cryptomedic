 "use strict";

mainApp.controller('ctrl_reports', [ '$scope', '$routeParams', 'service_backend', 'cache_commons', '$sce', function($scope, $routeParams, service_backend, cache_commons, $sce) {
	var report = $routeParams['report'];
	$scope.values = cache_commons.getAll();
	angular.forEach($scope.values, function(v, k) {
		if (v === null) $scope.values[k] = "";
	});
	
	$scope.reports = {
		'dailyActivity': { 
		    name: 'Daily Report',
		    description: "If you want to know your daily activity, choose this report.<br>"
			+ "Options: the day, and optionnaly the examiner and the center.<br>",
		    params: [ "center", "date", "examiner" ]
		},
		'monthlyActivity': {
		    name: 'Monthly Activity Report',
		    description: "If you want to know your activity on a month, choose this report<br>"
			+ "Options: the month, and optionnaly the examiner and the center.<br>",
		    params: [ "center", "examiner", "month" ]
		},
		'monthlyStatistical': {
		    name: 'Monthly Statistical Report',
		    description: "If you want to know the monthly activity of the SARPV CDC, choose this report<br>"
			+ "Options: the month.",
		    params: [ "month" ]
		}
	}
	
	for(var k in $scope.reports) {
	    $scope.reports[k].description = $sce.trustAsHtml($scope.reports[k].description);
	}
	$scope.getReport = function() {
		if (report) {
			return report;
		}
		return false;
	}

	$scope.isParam = function(name) {
	    if (!$scope.reports[report]) return false;
	    return $scope.reports[report]['params'].indexOf(name) > -1;
	}

	$scope.refresh = function() {
		angular.forEach($scope.reports[report], function(v) {
			cache_commons.set(v, $scope.values[v]);
		});

		var res = report + ".html?";
		if ($scope.values.date) {
			$scope.values.date = new Date($scope.values.date);
			$scope.values.date.setUTCHours(0, 0, 0, 0);
		}

		service_backend.getReport(report, $scope.values).done(function(data) {
		    $scope.result = data;
		});
		
		angular.forEach($scope.reports[report], function(value) {
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
