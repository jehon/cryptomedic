"use strict";

mainApp.controller('ctrl_file_clubfoots', [ '$scope', 'service_backend', function($scope, service_backend) {
	function f(val) {
		if (val == null) return 0;
		if (typeof(val) == "string") return parseFloat(val);
		return val;
	}

	$scope.getPiraniLeft = function() {
		return f($scope.currentFile().CurvedLateralBorderLeft)
			+ f($scope.currentFile().MedialCreaseLeft)
			+ f($scope.currentFile().TalarHeadCoverageLeft)
			+ f($scope.currentFile().PosteriorCreaseLeft)
			+ f($scope.currentFile().RigidEquinusLeft)
			+ f($scope.currentFile().EmptyHeelLeft)
	};

	$scope.getPiraniRight = function() {
		return f($scope.currentFile().CurvedLateralBorderRight)
			+ f($scope.currentFile().MedialCreaseRight)
			+ f($scope.currentFile().TalarHeadCoverageRight)
			+ f($scope.currentFile().PosteriorCreaseRight)
			+ f($scope.currentFile().RigidEquinusRight)
			+ f($scope.currentFile().EmptyHeelRight)
	};

}]);
