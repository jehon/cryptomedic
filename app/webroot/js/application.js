'use strict';

// Modes are: read, edit, add, display

var debugTemplate = false;
var app = {};
app.lists = {};
app.templates = {};
app.modes = {
	'read': 'read',
	'edit': 'edit',
	'add': 'add',
	'display': 'display'
};

jQuery(function() {
    Path.listen();
    cryptomedic.display.finish();
});

var cryptomedic = {};
cryptomedic.settings = {};
cryptomedic.structure = {};

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

cryptomedic.reference_submit_for_create = function() {
    jQuery("#ForceCreate").val(true);
    jQuery(document.forms[0]).submit();
};

// ************************************* STATISTICS AND GRAPHICS DRAWING ***********************************************
// ************************************* STATISTICS AND GRAPHICS DRAWING ***********************************************
// ************************************* STATISTICS AND GRAPHICS DRAWING ***********************************************
cryptomedic.graphic = function(what, ajax, xlabel, ylabel, width) {
	// called by the graphic route
	if (typeof(width) == "undefined") {
        width = "800px";
        width = ((jQuery(screen).attr("width") - 300) / 2) + "px";
    }
    var graph = jQuery('#stats_graph_' + what)[0];
    var ntags = 0;
    _(ajax.related).each(function(v, i) {
        var dx, dy, dl;
        dl = i;
        if (v.Date != null) 
            dl = v.Date.substr(0, 10);
        if (ylabel == 'bmi') {
            if (!('Heightcm' in v)) return ;
            if (!('Weightkg' in v)) return ;
            dy = cryptomedic.bmi(v['Heightcm'], v['Weightkg']);
        } else {
            if (!(ylabel in v)) return ;
            dy = parseInt(v[ylabel]);
        }
        if (xlabel == 'age') {
        	if ((typeof(v.Date) == 'undefined') || !v.Date) return;
            dx = v.Date.substr(0, 4) - ajax.Yearofbirth;
            //if (dx > 20) return ;
        } else {
            if (!(xlabel in v)) return ;
            dx = parseInt(v[xlabel]);
        }
        //if ((dx == 0) || isNaN(dx)) return ;
        //if ((dy == 0) || isNaN(dy)) return ;
        //+ dl
        var res = graph.tag("<div>+</div>", dx, dy, { 'label': dl, uuid: 'graph_element_uuid_' + v.relatedid });
        ntags++;
    });
    var dataTable = jQuery("table[datafor=stats_graph_" + what + "]");
    if (dataTable != null) {
        dataTable.children("tbody").children("tr").tinysort(); //{attr: 'sorting'}
    }
    if (ntags == 0) {
        var fieldset = jQuery(dataTable).parent();
        fieldset.children().each(function() {
            if (jQuery(this).is("legend")) return;
            this.remove();
        })
        jQuery(fieldset).append("<div>Sorry, not enough vaid data available</div>");
    }
};

// ************************************* ROUTES ***********************************************
jehon.settings.mode = "read";
cryptomedic.status = {};
cryptomedic.status.related = -1;

Path.map("#read").to(function() {
    jehon.settings.mode = 'read';
    cryptomedic.status.related = -1;
    cryptomedic.status.route= "read";
    var tstart = new Date().getTime();
    jehon.templates.render('Patient', ajax, '#content', {
        callback: function() {
            jehon.templates.render("related_header", ajax, '#headerContainer', {
                callback: function() {
                    cryptomedic.display.finish(tstart);
                }
            });
        }
    });
});

Path.map("#edit").to(function() {
    jehon.settings.mode = 'edit';
    cryptomedic.status.related = -1;
    cryptomedic.status.route= "edit";
    var tstart = new Date().getTime();
    jehon.templates.render('Patient', ajax, '#content', {
        callback: function() {
            jehon.templates.render("related_header", ajax, '#headerContainer', {
                callback: function() {
                    cryptomedic.display.finish(tstart);
                }
            });
        }
    });
});

