 "use strict";

mainApp.controller('ctrl_reports', [ '$scope', '$routeParams', 'service_backend', '$sce', function($scope, $routeParams, service_backend, $sce) {
	var report = $routeParams['report'];
	$scope.values = service_session_storage().getAll();
	angular.forEach($scope.values, function(v, k) {
		if (v === null) $scope.values[k] = "";
	});
	if (!$scope.values['period']) {
	    $scope.values['period'] = 'month';
	}
	
	var templateReportBase = cryptomedic.templateRoot + "/reports/";
	$scope.reports = {
		'dailyActivity': { 
		    name: 'Daily Report',
		    description: "If you want to know your daily activity, choose this report.<br>"
			+ "Options: the day, and optionnaly the examiner and the center.<br>",
		    params: [ "center", "day", "examiner" ],
		    templateUrl: templateReportBase + "activity.html"
		},
		'monthlyActivity': {
		    name: 'Monthly Report',
		    description: "If you want to know your activity on a month, choose this report<br>"
			+ "Options: the month, and optionnaly the examiner and the center.<br>",
		    params: [ "center", "examiner", "month" ],
		    templateUrl: templateReportBase + "activity.html"
		},
		'consultations': {
		    name: 'Consultations planned',
		    description: "List of consultations planned on a specific day in a specific center.<br>"
			+ "See also the button in the menu<br>"
			+ "Options: the day and the center.",
		    params: [ "day", "center" ],
		    templateUrl: templateReportBase + "consultations.html"
		},
		'statistical': {
		    name: 'Statistical Report',
		    description: "If you want to know the activity of the SARPV CDC on a period, choose this report",
		    params: [ "period", "center", "examiner" ],
		    dataGenerator: "statistical",
		    templateUrl: templateReportBase + "statistical.html"
		},
		'surgical': {
		    name: 'Surgical Report',
		    description: "Follow up of the surgical activity of the period",
		    params: [ "period" ],
		    dataGenerator: 'surgical',
		    templateUrl: templateReportBase + "surgery.html"
		}
	}
	
	for(var k in $scope.reports) {
	    // Make the content "trustable" to be shown as html
	    $scope.reports[k].description = $sce.trustAsHtml($scope.reports[k].description);
	}
	$scope.getReport = function() {
		if (report) {
			return $scope.reports[report];
		}
		return false;
	}

	$scope.isParam = function(name) {
	    if (!$scope.reports[report]) return false;

	    if (($scope.reports[report]['params'].indexOf('period') > -1)) {
		if (name == $scope.values['period']) {
		    return true;
		}
	    }
	    return $scope.reports[report]['params'].indexOf(name) > -1;
	}

	$scope.refresh = function() {
	    if (!report) {
		return;
	    }
	    $scope.result = null;
	    
//	    if ($scope.values.day) {
//		$scope.values.day = new Date($scope.values.day);
//		$scope.values.day.setUTCHours(0, 0, 0, 0);
//	    }

	    angular.forEach($scope.reports[report].params, function(v) {
		service_session_storage().set(v, $scope.values[v]);
	    });

	    var dataGenerator = report;
	    if (typeof($scope.reports[report].dataGenerator) != 'undefined') {
		dataGenerator = $scope.reports[report].dataGenerator;
	    }
	    service_my_backend.getReport(dataGenerator, 
		    	$scope.values, 
		    	($scope.isParam('period') ? $scope.values.period : null)
		    )
		    .then(function(data) {
			$scope.result = data;
		    });
	}

	$scope.refresh();
	
	$scope.age = function(year) {
	    if (year) {
		return (new Date()).getFullYear() - year;
	    }
	    return "-";
	}
}]);
