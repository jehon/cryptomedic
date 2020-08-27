
/* istanbul ignore file */
/* eslint-disable */

import getDataService from '../js/getDataService.js';
import '../elements/widgets/x-button.js';

// TODO: manage change in groups

export default function ctrl_users($scope) {
    $scope.users = {};
    $scope.edit = false;
    $scope.password = false;

    $scope.refresh = function () {
        getDataService()
            .then(dataService => dataService.usersList())
            .then(function (data) {
                $scope.users = data;
                $scope.safeApply();
            });
    };

    $scope.emailAll = function () {
        var res = '';
        for (var i in $scope.users) {
            if ($scope.users[i].email) {
                res += $scope.users[i].name + '<' + $scope.users[i].email + '>,';
            }
        }
        return res;
    };

    $scope.doAdd = function () {
        $scope.edit = {
            'id': -1
        };
    };

    // *** EDIT ****
    $scope.doCancel = function () {
        $scope.edit = false;
        $scope.password = false;
        $scope.safeApply();
    };

    $scope.doEdit = function (index) {
        $scope.edit = $scope.users[index]; // Put object here
        $scope.password = false;
        $scope.safeApply();
    };

    $scope.doSave = function () {
        if ($scope.edit.id >= 0) {
            getDataService()
                .then(dataService => dataService.userUpdate($scope.edit))
                .then(function (data) {
                    $scope.users = data;
                    $scope.safeApply();
                    $scope.$emit('message', { 'level': 'success', 'text': 'The user \'' + $scope.edit.username + '\' has been saved successfully.' });
                    $scope.doCancel();
                });
        } else {
            getDataService()
                .then(dataService => dataService.userAdd($scope.edit))
                .then(function (data) {
                    $scope.users = data;
                    $scope.safeApply();
                    $scope.$emit('message', { 'level': 'success', 'text': 'The user \'' + $scope.edit.username + '\' has been created successfully.' });
                    // $scope.doShowPassword();
                    $scope.doCancel();
                });
        }
    };

    $scope.doDelete = function () {
        if (confirm('Are you sure you want to delete user \'' + $scope.edit.name + '\'?')) {
            getDataService()
                .then(dataService => dataService.userDelete($scope.edit.id))
                .then(function (data) {
                    $scope.$emit('message', { 'level': 'success', 'text': 'The user \'' + $scope.edit.username + '\' has been deleted successfully.' });
                    $scope.users = data;
                    $scope.doCancel();
                });
        }
    };

    // *** Passwords ****

    $scope.doShowPassword = function (index) {
        $scope.password = $scope.users[index];
    };

    $scope.doSavePassword = function () {
        getDataService()
            .then(dataService => dataService.userPassword($scope.password.id, $scope.password.newcode))
            .then(function () {
                $scope.$emit('message', { 'level': 'success', 'text': 'The password of user \'' + $scope.password.username + '\' has been updated successfully.' });
                $scope.doCancel();
                // $scope.safeApply();
            });
    };

    $scope.doCancel();
    $scope.refresh();
}

ctrl_users.$inject = ['$scope'];
