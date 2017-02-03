
function ctrl_file_bill($scope) {
  /*
    Prices are at
        $scope.appStateStore.connection.settings.prices

        appState().store.getState().connection.settings.prices
  */

  $scope.paymentAdd = {};

  $scope.payments = [];
  getDataService()
    .then(dataService => {
      dataService.getFolder('Bill', $scope.subid)
        .then(bfolder => {
          console.log(bfolder);
          $scope.bfolder = bfolder;
          $scope.safeApply();
        })
    })


  $scope.$watch(function() {
    return window.cryptomedic.serverSettings.prices;
  }, function() {
    $scope.currentFile().calculatePriceId();
    $scope.safeApply();
  });

  $scope.$watch('currentFile().Date', function() {
    if ($scope.currentFile() && $scope.currentFile().calculatePriceId) {
      $scope.currentFile().calculatePriceId(window.cryptomedic.serverSettings.prices);
      $scope.safeApply();
    } else {
      $scope.safeApply();
    }
  });

  $scope.$watch('currentFile().sl_numberOfHouseholdMembers', function() {
    $scope.currentFile().ratioSalary();
  });

  $scope.$watch('currentFile().sl_familySalary', function() {
    $scope.currentFile().ratioSalary();
  });
}

ctrl_file_bill.$inject = [ "$scope" ];
