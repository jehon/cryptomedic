
cryptoApp.controller('ctrl_file', [ '$scope', '$location', 'service_rest', '$routeParams' , function($scope, $location, service_rest, $routeParams) { 
	$scope.file = [];

	var busyEnd = $scope.doBusy("Getting the file from the server");
	service_rest.getFile($routeParams['id'])
		.done(function(data) {
			console.log(data);
			$scope.Patient = data['Patient'];
		})
		.fail(function(data) {
			console.error(data);
		}).always(function() {
			busyEnd();
		});

	
}]);