Path.map("#graphics").to(function() {
    jehon.settings.mode = 'read';
    cryptomedic.status.related = -1;
    cryptomedic.status.route= "graphics";
    console.log(cryptomedic.status);
    
    if (typeof(ajax) == 'undefined') return
    if ((typeof(ajax.related) == 'undefined') || (ajax.related.length == 0)) {
        jQuery("#content > div").html("No data available to draw some graphics");
    }

    var tstart = new Date().getTime();
    jehon.templates.render('graphics', ajax, '#content', {
        callback: function() {
            // Fill in all graphics
            cryptomedic.graphic('weight', ajax, 'age',      'Weightkg');
            cryptomedic.graphic('height', ajax, 'age',      'Heightcm');
            cryptomedic.graphic('wh',     ajax, 'Heightcm', 'Weightkg');
            cryptomedic.graphic('BMI',    ajax, 'age',      'bmi'); 
            jehon.templates.render("related_header", ajax, '#headerContainer', {
                callback: function() {
                    cryptomedic.display.finish(tstart);
                }
            });
        }
    });
});

Path.map("#history").to(function() {
    console.log("history");
    jehon.settings.mode = 'read';
    cryptomedic.status.related = -1;
    cryptomedic.status.route= "history";
    var tstart = new Date().getTime();
    // Dust can not iterate over object's keys, so let's build up an array to make him happy
    ajax.rel = [];
    var i = 0;
    _(ajax.related).each(function(v) {
        ajax.rel[i++] = v;
    });
    jehon.templates.render('history', ajax, '#content', {
        callback: function() {
            jehon.templates.render("related_header", ajax, '#headerContainer', {
                callback: function() {
                    cryptomedic.display.finish(tstart);
                    }
            });
        }
    });
});

Path.map("#related/:id/:mode").to(function() {
    console.log({ route: "related", id: this.params['id'], mode: this.params['mode']});
    jehon.settings.mode = this.params['mode'] + "";
    cryptomedic.status.related = this.params['id'];
    cryptomedic.status.route= "related";
    var tstart = new Date().getTime();
    if ((typeof(ajax.related) === 'undefined') || (typeof(ajax.related[cryptomedic.status.related]) === 'undefined')) {
        // TODO: manage this
        console.error("Related id is not correct");
        jQuery("#content").html("invalid informations");
        return 1;
    } 
    jehon.templates.render(ajax.related[cryptomedic.status.related].type, ajax.related[cryptomedic.status.related], '#content', {
        callback: function() {
            jehon.templates.render("related_header", ajax.related[cryptomedic.status.related], '#headerContainer', {
                callback: function() {
                    cryptomedic.display.finish(tstart);
                }
            });
        }
    });
});

Path.map("#addrelated/:model").to(function() {
    jehon.settings.mode = 'add';
    cryptomedic.status.related = this.params['model'];
    cryptomedic.status.route= "add related";
    console.log(cryptomedic.status);

    var addit = { 
        patient_id: ajax.id,
        Date: new Date().toJSON().substr(0, 10),
        Sociallevel: ajax.Sociallevel,
        type: this.params['model'], 
        controller: cryptomedic.model2controller[this.params['model']]
    };
    console.log("Add this: %O", addit);
    
    var tstart = new Date().getTime();
    jehon.templates.render(this.params['model'], addit, '#content', {
        callback: function() {
            jehon.templates.render("related_header", {}, '#headerContainer', {
                callback: function() {
                    cryptomedic.display.finish(tstart);
                }
            });
        }
    });

});

// ************************************* TEMPLATES DRAWING ***********************************************
// ************************************* TEMPLATES DRAWING ***********************************************
// ************************************* TEMPLATES DRAWING ***********************************************
cryptomedic.display = {};
cryptomedic.display.finish = function(tstart, cb) {
    if (typeof(ajax) != 'undefined') {
        cryptomedic.display.patient_summary();
    }

    if (cryptomedic.status.related == -1) {
    	cryptomedic.display.specifics.Patient();
    } else {
    	if (jehon.settings.mode == 'add') {
    		if (typeof(cryptomedic.display.specifics[cryptomedic.status.related]) == 'function') {
    			cryptomedic.display.specifics[cryptomedic.status.related]();
    		}
    	} else {
    		if (typeof(cryptomedic.display.specifics[ajax.related[cryptomedic.status.related].type]) == 'function') {
    			cryptomedic.display.specifics[ajax.related[cryptomedic.status.related].type]();
    		}
    	}
    }
    	
    if (typeof(tstart) == 'undefined')
        jQuery("#informations #timing").html("0 ms");
    else
        jQuery("#informations #timing").html((new Date().getTime() - tstart) + "ms");

    if (typeof(cb) == 'function')
        cb();
};

