
/* istanbul ignore file */
/* eslint-disable */

import getDataService from '../js/getDataService.js';
import goThere from '../js/goThere.js';
import { getRouteToCreateReference } from '../js/router.js';
import '../elements/widgets/x-button.js';

export default function ctrl_home($scope) {
    if (typeof ($scope.entryyear) == 'undefined') {
        $scope.searched = false;
        $scope.entryyear = (new Date()).getFullYear();
        $scope.entryorder = '';
    }

    $scope.resetSearched = function () {
        $scope.searched = false;
    };

    $scope.checkReference = function () {
        getDataService()
            .then(dataService => dataService.checkReference($scope.entryyear, $scope.entryorder))
            .then(function (data) {
                if (!data.id) {
                    $scope.searched = true;
                } else {
                    setTimeout(function () {
                        goThere('/folder/' + data.id);
                    }, 1);
                }
            }, function (data) {
                console.error(data);
            });
        $scope.searched = true;
    };

    $scope.createReference = function () {
        getDataService()
            .then(dataService => dataService.createReference($scope.entryyear, $scope.entryorder))
            .then(function (data) {
                // end the busy mode
                setTimeout(function () {
                    goThere('/folder/' + data.id + '/edit');
                }, 1);
            }, function (data) {
                console.error(data);
            });
        $scope.searched = true;
    };

    $scope.getRouteToCreateReference = function() {
        return getRouteToCreateReference();
    };
}

ctrl_home.$inject = ['$scope'];
