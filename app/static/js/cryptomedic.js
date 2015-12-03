"use strict";

var cryptomedic = {};
{
    var path = location.pathname.split("/");
    cryptomedic.flavor = "/" + path[1];
}
cryptomedic.templateRoot = cryptomedic.flavor + "/cache/templates/";
cryptomedic.settings = {};
cryptomedic.settings.offlineCache = false;

mainApp.config([ '$routeProvider', function($routeProvider) {
    $routeProvider
    .when('/home', {
        templateUrl: cryptomedic.templateRoot + '/pages/home.html',
        controller: 'ctrl_home'
    }).when('/login', {
        templateUrl: cryptomedic.templateRoot + '/pages/login.html',
        controller: 'ctrl_login',
    }).when('/folder/:patient_id/:page?/:subtype?/:subid?/:mode?', {
        templateUrl: cryptomedic.templateRoot + '/pages/folder.html',
        controller: 'ctrl_folder',
    }).when('/search', {
        templateUrl: cryptomedic.templateRoot + '/pages/search.html',
        controller: 'ctrl_search',
    }).when('/reports/:report?', {
        templateUrl: cryptomedic.templateRoot + '/pages/reports.html',
        controller: 'ctrl_reports',
    }).otherwise({ 'redirectTo': '/home'});
}]);


cryptomedic.math = {
	evaluatePoly: function (line, x) {
        var i = -1;
        if ((x < line[0][0]) || (x > line[line.length - 1][0])) {
            return NaN;
        }
        for(i = 0; i< line.length; i++) {
            if (x <= line[i][0])
                break;
        }

        // i = the next indice (line[i-1] < x <= line[i])
        if (x == line[i][0]) return line[i][1];

        var xup = line[i][0];
        var yup = line[i][1];
        var xdw = line[i-1][0];
        var ydw = line[i-1][1];
        return ydw + (yup - ydw) * ((x - xdw) / (xup - xdw));
    },
    stdDeviation: function(line, x, y) {
        var avg = this.evaluatePoly(line.medium, x);
        if (isNaN(avg)) return "#Out of bound#";
        if (y == avg) return 0;

        var ref;
        if (y < avg) ref = this.evaluatePoly(line.min, x);
        else ref = this.evaluatePoly(line.max, x);
        /* istanbul skip next */
        if (isNaN(ref)) return "#Out of bound#";

        var dev = Math.abs((avg - ref) / this.sigma);
        return (y - avg) / dev;
    },
    // 1.64485 = sigma at 90 for normal distribution
    sigma: 1.64485
};

