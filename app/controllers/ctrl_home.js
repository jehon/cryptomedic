
/* istanbul ignore file */
/* eslint-disable */

import getDataService from '../js/getDataService.js';
import goThere from '../js/goThere.js';
import { getRouteToCreateReference } from '../js/router.js';
import '../elements/render/x-button.js';
// import '../elements/pages/x-home.js';

import '../elements/components/x-patient-by-reference.js';

export default function ctrl_home($scope) {
    $scope.getRouteToCreateReference = function () {
        return getRouteToCreateReference();
    };
}

ctrl_home.$inject = ['$scope'];
