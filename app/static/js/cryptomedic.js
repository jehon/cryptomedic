"use strict";

var cryptomedic = {};
{
    var path = location.pathname.split("/");
    cryptomedic.flavor = "/" + path[1];
}
cryptomedic.templateRoot = cryptomedic.flavor + "/cache/templates";
cryptomedic.settings = {};

mainApp.config([ '$routeProvider', function($routeProvider) {
    $routeProvider
    .when('/home', {
        templateUrl: cryptomedic.templateRoot + '/pages/home.html',
        controller: 'ctrl_home'
    }).when('/login', {
        templateUrl: cryptomedic.templateRoot + '/pages/login.html',
        controller: 'ctrl_login',
    }).when('/folder/:patient_id/:page?/:subtype?/:subid?/:mode?', {
        templateUrl: cryptomedic.templateRoot + '/pages/folder.php',
        controller: 'ctrl_folder',
    }).when('/search', {
        templateUrl: cryptomedic.templateRoot + '/pages/search.php',
        controller: 'ctrl_search',
    }).when('/reports/:report?', {
        templateUrl: cryptomedic.templateRoot + '/pages/reports.php',
        controller: 'ctrl_reports',
    }).when('/users', {
        templateUrl: cryptomedic.templateRoot + '/pages/users.html',
        controller: 'ctrl_users',
    }).otherwise({ 'redirectTo': '/home'});
}]);
