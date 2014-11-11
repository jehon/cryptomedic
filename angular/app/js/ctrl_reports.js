 "use strict";

mainApp.controller('ctrl_reports', [ '$scope', '$routeParams', function($scope, $routeParams) {
	var report = $routeParams['report'];
	var now = new Date();
	$scope.values = {
		'examinerName': '',
		'date': new Date(),
		'center': 992,
		'month': now.getFullYear() + "-" + now.getMonth()

	};

	var reports = {
		'daily': [ "center", "date" ], //, "examinerName"
		'monthly': [ "month"]
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
