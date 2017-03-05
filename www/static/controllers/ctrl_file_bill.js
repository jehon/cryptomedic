/* global Payment,goThere,extractPrefsFile */

function ctrl_file_bill($scope) {
  /*
    Prices are at
        $scope.appStateStore.connection.settings.prices

        appState().store.getState().connection.settings.prices
  */

  $scope.paymentEditor = new Payment();

  $scope.payments = [];
  if ($scope.subid) {
    getDataService()
      .then(dataService => {
        dataService.getFolder('Bill', $scope.subid)
          .then(bfolder => {
            $scope.bfolder = bfolder;
            $scope.safeApply();
          })
      })
  }

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

  $scope.actionAddPayment = function() {
    if (!$scope.actionValidate()) {
      alert('You have errors in your data. Please correct them and try again');
      return ;
    }
    $scope.paymentEditor.bill_id = $scope.subid;
    $scope.bfolder = null;
    $scope.safeApply();

    extractPrefsFile($scope.paymentEditor);

    getDataService()
      .then(dataService => dataService.createOrSaveFile($scope.paymentEditor))
      .then(function() {
        // The data is refreshed by navigating away...
        $scope.$emit('message', { 'level': 'success', 'text': 'The Payment has been saved.'});
        $scope.safeApply();
      })
      .then(() => {
        getDataService()
          .then(dataService => dataService.getFolder('Bill', $scope.subid))
          .then(bfolder => {
            $scope.bfolder = bfolder;
            $scope.paymentEditor = new Payment();
            $scope.safeApply();
          })
          ;
      })
  }

  $scope.actionDeletePayment = function(id) {
    let data = $scope.bfolder.getSubFileByType('Payment', id);
    getDataService()
      .then(dataService => dataService.deleteFile(data))
      .then(function() {
        // The data is refreshed by navigating away...
        $scope.$emit('message', { 'level': 'success', 'text': 'The Payment has been deleted.'});
        $scope.safeApply();
      })
      .then(() => {
        getDataService()
          .then(dataService => dataService.getFolder('Bill', $scope.subid))
          .then(bfolder => {
            $scope.bfolder = bfolder;
            $scope.paymentEditor = new Payment();
            $scope.safeApply();
          })
          ;
      })
  }

  $scope.actionEditPayment = function(id) {
    let data = new Payment($scope.bfolder.getSubFileByType('Payment', id));
    $scope.paymentEditor = data;
  }

  $scope.getPaymentTotal = function() {
    if (!$scope.bfolder) {
      return "?";
    }
    return $scope.bfolder.getSubFiles().reduce((acc, file) => {
      return acc + (file.Amount ? file.Amount : 0)
    }, 0);
  }
}

ctrl_file_bill.$inject = [ "$scope" ];
