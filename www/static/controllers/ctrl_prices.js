
function ctrl_prices($scope, $timeout) {
  $scope.prices = {};
  $scope.edit = false;
  $scope.creating = false;

  $scope.refresh = function() {
    getDataService("#pricesRequestor")
      .then(dataService => { console.log(dataService); return dataService; })
      .then(dataService => dataService.list())
      .then(data => {
        data.sort((a, b) => {
          // Left(smal) == bigger datefrom
          if (a == null || a.datefrom == null || a.datefrom == "") {
            return 1;
          }
          if (b == null || b.datefrom == null || b.datefrom == "") {
            return -1;
          }

          if (a.datefrom == b.datefrom) {
            return 0;
          }

          if (a.datefrom > b.datefrom) {
            return -1;
          }

          return 1;
        });
        $scope.prices = data;
        $scope.safeApply();
      });
  };

  // Filter elements out that does not need to be displayed !
  $scope.getElements = function() {
    if (!$scope.prices || $scope.prices.length == 0 || !$scope.prices[0]) {
      return [];
    }
    let list = Object.keys($scope.prices[0]);
    list = list.filter(v => {
      if (v[0] == "$")                                { return false; }
      if (v[0] == "_")                                { return false; }
      if (v == "created_at")                          { return false; }
      if (v == "updated_at")                          { return false; }
      if (v == "datefrom")                            { return false; }
      if (v == "dateto")                              { return false; }
      if (v == "lastuser")                            { return false; }
      if (v == "id")                                  { return false; }
      if (v.substr(0, 21) == "socialLevelPercentage") { return false; }
      return true;
    });
    list.sort();
    return list;
  };

  // Editing ?
  // ==> soit on édit le dernier
  //     si: activation n'est pas aujourd'hui
  //     si: pas d'utilisation avérée
  //   alors: proposition d'éditer le dernier prix
  //   sinon: ajout d'un nouveau
  //

  $scope.canAddOne = function() {
    if (!$scope.prices) {
      return false;
    }
    for(let i of Object.keys($scope.prices)) {
      if ($scope.prices[i]._editable) {
        return false;
      }
    }
    return true;
  }

  //
  // Create a new price list if possible
  //
  $scope.actionCreate = function() {
    // Ask for the various parameters before creating the new price

    $scope.creating = true;
  }

  $scope.doCreate = function() {
    // Create the price server-side, and then edit it here...
    let updatedData = formGetContent("#form_creating", {});
    let pivotDate = new Date(updatedData.pivotDate);

    let limit = new Date();
    limit.setDate(limit.getDate() + 5);

    if (pivotDate < limit) {
      this.error_date = true;
      return ;
    }
    this.error_date = false;

    getDataService("#pricesRequestor")
      .then(dataService => dataService.create({ pivot: updatedData.pivotDate }))
      .then((data) => {
        $scope.creating = false
        $scope.prices.unshift(data);
        $scope.actionEdit(0);
        $scope.safeApply();
      });
  }

  //
  // Edit an existing price list
  //
  $scope.actionEdit = function(index) {
    $scope.creating = false;
    $scope.edit = index;

    $timeout(function(){
      for(let k of Object.keys($scope.prices[index])) {
        $scope.updateRadio(k, $scope.prices[index][k]);
      }
    })
  }

  // 
  // Finish editing -> save modifications
  // 
  $scope.doSave = function() {
    let updatedData = formGetContent("#editForm", $scope.prices[$scope.edit]);
    getDataService("#pricesRequestor")
      .then(dataService => dataService.update(updatedData))
      .then(function(data) {
        for(let i of Object.keys($scope.prices)) {
          if ($scope.prices[i].id == data.id) {
            $scope.prices[i] = data;
          }
        }
        $scope.safeApply();
        $scope.$emit('message', { 'level': 'success', 'text': 'The user \'' + $scope.edit.username + '\' has been saved successfully.'});
        $scope.doCancel();
      });
  };

  //
  // Delete an existing price list
  //
  $scope.doDelete = function(index) {
    getDataService("#pricesRequestor")
      .then(dataService => dataService.delete($scope.prices[index].id))
      .then(() => $scope.doCancel())
      .then(() => $scope.refresh())
      ;
  }

  // 
  // Finish editing -> cancel
  // 
  $scope.doCancel = function() {
    $scope.edit = false;
    $scope.creating = false;
    $scope.safeApply();
  };

  $scope.updateRadio = function(k, val) {
    let input = document.querySelector("input[name='" + k + "']");
    if (input === null) {
      return ;
    }
    if (val == -1 || val == 1) {
      input.style.visibility = "hidden";
    } else {
      input.style.visibility = "visible";
    }
  }

  $scope.doCancel();
  $scope.refresh();
}

ctrl_prices.$inject = [ "$scope", "$timeout" ];
