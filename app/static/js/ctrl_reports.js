 "use strict";

mainApp.controller('ctrl_reports', [ '$scope', '$routeParams', 'service_rest', function($scope, $routeParams, service_rest) {
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

	$scope.goToFiche = function(type, id) {
		service_rest.getParent(type, id).then(function(parent) {
			var j = 0;
			angular.forEach(parent.getSubFiles(), function(v, i) {
				if ((v['_type'] == type) && (v['id'] == id)) {
					j = i;
				}
			});
			$scope.go("/folder/" + parent.getId() + "/" + j);
		});
	};
	
	$scope.refresh = function() {
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
