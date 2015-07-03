 "use strict";

mainApp.controller('ctrl_reports', [ '$scope', '$routeParams', 'service_backend', 'cache_commons', '$sce', function($scope, $routeParams, service_backend, cache_commons, $sce) {
	var report = $routeParams['report'];
	$scope.values = cache_commons.getAll();
	angular.forEach($scope.values, function(v, k) {
		if (v === null) $scope.values[k] = "";
	});
	if (!$scope.values['period']) {
	    console.log("set period");
	    $scope.values['period'] = 'month';
	}
	
	var templateReportBase = cryptomedic.templateRoot + "/reports/";
	// TODO: add "defaultValues" => period = month => generalize dailyActivity and monthlyActivity into one backend
	$scope.reports = {
		'dailyActivity': { 
		    name: 'Daily Report',
		    description: "If you want to know your daily activity, choose this report.<br>"
			+ "Options: the day, and optionnaly the examiner and the center.<br>",
		    params: [ "center", "day", "examiner" ],
		    templateUrl: templateReportBase + "activity.php"
		},
		'monthlyActivity': {
		    name: 'Monthly Report',
		    description: "If you want to know your activity on a month, choose this report<br>"
			+ "Options: the month, and optionnaly the examiner and the center.<br>",
		    params: [ "center", "examiner", "month" ],
		    templateUrl: templateReportBase + "activity.php"
		},
//		'monthlyStatistical': {
//		    name: 'Monthly Statistical Report',
//		    description: "If you want to know the monthly activity of the SARPV CDC, choose this report<br>"
//			+ "Options: the month.",
//		    params: [ "month" ],
//		    templateUrl: templateReportBase + "statistical.php"
//		},
		'consultations': {
		    name: 'Consultations planned',
		    description: "List of consultations planned on a specific day in a specific center.<br>"
			+ "See also the button in the menu<br>"
			+ "Options: the day and the center.",
		    params: [ "day", "center" ],
		    templateUrl: templateReportBase + "consultations.php"
		},
		'statistical': {
		    name: 'Statistical Report',
		    description: "If you want to know the activity of the SARPV CDC on a period, choose this report",
		    params: [ "period", "center", "examiner" ],
		    dataGenerator: "statistical",
		    templateUrl: templateReportBase + "statistical.php"
		},
		'surgical': {
		    name: 'Surgical Report',
		    description: "Follow up of the surgical activity of the period",
		    params: [ "period" ],
		    dataGenerator: 'surgical',
		    templateUrl: templateReportBase + "surgery.php"
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
		console.log("1 " + name);
		if (name == $scope.values['period']) {
		    console.log("2 " + name);
		    return true;
		}
	    }
	    console.log("3 " + name);
	    return $scope.reports[report]['params'].indexOf(name) > -1;
	}

	$scope.refresh = function() {
	    if (!report) {
		return;
	    }
	    $scope.result = null;
	    
	    if ($scope.values.day) {
		$scope.values.day = new Date($scope.values.day);
		$scope.values.day.setUTCHours(0, 0, 0, 0);
	    }

	    angular.forEach($scope.reports[report].params, function(v) {
		console.info("saving " + v + " = " + $scope.values[v]);
		cache_commons.set(v, $scope.values[v]);
	    });

	    // TODO: the name of the report could be different than the index
	    // TODO: add here the daily / ...
	    var dataGenerator = report;
	    if (typeof($scope.reports[report].dataGenerator) != 'undefined') {
		dataGenerator = $scope.reports[report].dataGenerator;
	    }
	    service_backend.getReport(dataGenerator, 
		    	$scope.values, 
		    	($scope.isParam('period') ? $scope.values.period : null)
		    )
		    .done(function(data) {
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