// ************************************* TEMPLATES SPECIFICS ***********************************************
cryptomedic.display.specifics = {};
cryptomedic.businessrules = {};

cryptomedic.display.patient_summary = function(cb) {
    if (typeof(cb) != "function") cb = function() {};
    if (jQuery('#belongsTo').length > 0) {
        jehon.templates.render('patient_summary', ajax, '#belongsTo', function() {
        });
    }
};

/*****
 * Patient
 */
cryptomedic.display.specifics.Patient = function() {
    console.log("patient specific");
    if (_(ajax.related).size() > 0) {
        console.log("related presents, no delete");
        jQuery("#patient_delete").hide();
        jQuery("#patient_nodelete").show();
    } else {
        jQuery("#patient_delete").show();
        jQuery("#patient_nodelete").hide();
    }
	if (jehon.settings.mode == 'edit' || jehon.settings.mode == 'add') {
	    jQuery('#PatientPathology input:visible, [name="data[pathology_other]"]:visible').each(function(i, e) {
	    	e.addCustomValidation(cryptomedic.businessrules.PatientPathology);
	    });
	    cryptomedic.businessrules.PatientPathology();

	    jQuery('#Patient_Numberofhouseholdmembers, #Patient_Familysalaryinamonth').each(function(i, e) {
	    	e.addCustomValidation(cryptomedic.businessrules.patient_ratio);
	    });
	    cryptomedic.businessrules.patient_ratio();
	} else {
		if (ajax.Numberofhouseholdmembers > 0)
			jQuery("#ratio_salary").html(Math.ceil(ajax.Familysalaryinamonth / ajax.Numberofhouseholdmembers));
		else
			jQuery("#ratio_salary").html("Not enough datas");
	}
};

cryptomedic.businessrules.PatientPathology = function() {
    console.groupCollapsed("cryptomedic.businessrules.PatientPathology");
    if (jQuery('[name="data[pathology_other]"]').length == 0) {
        // No input fields found
        console.log("no input field found #PatientPathologyOther: read mode ?");
        console.groupEnd();
        return ;
    }
    if ((jQuery('#PatientPathology input:checked:visible').length > 0) || (jQuery('[name="data[pathology_other]"]').val().length > 0)) {
        console.log("We have some pathology");
        jQuery('#PatientPathology input:visible, [name="data[pathology_other]"]').each(function() {
            this.setCustomValidity('');
            jQuery(this).trigger(jehon.events.displayErrors);
        });
        jQuery('#PatientPathologyError').hide();
    } else {
        console.log("We don't have some pathology");
        jQuery('#PatientPathology input:visible, [name="data[pathology_other]"]').each(function() {
            this.setCustomValidity('<-');
            jQuery(this).trigger(jehon.events.displayErrors);
        });
        jQuery('#PatientPathologyError').show();
    }
    console.groupEnd();
    return true;
};

