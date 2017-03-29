function ctrl_search($scope) {
  if (typeof($scope.params) == 'undefined') {
    $scope.params = {};
  }

  if (typeof($scope.listing) == 'undefined') {
    $scope.listing = [];
  }

  $scope.page = function() {
    // TODO GUI: render the results in pages of 20 ?
    $scope.currentPage = $scope.listing;
  };

  $scope.submit = function() {
    let updatedData = getFormContent("#searchForm");

    getDataService()
      .then(dataService => dataService.searchForPatients(updatedData))
      .then(function(data) {
        $scope.listing = data;
        $scope.page();
        $scope.safeApply();
      }, function(data) {
        console.error(data);
      });
  };

  $scope.reset = function() {
    $scope.params = {};
    $scope.listing = [];
    $scope.safeApply();
  };
}

ctrl_search.$inject = [ "$scope" ];
