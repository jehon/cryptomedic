'use strict';

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
        });
        jQuery(fieldset).append("<div>Sorry, not enough vaid data available</div>");
    }
};

//cryptomedic.display.messages = function (mymessages) {
//	// Hide messages after some times
//	jQuery("body").one("click", function() { 
//		console.info("hide messages");
//		jQuery("#flashMessages").hide("blind");
//	})
//}
//

/*****
 * Patient
 */
cryptomedic.display.specifics.Patient = function() {
    // console.log("patient specific");
    if (_(ajax.related).size() > 0) {
        console.log("related presents, no delete");
        jQuery("#patient_delete").hide();
        jQuery("#patient_nodelete").show();
    } else {
        jQuery("#patient_delete").show();
        jQuery("#patient_nodelete").hide();
    }
	// if (jehon.settings.mode == 'edit' || jehon.settings.mode == 'add') {
	//     jQuery('#PatientPathology input:visible, [name="data[pathology_other]"]:visible').each(function(i, e) {
	//     	e.addCustomValidation(cryptomedic.businessrules.PatientPathology);
	//     });
	//     cryptomedic.businessrules.PatientPathology();

	//     jQuery('#Patient_Numberofhouseholdmembers, #Patient_Familysalaryinamonth').each(function(i, e) {
	//     	e.addCustomValidation(cryptomedic.businessrules.patient_ratio);
	//     });
	//     cryptomedic.businessrules.patient_ratio();
	// } else {
	// 	if (ajax.Numberofhouseholdmembers > 0)
	// 		jQuery("#ratio_salary").html(Math.ceil(ajax.Familysalaryinamonth / ajax.Numberofhouseholdmembers));
	// 	else
	// 		jQuery("#ratio_salary").html("Not enough datas");
	// }
};

cryptomedic.businessrules.PatientPathology = function() {
    // console.groupCollapsed("cryptomedic.businessrules.PatientPathology");
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
    // console.groupEnd();
    return true;
};