cryptomedic.businessrules.patient_ratio = function() {
	if (jQuery("input#Patient_Numberofhouseholdmembers").val() > 0) {
		var ratio = Math.ceil(jQuery("input#Patient_Familysalaryinamonth").val() / jQuery("input#Patient_Numberofhouseholdmembers").val());
		jQuery("#ratio_salary").html(ratio);
		
		/**
		 * Level 0 is when the familial ration is < 300
Level 1 is when the familial ration is 300<  FR < 500
Level 2 is when the familial ration is 500< FR < 1500
Level 3 is when the familial ration is 1500< FR < 3000
Level 4 is when the familial ration is 3000< FR  
		 * 
		 */
		
		if (ratio < 300) {
			jQuery("#calculatedSL").html("0");
		} else if (ratio < 500) {
			jQuery("#calculatedSL").html("1");
		} else if (ratio < 1500) {
			jQuery("#calculatedSL").html("2");
		} else if (ratio < 3000) {
			jQuery("#calculatedSL").html("4");
		} else {
			jQuery("#calculatedSL").html("4");
		}
		
	} else {
		jQuery("#ratio_salary").html("Not enough datas");
		jQuery("#calculatedSL").html("no data");
	}
};

/*******
 * Bills
 */
cryptomedic.display.specifics.Bill = function() {
    console.log("Bill specific");
	if (jehon.settings.mode == 'edit' || jehon.settings.mode == 'add') {
	    jQuery('[name="data[Date]"]').each(function(i, e) {
	    	e.addCustomValidation(cryptomedic.businessrules.billPrice);
	    });
	}
	if (jehon.settings.mode != 'add') {
		cryptomedic.businessrules.billPrice(ajax.related[cryptomedic.status.related].price_id);
	} else {
		cryptomedic.businessrules.billPrice();
	}
};

cryptomedic.businessrules.billPrice = function(price_id) {
	console.log("business rule billPrice");
	var d = jQuery("input#Bill_Date").val();
	var pi = -1;
	if ((typeof(price_id) == 'number') || (typeof(price_id) == 'string')) {
		pi = price_id;
	}
	if ((pi < 0) && (d != "")) {
		_(cryptomedic.prices).each(function(p, i) {
			if (((p['datefrom'] == null) || (p['datefrom'] <= d))
					&& ((p['dateto'] == null) || (p['dateto'] > d))) {
				pi = i;
			}
		});
		console.log("we have a price: " + pi);
	}
	if (pi < 0) {
		jQuery("[pricefor]").html("?no date?");
	} else {
		jQuery('[name="data[price_id]"]').val(pi);
		_(cryptomedic.prices[pi]).each(function(v, i) {
			var tag = "[pricefor=" + i + "]";
			if (v > 0) {
				jQuery(tag).html(v);
				jQuery(tag).parentsUntil('tbody').find("input").attr('disabled', false);
			} else {
				jQuery(tag).html('not available');
				jQuery(tag).parentsUntil('tbody').find("input").attr('disabled', true).val(0);
			}
		});
	}
};

cryptomedic.businessrules.billcalculate = function() {
	console.log("calculating");
	var pi = jQuery('[name="data[price_id]"]').val();
	var total = 0;
	_(jQuery('input:enabled[type=number]')).each(function(v, i) {
		var n = jQuery(v).attr('name').replace("data[", "").replace("]", "");
		var p = cryptomedic.prices[pi][n]; 
		if ((typeof(p) != 'undefined') && (p > 0)) {
			total += p * jQuery(v).val();
		}
	});
	jQuery('#total_real').html(total);
	var total_social = total;
	var sl = jQuery('[name="data[Sociallevel]"]:checked').val();
	if ((typeof(sl) != undefined) && (sl >= "")) {
		var psl = cryptomedic.prices[pi]['socialLevelPercentage_' + sl];
		if ((typeof(psl) != 'undefined') && (psl >= 0)) {
			total_social = total * psl;
		}
	}
	jQuery('#total_asked').html(total_social);
};

/****
 * Pictures
 */
cryptomedic.display.specifics.Picture = function() {
    console.log("picture specific");
    jQuery('#PictureFilecontent')[0].addCustomValidation(function() {
        var s = jQuery(':input[type=file]').get(0).files[0].size;
        if (s >  (cryptomedic.settings.maxUploadSizeMb * 1024 * 1024)- 1) {
            console.log("too big: " + s + " vs " + cryptomedic.maxUploadSizeMb);
            jQuery('#PictureFilecontent')[0].setCustomValidity("file is too big. Maximum allowed size is " + cryptomedic.settings.maxUploadSizeMb + "Mb");
        } else {
            jQuery('#PictureFilecontent')[0].setCustomValidity("");
        }
    });
    jQuery("#maxUploadSizeMb").html(cryptomedic.settings.maxUploadSizeMb);
};

