/* global Payment,goThere,extractPrefsFile */

function ctrl_file_bill($scope, $element) {
    /*
      Prices are at
          window.cryptomedic.serverSettings.prices
    */

    $scope.rebuildData = function() {
        if (!$scope.currentFile()) {
            return false;
        }
        const newData = formGetContent($element[0].querySelectorAll('[editable-bill]'), $scope.currentFile());

        newData.bill_lines = Array.from($element[0].querySelectorAll("block-bill-category")).reduce((acc, bl) => {
            return acc.concat(bl.getBillLines());
        }, []);

        // Calculate totals
        newData.calculateTotalAsked();

        errors = this.currentFile().validate();

        $element[0].querySelectorAll("[error]").forEach(el => el.setAttribute("hidden", "hidden"));
        Object.keys(errors).forEach(e => {
            $element[0].querySelectorAll(`[error=${e}]`).forEach(el => el.removeAttribute("hidden"));
        })

        return newData;
    }

    $scope.adapt = function() {
        formFillIn($element[0], $scope.currentFile());
        formSwitch($element[0], 'editable-bill', $scope.mode);

        $element[0].querySelectorAll("block-bill-category").forEach(el => el.setAttribute('price-lines', JSON.stringify($scope.currentFile().getPrice().price_lines)));
        $element[0].querySelectorAll("block-bill-category").forEach(el => el.setAttribute('value', JSON.stringify($scope.currentFile().bill_lines)));

        $scope.rebuildData();
    }
    $scope.adapt();

    $element[0].querySelectorAll('[editable-bill]').forEach(el => el.addEventListener('change', () => {
        const newData = $scope.rebuildData();

        // Commit it
        $scope.setCurrentFile(newData);
        formFillIn($element[0], $scope.currentFile());
        $scope.safeApply();
    }));

// TODO: calculated socialLevel to be migrated to SocialLevel

    // $element[0].querySelector("[name=Date]").addEventListener("change", el => {
    //     console.log("Change detected: ", el.getAttribute("name"), el.getValue());
    // })

    // $scope.$watch(function() {
    //     return window.cryptomedic.serverSettings.prices;
    // }, function() {
    //     $scope.currentFile().calculatePriceId();
    //     $scope.currentFile().calculate_total_real();
    //     $scope.safeApply();
    // });

    // $scope.$watch('currentFile().Date', function() {
    //     $scope.rebuildList();
    //     $scope.currentFile().calculate_total_real();
    //     if ($scope.currentFile() && $scope.currentFile().calculatePriceId) {
    //         $scope.currentFile().calculatePriceId(window.cryptomedic.serverSettings.prices);
    //         $scope.safeApply();
    //     } else {
    //         $scope.currentFile().calculatePriceId();
    //         $scope.safeApply();
    //     }
    // });

    // $scope.$watch('currentFile().Sociallevel', function() {
    // })

    // Used in bill_summary
    $scope.isEmpty = function(value) {
        if (value == "" || value == "0" || value == 0 || value == "-1" || value == -1 || value == null) {
            return "emptyValue";
        }
        return "";
    }

    /**********************/
    /* Payment management */
    /**********************/

    $scope.paymentEditor = new Payment();

    $scope.paymentsList = function() {
        if ($scope.folder) {
          return $scope.folder.getFilesRelatedToBill($scope.subid);
        }
        return [];
    }

    $scope.getPaymentTotal = function() {
        return $scope.paymentsList().reduce((sum, value) => {
            return sum + value.Amount;
        }, 0);
    }

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
}
