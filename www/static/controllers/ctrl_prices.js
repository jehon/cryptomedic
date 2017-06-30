
function ctrl_prices($scope) {
  $scope.prices = {};
  $scope.edit = false;
  $scope.creating = false;

  $scope.refresh = function() {
    getDataService()
      .then(dataService => Price.list(dataService))
      .then((data) => {
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

    console.log("create");
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

    getDataService()
      .then(dataService => Price.create(dataService, { pivot: updatedData.pivotDate }))
      .then((data) => {
        console.log("Created: ", data);
        $scope.creating = false
        $scope.prices.unshift(data);
        $scope.edit(0);
        $scope.safeApply();
      });
  }

  //
  // Edit an existing price list
  //
  $scope.actionEdit = function(index) {
    console.log("edit: ", index);
    // $scope.edit = <clone> $scope.prices[index];
  }

  //
  // Delete an existing price list
  //
  $scope.actionDelete = function(index) {
    getDataService()
      .then(dataService => Price.remove(dataService, $scope.prices[index].id))
      .then(() => $scope.refresh());
  }

  // 
  // Finish editing -> cancel
  // 
  $scope.doCancel = function() {
    console.log("Cancelling");
    // $scope.edit = false;
    // $scope.safeApply();
  };

  // 
  // Finish editing -> save modifications
  // 
  $scope.doSave = function() {
    console.log("Saving");
    // getDataService()
    //   .then(dataService => dataService.userUpdate($scope.edit))
    //   .then(function(data) {
    //     $scope.users = data;
    //     $scope.safeApply();
    //     $scope.$emit('message', { 'level': 'success', 'text': 'The user \'' + $scope.edit.username + '\' has been saved successfully.'});
    //     $scope.doCancel();
    //   });
  };

  $scope.doCancel();
  $scope.refresh();
}

ctrl_prices.$inject = [ "$scope" ];
