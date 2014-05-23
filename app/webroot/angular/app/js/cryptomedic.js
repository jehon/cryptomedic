"use strict";

/**
 * For this f*** old IE6-8
 */
if (typeof(console) === 'undefined') { console = {}; }
if (typeof(console.log) !== 'function') { console.log = function() {}; }
if (typeof(console.info) !== 'function') { console.info = console.log; }
if (typeof(console.error) !== 'function') { console.error = console.log; }
if (typeof(console.trace) !== 'function') { console.trace = console.log; }
if (typeof(console.warn) !== 'function') { console.warn = console.log; }
if (typeof(console.group) !== 'function') { console.group = function(group) { console.log("GROUP: " + group); }; }
if (typeof(console.groupCollapsed) !== 'function') { console.groupCollapsed = console.group; }
if (typeof(console.groupEnd) !== 'function') { console.groupEnd = function() { console.log("GROUP END"); } ; }

if (window.location.search) {
	if (window.location.search.search("_nocollapse") > 0) {
		console.log("mode no-collapse");
		console.groupCollapsed = console.group;
	}
}

var cryptomedic = {};
cryptomedic.settings = {};
cryptomedic.structure = {};
cryptomedic.prototypes = {};

cryptomedic.model2controller = {
    "Bill": "bills", 
    "ClubFoot": "club_foots", 
    "NonricketConsult": "nonricket_consults",
    "OrthopedicDevice": "orthopedic_devices",
    "Patient": "patients",
    "Picture": "pictures",
    "RicketConsult": "ricket_consults",
    "Surgery": "surgeries",
    "SurgeryFollowup": "surgery_followups"
};

cryptomedic.bmi = function(height, weight) {
    return 10000 * weight / (height * height);
};

cryptomedic.pn = function(n, dec) {
    if (isNaN(n)) {
        return "Not a number";
    }
    if (isNaN(parseInt(n))) {
        return n;
    }
    if (dec === "%") {
        return Math.round(n * 100) + "%";
    }
    return Math.round(n * Math.pow(10, dec)) / Math.pow(10, dec);
};

cryptomedic.math = (function() {
    function evaluatePoly(line, x) {
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
    };

    function stdDeviation(line, x, y) {
        var avg = evaluatePoly(line.medium, x);
        if (isNaN(avg)) return "#Out of bound#";
        if (y == avg) return 0;

        var ref;
        if (y < avg) ref = evaluatePoly(line.min, x);
        else ref = evaluatePoly(line.max, x);
        if (isNaN(ref)) return "#Out of bound#";

        // 1.64485 = sigma at 90 for normal distribution
        var sigma = Math.abs((avg - ref) / 1.64485);
        var stdDev = (y - avg) / sigma;
        return stdDev;
    };

    return { 'stdDeviation': stdDeviation };
}());
