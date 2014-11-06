 "use strict";

mainApp.controller('ctrl_reports', [ '$scope', '$routeParams', function($scope, $routeParams) {
	var report = $routeParams['report'];
	$scope.values = {
		'examinerName': '',
		'date': new Date(),
		'center': 992
	};

	var reports = {
		'daily': [ "center", "examinerName", "date" ]
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
		console.log("refresh");
		var res = report + ".html?";
		console.log($scope.values);
		angular.forEach(reports[report], function(value) {
			if (typeof($scope.values[value]) != 'undefined') {
				var v = $scope.values[value];
				if (v instanceof Date) {
					v = v.toISOString();
				}
				res += value + "=" + v + "&";
			}
		});
		console.log(res);
		$scope.url = res;
	}

	$scope.refresh();
}]);
