/* global Payment,goThere,extractPrefsFile */

function ctrl_file_bill($scope, $element) {
    /*
      Prices are at
          window.cryptomedic.serverSettings.prices
    */

    $scope.paymentEditor = new Payment();

    $scope.paymentsList = function() {
        if ($scope.folder) {
          return $scope.folder.getFilesRelatedToBill($scope.subid);
        }
        return [];
    }

    $scope.rebuildList = function() {
        const list = $element[0].querySelectorAll("block-bill-category").reduce((acc, bl) => {
            return acc.concat(bl.getBillLines());
        }, []);
        $scope.currentFile().bill_lines = list;
        $scope.safeApply();
    }

    $element[0].querySelectorAll('block-bill-category').forEach(el => el.addEventListener('change', () => {
        $scope.rebuildList();
        $scope.currentFile().calculate_total_real();
    }));

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
        try {
            $scope.currentFile().ratioSalary();
        } catch (e) {
            // Nothing to do
        }
    });

    $scope.$watch('currentFile().sl_familySalary', function() {
        try {
            $scope.currentFile().ratioSalary();
        } catch (e) {
            // Nothing to do
        }
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

    // $scope.getPaymentTotal = function() {
    //     if (!$scope.folder) {
    //         return "?";
    //     }
    //     return $scope.folder.getFilesRelatedToBill($scope.subid).reduce((acc, file) => {
    //         return acc + (file.Amount ? parseInt(file.Amount, 10) : 0)
    //     }, 0);
    // }

    // Used in bill_summary
    $scope.isEmpty = function(value) {
        if (value == "" || value == "0" || value == 0 || value == "-1" || value == -1 || value == null) {
            return "emptyValue";
        }
        return "";
    }
}

// ctrl_file_bill.$inject = [ "$scope", "$element" ];
