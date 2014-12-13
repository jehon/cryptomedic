
mainApp.controller('ctrl_goto', [ '$scope', '$routeParams', 'service_backend', function($scope, $routeParams, service_backend) {
	$scope.goToFiche = function(type, id) {
		service_backend.getParent(type, id).then(function(parent) {
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
	$scope.goToFiche($routeParams['type'], $routeParams['id']);
}]);	
