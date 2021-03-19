
/* istanbul ignore file */
/* eslint-disable */

import getDataService from '../js/getDataService.js';
import '../elements/render/x-button.js';

// TODO: manage change in groups

export default function ctrl_users($scope) {
    $scope.users = {};

    $scope.emailAll = function () {
        var res = '';
        for (var i in $scope.users) {
            if ($scope.users[i].email) {
                res += $scope.users[i].name + '<' + $scope.users[i].email + '>,';
            }
        }
        return res;
    };

    getDataService()
        .then(dataService => dataService.usersList())
        .then(function (data) {
            $scope.users = data;
            $scope.safeApply();
        });
}

ctrl_users.$inject = ['$scope'];
