"use strict";

/**
 * For this f*** old IE6-8
 */
/* istanbul ignore next */
if (typeof(console) === 'undefined') { console = {}; }
/* istanbul ignore next */
if (typeof(console.log) !== 'function') { console.log = function() {}; }
/* istanbul ignore next */
if (typeof(console.info) !== 'function') { console.info = console.log; }
/* istanbul ignore next */
if (typeof(console.error) !== 'function') { console.error = console.log; }
/* istanbul ignore next */
if (typeof(console.trace) !== 'function') { console.trace = console.log; }
/* istanbul ignore next */
if (typeof(console.warn) !== 'function') { console.warn = console.log; }
/* istanbul ignore next */
if (typeof(console.group) !== 'function') { console.group = function(group) { console.log("GROUP: " + group); }; }
/* istanbul ignore next */
if (typeof(console.groupCollapsed) !== 'function') { console.groupCollapsed = console.group; }
/* istanbul ignore next */
if (typeof(console.groupEnd) !== 'function') { console.groupEnd = function() { console.log("GROUP END"); } ; }

/* istanbul ignore next */
if (window.location.search) {
	if (window.location.search.search("_nocollapse") > 0) {
		console.log("mode no-collapse");
		console.groupCollapsed = console.group;
	}
}

function date2CanonicString(d) {
    // d.setMilliseconds(0);
    if (d == null) return "0000-00-00 00:00:00 GMT+0000";

    var ts = - (new Date()).getTimezoneOffset()/60 * 100;
    return d.getFullYear() + 
        "-" + 
        ("00" + (d.getMonth() + 1)).substr(-2) + 
        "-" +
        ("00" + (d.getDate())).substr(-2) +
        " " +
        ("00" + d.getHours()).substr(-2) +
        ":" +
        ("00" + d.getMinutes()).substr(-2) +
        ":" +
        ("00" + d.getSeconds()).substr(-2) +
        " GMT" + (ts < 0 ? "-" : "+") + 
        ("0000" + Math.abs(ts)).substr(-4)
}

function objectify(what) {
	if (what === null) return what;
    switch(typeof(what)) {
		case "undefined": return null;
		case "string": 
			if (what === date2CanonicString(null)) {
				return null;
			}
			if (what.match("[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2} GMT[+-][0-9]{4}") == what) {
                return new Date(what.substr(0, 4), what.substr(5, 2) - 1, what.substr(8, 2),
                    what.substr(11, 2), what.substr(14, 2), what.substr(17, 2));
				// return new Date(what);
			};
			return what;
		case "object":
			angular.forEach(what, function(val, i) {
				what[i] = objectify(what[i]);
			});
            if (typeof(what['type']) != "undefined") {
                what = new cryptomedic.models[what['type']](what);
            }
			return what;
		default:
			return what;
				
	}
}

function stringify(what) {
    if (what == null) return what;
    if (typeof(what) == "object") {
        if (what instanceof Date) {
            return date2CanonicString(what);
        }
        angular.forEach(what, function (v, k) {
            what[k] = stringify(what[k]);
        });
    }
    return what;
}

var cryptomedic = {};
cryptomedic.settings = {};
cryptomedic.structure = {};  // Could be removed? Structure is used inside the php only
cryptomedic.models = {};

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
