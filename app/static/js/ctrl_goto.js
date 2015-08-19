
mainApp.controller('ctrl_goto', [ '$scope', '$routeParams', 'service_backend', function($scope, $routeParams, service_backend) {
	$scope.goToFiche = function(patient_id, type, id) {
		service_backend.getFolder(patient_id).then(function(parent) {
			var j = 0;
			angular.forEach(parent.getSubFiles(), function(v, i) {
				if ((v['_type'] == type) && (v['id'] == id)) {
					j = i;
				}
			});
			$scope.go("/folder/" + parent.getId() + "/" + j, true);
		});
	};

	console.log("Redirecting to the correct fiche: " + $routeParams['type'] + "#" + $routeParams['id'])
	$scope.goToFiche($routeParams['patient_id'], $routeParams['type'], $routeParams['id']);
}]);	
