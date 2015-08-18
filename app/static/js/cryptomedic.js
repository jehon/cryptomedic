"use strict";

cryptomedic.templateRoot = "/cryptomedic/cache/templates/";

mainApp.config([ '$routeProvider', function($routeProvider) {
    $routeProvider.when('/home', {
        templateUrl: cryptomedic.templateRoot + '/pages/home.html',
        controller: 'ctrl_home'
    }).when('/test', {
        templateUrl: cryptomedic.templateRoot + '/pages/test.html',
        controller: 'ctrl_search',
    }).when('/search', {
        templateUrl: cryptomedic.templateRoot + '/pages/search.html',
        controller: 'ctrl_search',
    }).when('/folder/:id/:page?/:mode?', {
        templateUrl: cryptomedic.templateRoot + '/pages/folder.html',
        controller: 'ctrl_folder',
    }).when('/reports/:report?', {
        templateUrl: cryptomedic.templateRoot + '/pages/reports.html',
        controller: 'ctrl_reports',
    }).when('/goto/:type/:id', {
    	templateUrl: cryptomedic.templateRoot + '/pages/blank.html',
    	controller: 'ctrl_goto',
    }).otherwise({ 'redirectTo': '/home'});
}]);

cryptomedic.settings = {};
cryptomedic.settings.offlineCache = false;

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

