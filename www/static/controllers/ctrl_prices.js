
function ctrl_prices($scope) {
  $scope.prices = {};
  $scope.edit = false;

  $scope.refresh = function() {
    getDataService()
      .then(dataService => Price.list(dataService))
      .then(function(data) {
        $scope.prices = data;
        $scope.safeApply();
      });
  };

  $scope.getElements = function() {
    if (!$scope.prices || $scope.prices.length == 0 || !$scope.prices[0]) {
      return [];
    }
    let list = Object.keys($scope.prices[0]);
    list = list.filter(v => {
      if (v[0] == "$")                                { return false; }
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

  // $scope.doAdd = function() {
  //   $scope.edit = {
  //     'id' : -1
  //   };
  // };

  /*** EDIT ****/
  $scope.doCancel = function() {
    $scope.edit = false;
    $scope.safeApply();
  };

  // $scope.doEdit = function(index) {
  //   $scope.edit = $scope.users[index]; // Put object here
  // };

  // $scope.doSave = function() {
  //   if ($scope.edit.id >= 0) {
  //     getDataService()
  //       .then(dataService => dataService.userUpdate($scope.edit))
  //       .then(function(data) {
  //         $scope.users = data;
  //         $scope.safeApply();
  //         $scope.$emit('message', { 'level': 'success', 'text': 'The user \'' + $scope.edit.username + '\' has been saved successfully.'});
  //         $scope.doCancel();
  //       });
  //   } else {
  //     getDataService()
  //       .then(dataService => dataService.userAdd($scope.edit))
  //       .then(function(data) {
  //         $scope.users = data;
  //         $scope.safeApply();
  //         $scope.$emit('message', { 'level': 'success', 'text': 'The user \'' + $scope.edit.username + '\' has been created successfully.'});
  //         $scope.doCancel();
  //       });
  //   }
  // };

  // $scope.doDelete = function() {
  //   if (confirm('Are you sure you want to delete user \'' + $scope.edit.name + '\'?')) {
  //     getDataService()
  //       .then(dataService => dataService.userDelete($scope.edit.id))
  //       .then(function(data) {
  //         $scope.$emit('message', { 'level': 'success', 'text': 'The user \'' + $scope.edit.username + '\' has been deleted successfully.'});
  //         $scope.users = data;
  //         $scope.doCancel();
  //       });
  //   }
  // };

  $scope.doCancel();
  $scope.refresh();
}

ctrl_prices.$inject = [ "$scope" ];