/***
 * Enhance data
 */
cryptomedic.enhance = function(ajax) {
	console.log("starting enhancement of ajax data");
	ajax.stats_base_actualage = "#Year of birth unknown#";
	if (ajax.Yearofbirth >= 1900) {
        ajax.stats_base_actualage = (new Date().getFullYear() - ajax.Yearofbirth) + " years old today";
    }
	
	for(var i in ajax.related) {
		ajax.related[i].stats_ds_height = "#sex unknown#";
		ajax.related[i].stats_ds_weight = "#sex unknown#";
		ajax.related[i].stats_base_bmi = "#sex unknown#";
		ajax.related[i].stats_ds_wh = "#sex unknown#";
		ajax.related[i].stats_ds_bmi = "#sex unknown#";
		if (ajax.Sex > 0) {
	        ajax.related[i].stats_base_age = "#age, year of birth, date of consultation unknown#";
	        ajax.related[i].stats_base_bmi = "#height or weigth unknown#";
	        ajax.related[i].stats_base_wh = "#height or weigth unknown#";
	        ajax.related[i].stats_ds_height = "#height or age unknown#";
	        ajax.related[i].stats_ds_weight = "#weigth or age unknown#";
	        ajax.related[i].stats_ds_wh = "#height or weigth unknown#";
	        ajax.related[i].stats_ds_bmi = "#height, weigth or age unknown#";

	        var el = ajax.related[i];
	        var sex = (ajax.Sex == 207 ? 'm' : 'f');
	        var age = el.Date.substr(0, 4) - ajax.Yearofbirth;
	
	        if (age > 0) {
	            ajax.related[i].stats_base_age = age + " years old at that time of consultation";
	        }
	
	        if (!isNaN(parseInt(el.Heightcm)) && (el.Heightcm > 0) && (age > 0)) {
	            ajax.related[i].stats_ds_height = cryptomedic.pn(cryptomedic.math.stdDeviation(amd_stats[sex]['height'], age, el.Heightcm), 1) + ' sd';
	        }
	    
	        if (!isNaN(parseInt(el.Weightkg)) && (el.Weightkg > 0) && (age > 0)) {
	            ajax.related[i].stats_ds_weight = cryptomedic.pn(cryptomedic.math.stdDeviation(amd_stats[sex]['weight'], age, el.Weightkg), 1) + ' sd';
	        }
	    
	        if (!isNaN(parseInt(el.Heightcm)) && (el.Heightcm > 0) && !isNaN(parseInt(el.Weightkg)) && (el.Weightkg > 0)) {
	            var bmi = cryptomedic.bmi(el.Heightcm, el.Weightkg);
	            ajax.related[i].stats_base_bmi = cryptomedic.pn(bmi, 2);
	            console.log(el.Weightkg/el.Heightcm);
	            ajax.related[i].stats_base_wh = Math.floor(el.Weightkg/el.Heightcm * 100) / 100;
	            ajax.related[i].stats_ds_wh = cryptomedic.pn(cryptomedic.math.stdDeviation(amd_stats[sex]['wh'], el.Heightcm, el.Weightkg), 1) + ' sd';
	            if (age > 0) {
	                ajax.related[i].stats_ds_bmi = cryptomedic.pn(cryptomedic.math.stdDeviation(amd_stats[sex]['BMI'], age, bmi), 1) + ' sd';
	            }
	        }
		}
	}
};

// ************************************* TEMPLATES HELPERS ***********************************************
// ************************************* TEMPLATES HELPERS ***********************************************
// ************************************* TEMPLATES HELPERS ***********************************************
dust.helpers.read = function(chunk, context, bodies, params) {
    params.mode = "read";
    return dust.helpers.input(chunk, context, bodies, params);
};

dust.helpers.edit = function(chunk, context, bodies, params) {
    params.mode = "edit";
    return dust.helpers.input(chunk, context, bodies, params);
};

