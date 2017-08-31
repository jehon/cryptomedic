/* global Payment,goThere,extractPrefsFile */

function ctrl_file_bill($scope) {
  /*
    Prices are at
        $scope.appStateStore.connection.settings.prices

        appState().store.getState().connection.settings.prices
  */

  $scope.paymentEditor = new Payment();

  $scope.paymentsList = function() {
    if ($scope.folder) {
      return $scope.folder.getFilesRelatedToBill($scope.subid);
    }
    return [];
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
    if (!$scope.actionValidate("#paymentForm")) {
      alert('You have errors in your data. Please correct them and try again');
      return ;
    }

    let updatedData = formGetContent("#paymentForm", new Payment());

    updatedData.id = $scope.paymentEditor.id;
    updatedData.bill_id = $scope.subid;
    $scope.safeApply();

    extractPrefsFile(updatedData);

    getDataService()
      .then(dataService => dataService.createOrSaveFile(updatedData))
      .then(function(folder) {
        // The data is refreshed by navigating away...
        $scope.$emit('message', { 'level': 'success', 'text': 'The Payment has been saved.'});
        $scope.folder = folder;
        $scope.paymentEditor = new Payment();
        $scope.safeApply();
      })
  }

  $scope.actionDeletePayment = function(id) {
    getDataService()
      .then(dataService => dataService.deleteFile($scope.folder.getByTypeAndId(Payment, id)))
      .then(function(folder) {
        // The data is refreshed by navigating away...
        $scope.$emit('message', { 'level': 'success', 'text': 'The Payment has been deleted.'});
        $scope.folder = folder;
        $scope.paymentEditor = new Payment();
        $scope.safeApply();
      })
  }

  $scope.actionEditPayment = function(id) {
    $scope.paymentEditor = new Payment($scope.folder.getByTypeAndId(Payment, id));
  }

  $scope.getPaymentTotal = function() {
    if (!$scope.folder) {
      return "?";
    }
    return $scope.folder.getFilesRelatedToBill($scope.subid).reduce((acc, file) => {
      return acc + (file.Amount ? file.Amount : 0)
    }, 0);
  }

  $scope.isEmpty = function(value) {
    if (value == "" || value == "0" || value == 0 || value == "-1" || value == -1 || value == null) {
      return "emptyValue";
    }
    return "";
  }
}

ctrl_file_bill.$inject = [ "$scope" ];
