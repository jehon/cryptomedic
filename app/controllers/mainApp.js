
import angular from 'angular';
import 'angular-route';

import ctrl_allGraphics from './ctrl_allgraphics.js';
import ctrl_file_appointment from './ctrl_file_appointment.js';
import ctrl_file_bill from './ctrl_file_bill.js';
import ctrl_folder from './ctrl_folder.js';
import ctrl_graphic from './ctrl_graphic.js';
import ctrl_home from './ctrl_home.js';
import ctrl_prices from './ctrl_prices.js';
import ctrl_reports from './ctrl_reports.js';
import ctrl_search from './ctrl_search.js';
import ctrl_users from './ctrl_users.js';

import { ApplicationException } from '../js/exceptions.js';
import template from '../js/template.js';
import { API_VERSION } from '../config.js';
import goThere from '../js/goThere.js';
import store from '../js/store.js';

import { evaluatePoly, stdDeviation, sigma } from '../js/math.js';
import { fromBirthDate, toBirthDate, atConsultTime } from '../js/age.js';
const calculations = {
	math: { evaluatePoly, stdDeviation, sigma },
	age: { fromBirthDate, toBirthDate, atConsultTime }
};


let application = {};

let mainApp = angular.module('app_main', ['ngRoute'])
	.config(['$compileProvider', function ($compileProvider) {
		$compileProvider.aHrefSanitizationWhitelist(/^\s*((https?|ftp|mailto|chrome-extension):|data:text,)/);
		$compileProvider.imgSrcSanitizationWhitelist($compileProvider.aHrefSanitizationWhitelist());
	}])
	.config(['$locationProvider', function ($locationProvider) {
		$locationProvider.hashPrefix('');
	}])
	// bill_fiche and consult_introduction:
	.directive('catchIt', function () {
		// http://tutorials.jenkov.com/angularjs/custom-directives.html#compile-and-link
		// http://stackoverflow.com/a/15298620
		return {
			restrict: 'A',
			transclude: true,
			scope: {
				'tryit': '&', // executed in parent scope
			},
			template: '<span ng-if="error" class="catchedError">{{errorMsg}}</span><span ng-if="!error" ng-transclude></span>',
			link:
				function ($scope, $element) {
					function testIt() {
						try {
							$scope.error = false;
							$scope.result = '';
							$scope.errorMSg = '';
							$scope.result = $scope.tryit();
						} catch (e) {
							$scope.error = true;
							if (e instanceof ApplicationException) {
								$scope.errorMsg = e.getMessage();
							} else {
								$scope.errorMsg = 'Uncatchable error';
								console.warn(e);
								throw e;
							}
						}
					}
					$scope.$watch(function () {
						try {
							return $scope.tryit();
						} catch (e) {
							return e.toString();
						}
					}, function () {
						testIt();
					});
					testIt();

					// Destroy of the element
					$element.on('$destroy', function () {
						$scope.$destroy();
					});
				} // end of link function
		};
		// })
		// .directive('nullToInterrogation', function () {
		// 	// https://docs.angularjs.org/api/ng/directive/select
		// 	// usage: <select ng-model='model.id' null-to-interrogation>
		// 	return {
		// 		require: 'ngModel',
		// 		link: function (scope, element, attrs, ngModel) {
		// 			ngModel.$parsers.push(function (val) {
		// 				// From option to model
		// 				if (val == '?') return null;
		// 				return val;
		// 			});
		// 			ngModel.$formatters.push(function (val) {
		// 				// From model to option
		// 				if (val == null) return '?';
		// 				return val;
		// 			});
		// 		}
		// 	};
	});

mainApp.controller('ctrl', ['$scope', function ($scope) {
	// Global variables intorduced into the scope:
	$scope.application = application;
	$scope.calculations = calculations;
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

	$scope.apiUrl = function (url = '/') {
		return '/api/' + API_VERSION + url;
	};

	$scope.go = function (path) {
		goThere(path);
	};

	$scope.authorizedList = [];
	store.subscribe(() => {
		if (!store.getState().definitions) {
			$scope.authorizedList = [];
		} else {
			$scope.authorizedList = store.getState().definitions.authorized;
		}
		$scope.safeApply();
	});
	$scope.isAuthorized = function (value, authorizedList = []) {
		return authorizedList.indexOf(value) >= 0;
	};

	$scope.connected = false;

	$scope.username = '';
	$scope.password = '';

	$scope.$on('$routeChangeError', function () { console.error('error in routes', arguments); });
}]);

mainApp.controller('ctrl_allGraphics', ctrl_allGraphics);
mainApp.controller('ctrl_file_appointment', ctrl_file_appointment);
mainApp.controller('ctrl_file_bill', ctrl_file_bill);
mainApp.controller('ctrl_folder', ctrl_folder);
mainApp.controller('ctrl_graphic', ctrl_graphic);
mainApp.controller('ctrl_home', ctrl_home);
mainApp.controller('ctrl_reports', ctrl_reports);
mainApp.controller('ctrl_search', ctrl_search);
mainApp.controller('ctrl_users', ctrl_users);
mainApp.controller('ctrl_prices', ctrl_prices);

mainApp.config(['$routeProvider', function ($routeProvider) {
	$routeProvider
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

