
/* istanbul ignore file */
/* eslint-disable */

// AngularJS
import jQuery from 'jquery/src/jquery.js';
window.jQuery = jQuery;

import angular from 'angular';
import 'angular-route';

import ctrl_file_appointment from './ctrl_file_appointment.js';
import ctrl_file_bill from './ctrl_file_bill.js';
import ctrl_folder from './ctrl_folder.js';
import ctrl_prices from './ctrl_prices.js';

import { createElementWithObject } from '../js/custom-element.js';
import template from '../js/template.js';
import goThere from '../js/goThere.js';

import '../elements/funcs/x-restricted.js';
import '../elements/funcs/x-i18n.js';

import '../elements/widgets/x-login-status.js';

import JHElement from '../elements/jh-element.js';
window.JHElement = JHElement;
import '../elements/x-overlay.js';
import XRequestor from '../elements/x-requestor.js';
window.XRequestor = XRequestor;
import '../elements/x-requestor-crud.js';
import '../elements/cryptomedic-data-service.js';

import '../elements/jh-script.js';
import '../elements/block-bill-category.js';
import '../elements/block-bill-line.js';
import '../elements/edit-price.js';
import '../elements/x-inline.js';
import '../elements/x-input-date.js';
import XInputPicture from '../elements/x-input-picture.js';
window.XInputPicture = XInputPicture;
import '../elements/x-read.js';
import '../elements/x-read-boolean.js';
import '../elements/x-write.js';
import '../elements/x-write-list.js';

import XFile from '../elements/x-file.js';
window.XFile = XFile;
import '../elements/x-file-bill.js';
import '../elements/x-file-bill-summary.js';

import '../elements/widgets/file/x-fff-age.js';
import '../elements/render/x-group-panel.js';
import '../elements/render/x-label.js';

let mainApp = angular.module('app_main', ['ngRoute'])
    // .config(['$compileProvider', function ($compileProvider) {
    //     $compileProvider.aHrefSanitizationWhitelist(/^\s*((https?|ftp|mailto|chrome-extension):|data:text,)/);
    //     $compileProvider.imgSrcSanitizationWhitelist($compileProvider.aHrefSanitizationWhitelist());
    // }])
    .config(['$locationProvider', function ($locationProvider) {
        $locationProvider.hashPrefix('');
    }]);

mainApp.controller('ctrl', ['$scope', function ($scope) {
    // Global variables intorduced into the scope:
    $scope.template = template;

    $scope.safeApply = function (fn) {
        if (this.$root && (this.$root.$$phase == '$apply' || this.$root.$$phase == '$digest')) {
            if (fn && (typeof (fn) === 'function')) {
                fn();
            }
        } else {
            this.$apply(fn);
        }
    };

    $scope.go = function (path) {
        goThere(path);
    };

    $scope.$on('$routeChangeError', function () { console.error('error in routes', arguments); });
}]);

mainApp.controller('ctrl_file_appointment', ctrl_file_appointment);
mainApp.controller('ctrl_file_bill', ctrl_file_bill);
mainApp.controller('ctrl_folder', ctrl_folder);
mainApp.controller('ctrl_prices', ctrl_prices);

import XPageLogin from '../elements/pages/x-page-login.js';
import XPageHome from '../elements/pages/x-page-home.js';
import XPageSearch from '../elements/pages/x-page-search.js';
import XPageReports from '../elements/pages/x-page-reports.js';
import XPageUserEdit from '../elements/pages/x-page-user-edit.js';
import XPageUserPassword from '../elements/pages/x-page-user-password.js';
import XPageUsersList from '../elements/pages/x-page-users-list.js';

// template: function (_params) {
//     // Thanks to https://stackoverflow.com/a/34217927/1954789
//     return `<x-page-login redirect=${parseRouteLogin().redirect}></x-page-login>`;
// }

// template: function (_params) {
//     // Thanks to https://stackoverflow.com/a/34217927/1954789
//     window.location.href = redirect;
// }

function goToElement(el, params = {}) {
    return createElementWithObject(el, params);
}

mainApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/login/:redirect*?', {
            template: (params) => goToElement(XPageLogin, params)
        })
        .when('/home', {
            template: () => goToElement(XPageHome)
        })
        .when('/search', {
            template: () => goToElement(XPageSearch)
        })
        .when('/folder/:patient_id/:page?/:subtype?/:subid?/:mode?', {
            templateUrl: template('folder'),
            controller: 'ctrl_folder',
        })
        .when('/reports/:report', {
            template: (params) => goToElement(XPageReports, params)
        })
        .when('/users/:uid/password', {
            template: (params) => goToElement(XPageUserPassword, params)
        })
        .when('/users/:uid', {
            template: (params) => goToElement(XPageUserEdit, params)
        })
        .when('/users', {
            template: () => goToElement(XPageUsersList)
        })
        .when('/prices', {
            templateUrl: template('page', 'prices'),
            controller: 'ctrl_prices',
        })
        .otherwise({ 'redirectTo': '/home' });
}]);