var uuid = 1;
dust.helpers.input = function(chunk, context, bodies, params) {
    console.log("input for header [" + params.header + "]");
    console.log("parameters: %O", params);
    var mode = jehon.settings.mode;
    var value = "";
    var type = "string";
    var list = [];
    var required = "";
    var id = "dust-helper-input-" + (uuid++);
    var field = "";
    var extra = "";
    var defval = null;
    
    if ((typeof(params.header) != "undefined") && (params.header > "")) {
        var p = params.header.split('.');
        var obj = "";
        if (p.length == 2) {
            obj = p[0];
            field = p[1];
        } else {
            if (cryptomedic.status.related == -1) {
                obj = "Patient";
            } else if (jehon.settings.mode  == "add") {
                obj = cryptomedic.status.related;
            } else {
                obj = ajax.related[cryptomedic.status.related].type;
            }
            field = params.header; 
        }
        if (typeof(cryptomedic.structure[obj]) == 'undefined') {
            type = 'string';
            console.error('header ' + params.header + ' type of cryptomedic.structure[' + obj + '] is not specified');
        } else if (typeof(cryptomedic.structure[obj][field]) == 'undefined') {
            type = 'string';
            console.error('header ' + params.header + ' type of cryptomedic.structure[' + obj + '][' + field + '] is not specified');
        } else {
            console.log("Structure discovered: %O", cryptomedic.structure[obj][field]);
            if (typeof(cryptomedic.structure[obj][field]['type']) != 'undefined') {
                type = cryptomedic.structure[obj][field]['type'];
            }
            if (typeof(cryptomedic.structure[obj][field]['list']) != 'undefined') {
                list = cryptomedic.structure[obj][field]['list'];
                type = 'list';
            }
            if (typeof(cryptomedic.structure[obj][field]['null']) != 'undefined') {
                required = ((cryptomedic.structure[obj][field]['null']) ? "" : required="required myrequired='required'");
            }
            if (typeof(cryptomedic.structure[obj][field]['default']) != 'undefined') {
                defval = cryptomedic.structure[obj][field]['default'];
            }
        }
        value = context.get(field);
        extra = "id=\"" + params.header.split(".").join("_") + "\" ";
    }

    // Parameters override:
    if (typeof(params.mode) != "undefined") mode = params.mode;
    if (typeof(params.value) != "undefined") value = params.value;
    if (typeof(params.type) != 'undefined') type = params.type;
    if ((typeof(params.required) != "undefined") && params.required) required = " required='required' myrequired='required'";
    if (typeof(params.list) != "undefined") list = jehon.utils.stringToObject(params.list);
    if (typeof(params.extra) != "undefined") {
        extra = extra + decodeURIComponent(params.extra);
    }

    console.log("calculated: %O", {
        header: params.header,
        mode: mode,
        type: type,
        value: value,
        required: required,
        list: list,
        extra: extra,
        defval: defval
    });
    // End of initialization

    if (debugTemplate) {
		return chunk.write("<span class='debugList'>" + params.header 
				+ _(list).reduce(function(sum, el, i) {
					if (i == "labels") return sum;
	                if (list.labels) {
	                	return sum + "<br>" + el + ":" + cryptomedic.labels[el]['text'];
	                } else {
	                	return sum + "<br>" + el ;
	                }
				}, "") + "</span>");
	} 

    // Mode read
    if (mode == 'read') {
        if (value == null) {
            return chunk.write('-?-');
        }
        
        switch(type) {
            case 'integer':
            case 'string':
                return chunk.write(value);
            case 'timestamp':
            case 'datetime':
            case 'date':
                return chunk.write(value.substr(0, 10));
            case 'boolean':
                if (value > 0) {
                    return chunk.write("<img src='/amd/cryptomedic/img/boolean-true.gif' alt='yes'>");
                } else {
                    return chunk.write("<img src='/amd/cryptomedic/img/boolean-false.gif' alt='no'>");
                }
            case 'text':
                return chunk.write(value.replace("\n", "<br>"));
            case 'list':
                // TODO: all list are not translated !!!
                if (list.labels) {
                    if (typeof(cryptomedic.labels[value]) == 'undefined') {
                        return chunk.write("?" + value + "?");
                    }
                    return chunk.write(cryptomedic.labels[value]['text']);
                } else {
                    return chunk.write(value);
                }
        }
        return chunk.write("read: " + type + " - " + value + " -");
    } // End of READ
    
    // Mode Edit
    if (mode == "edit" || mode == "add") {
        //params.name = "data[" + obj + "][" + field + "]";
        params.name= "data[" + field + "]";
        if (type == 'list') {
            if ((typeof(list) == 'object')  && (_(list).size() > 0)) {
                if (typeof(list.labels) != 'undefined') {
                    if (list.labels) {
                        var nlist = {};
                        _(list).each(function(v, i) {
                            if (i == "labels") return ;
                            if (typeof(cryptomedic.labels[v]) == 'undefined') {
                                console.log("undefined label: #" + i + " value:" + v);
                                nlist[v] = 'undefined label';
                            } else {
                                nlist[v] = cryptomedic.labels[v]['text'];
                            }
                        });
                        list = nlist;
                    }
                }
                if (!params.required) {
                    if (list.length > 0) {
                        var nlist = {};
                        _(list).each(function(v, i) {
                            nlist[v] = v;
                        });
                        nlist[""] = '?';
                        list = nlist;
                    } else {
                        list[""] = '?';
                    }
                }
            } else {
                console.error("type list with empty list given %O", params);
            }
        }
                
        // Let's build it up:
        if (typeof(value) == "undefined") value = defval;
        if (value == null) value = "";
        
        switch(type) {
            case 'integer':
                if (value == "") value = parseInt(defval);
                return chunk.write("<input name='" + params.name + "' type='number'" + required + " value='" + value + "' " + extra  + " />");
            case 'string':
                return chunk.write("<input name='" + params.name + "' type='text'" + required + " maxlength='255' value='" + value + "' " + extra  + " />");
            case 'list':
                // TODO: what if old value is not in the list?
                params.value = value;
                //if (params.value == "") params.value = 0;
                // TODO: treat list (labels)
                params.list = list;
                if (_(list).keys().length <= 6) {
                    chunk.write("<table width='100%'><colgroup span='2' width='50%' /><tr><td>");
                    params.type = "radios";
                    params.separator = function(i, n) {
                        if (( ((i+1)/n) >= 0.5) && ( (i/n) < 0.5)) 
                            return "</td><td style='border-left: solid 1px gray'>";
                        else
                            return "<br/>";
                    };
                    dust.helpers.list(chunk, context, bodies, params);
                    return chunk.write("</td></tr></table>");
                } else {
                    params.type = "select";
                    return dust.helpers.list(chunk, context, bodies, params);
                }
            case 'timestamp':
                return chunk.write(jehon.html.error("impossible to edit a timestamp field"));
            case 'date':
            case 'datetime':
                // TODO: nullise should trigger "change" event?
                chunk.write("<input name='" + params.name + "' type='date' value='" + value.substr(0, 10) + "' " + extra + " id='" + id + "'"  + required + ">");
            	if (required == "") chunk.write("<img src='/amd/cryptomedic/img/nullise.gif' onclick='jQuery(\"#" + id + "\").val(\"\");' alt='set empty date' >");
                return chunk.write("");
            case 'text':
                return chunk.write("<textarea name='" + params.name + "' cols='30' rows='6'" + required + " " + extra  + ">" + value + "</textarea>");
            case 'boolean':
                chunk.write("<input type='hidden' name='" + params.name + "' value='0'>");
                return chunk.write("<input type='checkbox' name='" + params.name + "' value='1' " + (value > 0 ? "checked " : "") + extra  + ">");
        }
        return chunk.write("edit: " + type + " - " + value + " -");
    } // End of EDIT
    
    console.error("No defined mode");
    return chunk.write("no defined for mode: " + jehon.settings.mode);
};
