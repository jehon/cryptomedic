
/* istanbul ignore file */

import angular from 'angular';
import 'angular-route';

import ctrl_file_appointment from './ctrl_file_appointment.js';
import ctrl_file_bill from './ctrl_file_bill.js';
import ctrl_folder from './ctrl_folder.js';
import ctrl_home from './ctrl_home.js';
import ctrl_prices from './ctrl_prices.js';
import ctrl_reports from './ctrl_reports.js';
import ctrl_search from './ctrl_search.js';
import ctrl_users from './ctrl_users.js';

import { parseRouteLogin, parseRouteApi } from '../js/router.js';
import template from '../js/template.js';
import goThere from '../js/goThere.js';

import '../elements/widgets/x-restricted.js';


let mainApp = angular.module('app_main', ['ngRoute'])
    .config(['$compileProvider', function ($compileProvider) {
        $compileProvider.aHrefSanitizationWhitelist(/^\s*((https?|ftp|mailto|chrome-extension):|data:text,)/);
        $compileProvider.imgSrcSanitizationWhitelist($compileProvider.aHrefSanitizationWhitelist());
    }])
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
mainApp.controller('ctrl_home', ctrl_home);
mainApp.controller('ctrl_reports', ctrl_reports);
mainApp.controller('ctrl_search', ctrl_search);
mainApp.controller('ctrl_users', ctrl_users);
mainApp.controller('ctrl_prices', ctrl_prices);

mainApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/login/:redirect*?', {
            template: function (_params) {
                // Thanks to https://stackoverflow.com/a/34217927/1954789
                return import(/* webpackChunkName: "x-login-form", webpackPrefetch: true */'../elements/pages/x-login-form.js')
                    .then(() => `<x-login-form redirect=${parseRouteLogin().redirect}></x-login-form>`);
            }
        })
        .when('/redirect/api/:redirect*?', {
            template: function (_params) {
                // Thanks to https://stackoverflow.com/a/34217927/1954789
                window.location.href = parseRouteApi().redirect;
            }
        })
        .when('/home', {
            templateUrl: template('page', 'home'),
            controller: 'ctrl_home'
        }).when('/folder/:patient_id/:page?/:subtype?/:subid?/:mode?', {
            templateUrl: template('folder'),
            controller: 'ctrl_folder',
        }).when('/search', {
            templateUrl: template('page', 'search'),
            controller: 'ctrl_search',
        }).when('/reports/:report?', {
            templateUrl: template('reports'),
            controller: 'ctrl_reports',
        }).when('/users', {
            templateUrl: template('page', 'users'),
            controller: 'ctrl_users',
        }).when('/prices', {
            templateUrl: template('page', 'prices'),
            controller: 'ctrl_prices',
        }).otherwise({ 'redirectTo': '/home' });
}]);

