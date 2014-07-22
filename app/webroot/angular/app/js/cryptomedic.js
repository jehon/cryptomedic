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

var cryptomedic = {};
cryptomedic.settings = {};
//cryptomedic.structure = {};  // Could be removed? Structure is used inside the php only
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

/*********************************** Graphics ********************************/
/*********************************** Graphics ********************************/
/*********************************** Graphics ********************************/
cryptomedic.graphics = {
    showAllCorners: function() {
        jQuery("img[mymargins]").each(function() {
            this.showCorners();
        });
    }
};

cryptomedic.graphics.adapt = function() {
    // TODO
    jQuery("[mymargins]").each(function() {
        // In abstract function, we can declare local variable to store informations
        var a = function(graph) {
            if (typeof(graph.margins) !== 'undefined') {
                return;
            }
            var margins = {};
            margins = eval("margins = " + jQuery(graph).attr('mymargins'));
            margins = jQuery().extend({}, {
                left: 0, right: 1, top: 1, bottom: 0,
                vleft: 0, vright: 100, vtop: 100, vbottom: 0
            }, margins);

            graph.scan = function(callback) {
                jQuery(graph).click(function(event) {
                    var x = event.offsetX, y = event.offsetY;
                    var res = { vx: 0, vy: 0 };
                    res.x = x;
                    res.y = y;
                    res.width = jQuery(graph).width();
                    res.height = jQuery(graph).height();
                    res.abspx = res.x / res.width;
                    res.abspy = res.y / res.height;
                    var h = res.height;
                    var w = res.width;

                    x -= margins.left * res.width;
                    w -= margins.left * res.width;
                    w -= (1 - margins.right) * res.width;

                    y -= margins.top * res.height;
                    h -= margins.top * res.height;
                    h -= (1 - margins.bottom) * res.height;

                    res.px = x / w;
                    res.py = y / h;
                    res.vx = res.px * (margins.vright - margins.vleft) + margins.vleft;
                    res.vy = res.py * (margins.vbottom - margins.vtop) + margins.vtop;
                    event.preventDefault();
                    if (typeof(callback) == 'function') {
                        callback(res);
                    } else {
                        console.log(res);
                    }
                });
            };
            
            graph.clearTags = function() {
                jQuery(video).parent().children(".mark").remove();
            };

            graph.highlight = function(event) {
                var uuid = event;
                if (typeof(event) !== "string") uuid = jQuery(event.currentTarget).attr('labelid');
                jQuery("tr.highlighted").removeClass("highlighted");
                jQuery("tr[labelid=" + uuid + "]").addClass("highlighted");

                jQuery("div.mark.highlighted[labelid]").removeClass("highlighted");
                jQuery("div.mark[labelid=" + uuid + "]").addClass("highlighted");
            }

            graph.tag = function(div, vx, vy, options) {
                if (typeof(options) == "undefined") options = {};
                options = jQuery().extend({
                    'my': "left-4px center",
                    'label': 'nolabel',
                    'uuid': jehon.utils.uuid()
                    }, options);

                // Instead of waiting for the pictures, let's fix the height and width in img tag so we can draw everything imediately
                if (jQuery(graph).is("img")) {
                    if (!jQuery(graph).prop('complete')) {
                        jQuery(graph).on('load', function() {
                            graph.tag(div, vx, vy, options);
                        });
                        return "";
                    }
                }

                var res = { x: 0, y: 0 };
                var resTxt = "";
                if (isNaN(vx) || isNaN(vy)) {
                    resTxt = "Invalid data";
                } else {
                    res.vx = vx;
                    res.vy = vy;
                    res.width = jQuery(graph).width();
                    res.height = jQuery(graph).height();

                    // Instead of waiting for the pictures, let's fix the height and width in img tag so we can draw everything imediately
                    if (res.width == 0) {
                        console.error("No width fixed on picture");
                        return;
                    }
                    if (res.height == 0) {
                        console.error("No height fixed on picture");
                        return
                    }

                    res.px = (res.vx - margins.vleft) / (margins.vright - margins.vleft);
                    res.py = (res.vy - margins.vtop) / (margins.vbottom - margins.vtop);

                    var dtag = jQuery(div);
                    dtag.addClass("mark");
                    dtag.attr("onmouseover", "jQuery(this).parent().children('img')[0].highlight(\"" + options.uuid + "\")");
                    dtag.attr("labelid", options.uuid);
                    if (res.px < 0) { console.log("far on left");  resTxt = "Outside left of the graph"; }
                    if (res.px > 1) { console.log("far on right"); resTxt = "Outside right of the graph"; }
                    if (res.py < 0) { console.log("far on top");   resTxt = "Above the graph"; }
                    if (res.py > 1) { console.log("far too low");  resTxt = "Below the graph"; }

                    if (resTxt == "") {
                        var w = res.width * (margins.right - margins.left);
                        var h = res.height * (margins.bottom - margins.top);

                        res.x = margins.left * res.width + w * res.px;
                        res.y = margins.top * res.height + h * res.py;

                        dtag.appendTo(jQuery(graph).parent());
                        dtag.position({ of: graph, at: "left+" + res.x + "px top+" + res.y + "px", collision: "none", my: options.my });
                    }
                }
                var dataTable = jQuery("table[datafor=" + jQuery(graph).attr('id') + "]");
                if (dataTable.size() > 0 ) {
                    dataTable = jQuery(dataTable[0]).select("tbody");
                    dataTable.append("<tr sorting='" + jQuery(div).html() + "' labelid='" + options.uuid + "' onmouseover='jQuery(this).parents(\"fieldset\").children(\"img\")[0].highlight(\"" + options.uuid + "\");'>"
                        + "<td>" + options.label + "</td>"
                        + "<td>" + vx + "</td><td>" + vy + "</td>"
                        + "<td>" + resTxt + "</td></td></tr>");
                }
            };

            graph.showCorners = function() {
                graph.tag('<div>+' + margins.vleft + ',' + margins.vbottom + '</div>', margins.vleft, margins.vbottom);
                graph.tag('<div>+' + margins.vleft + ',' + margins.vtop + '</div>', margins.vleft, margins.vtop);
                graph.tag('<div>+' + margins.vright + ',' + margins.vbottom + '</div>', margins.vright, margins.vbottom);
                graph.tag('<div>+' + margins.vright + ',' + margins.vtop + '</div>', margins.vright, margins.vtop);
                graph.tag('<div>O' + ((margins.vleft +margins.vright) / 2) + ',' +
                        ((margins.vbottom + margins.vtop) / 2) + '</div>',
                        (margins.vleft + margins.vright) / 2,
                        (margins.vbottom + margins.vtop) / 2);
            };
        }(this);
    });
}