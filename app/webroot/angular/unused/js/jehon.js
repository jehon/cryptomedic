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

/**
 *  TODO: trigger? 
 *      triggerHandler will not work if event attached to document level
 *      but trigger will bubble up
 *      ==> how to prevent the bubble up?
 */

jQuery.noConflict();

var jehon = {};
jehon.events = {
		'ready': "ready_jehon", // the jehon plugin is ready
/**
 *  The 'pagechange' event is triggered whenever the content of the page is changed 
 *  in content. The event is not trigerred when something become visible/invisible.
 *  
 *  Scope: body, div
 *  
 *  Handler limitations: The handlers should treat the page, element invisible included.
 *  
 *  Known triggers: page load, templates.render
 *  
 *  Listener: jQuery(document).on(jehon.events.pagechange, "body, div", function(event) {});
 */
		'pagechange': "pagechange_html.jehon", // on target
		'displayErrors': "displayerrors_forms.jehon", // on target: display the errors messages
		'customvalidate': "customvalidate_forms.jehon", // on target: custom validations
		'z': "z"
};

jehon.settings = {};
// Insert here the functions to be called when "jehon" is ready 
//jehon.startup = {};
// Private domain
jehon.private = {};
// is this the correct name? used internally only
//jehon.private.ready = {};

jehon.settings.collapsable = { timing: 500 };
jehon.settings.mode = 'read';

// -------------------------- Debug functions -----------------------
//var debug = function() { jehon.notify('debug', 'debug not implemented'); };
//jehon.noop = function() {};

/*********************************** Forms ********************************/
/*********************************** Forms ********************************/
/*********************************** Forms ********************************/
jehon.forms = (function() {
	var inputsExtends  = ':input:not(:button):not(:reset):not(:submit)';
	var inputsValidate = inputsExtends + ':not(:disabled):not([readonly]):not([type="hidden"])';
	
	/**
	 * Transform a "form" into an object
	 * @param {CSSSelector} selector
	 * @return {Object}: the value of the form
	 */
	function form2object(selector) {
        var obj = {};
        // TODO: Should limit to enabled controls only...
        jQuery.map(jQuery(selector).serializeArray(), function(n, i) {
            // TODO: should be corrected if multiple selection?
            // TODO: quid of display:none fields?
            obj[n['name']] = n['value'];
        });
        return obj;
	}

	function formCheckValidation(event) {
        /**
         * This function is only called when form validation is not build in the browser
         */
        var valid = true;
        jQuery(this).find(inputsValidate).each(function() {
            if (typeof(this.setCustomValidity) == 'function') {
                //this.checkValidity();
                if (this.validationMessage > "") {
                    valid = false;
                }
            }
        });
        if (!valid) {
            event.preventDefault();
            alert("You still have errors... Please correct them before saving your data's");
            jQuery('.invalid:eq(0)').find('input').focus();
            return false;
        }
        return true;
	}
	
	// Listener for display errors:
	jQuery(document).on(jehon.events.displayErrors, inputsValidate, function(event) {
		// Update the visual on the object according to current validation message
		if (jQuery(this).attr("id") == null) return;
		console.log("In " + event.type + "#" + event.namespace + " event for %s", this.id);
		if (this.validationMessage) {
			jQuery(".validationErrors[for='" + jQuery(this).attr("id") + "']").remove();
            jQuery(this).parent().addClass('invalid');
            jQuery(this).after("<span class='validationErrors' for='" + jQuery(this).attr("id") + "'>" +
                    jQuery(this)[0].validationMessage + "</span>");
		} else {
            jQuery(".validationErrors[for='" + jQuery(this).attr("id") + "']").remove();
            jQuery(this).parent().removeClass('invalid');
		}
	});

	// Listener for change: validations
	jQuery(document).on('change.forms.jehon', inputsValidate, function(event) {
        /*
         * This function is called in supported and unsupported browsers
         * Because it handle all the cases, supported and unsupported one's
         */

		this.willValidate = true;

        if (!this.willValidate) {
            // hidden, disabled, ... -> do not validate it
            return true;
        }

        if ((this.validationMessage > "") && (this.validationMessage[0] === '@')) {
            // It is a auto managed message, reset it
            this.setCustomValidity('', false);
        }

        // Treat our addValidation chain before validating
        // Choosing triggerHandler -> only the specific item is validated (no bubble)
        jQuery(this).trigger(jehon.events.customvalidate);

        if ((typeof(Modernizr) !== 'undefined') && (this.validationMessage == "")) {
            /*
             *  If we don't already have a validation message
             *
             *  This is safe, since all messages generated from this script start with '@',
             *  and thoses are removed above.
             */
            var type = this.getAttribute('type');
            var val = jQuery(this).val();

            // test by type, if browser does not support it:
            switch(type) {
            case 'text':
                break;
            case 'date':
                break;
            case 'number':
                if (!Modernizr.inputtypes.number) {
                    if (parseInt(val) != val)
                        this.setCustomValidity('This is not a number', false);
                }
                break;
            default:
                // console.log("undefined type: " + type);
            }

            // test for required if no other message shown:
            if (!Modernizr.input.required && (jQuery(this).attr("myrequired") || jQuery(this).attr("required"))) {
                // jQuery(this).attr('required') does not work for ie
                if  ('' == this.validationMessage) {
                    if (type == 'radio') {
                        if (jQuery('input:radio[name="'+ jQuery(this).attr('name')+'"]:checked').size() < 1) {
                            this.setCustomValidity('@ A value is required in this field', false);
                        }
                    } else {
                        // normal case (non radio)
                        if (val == "")
                            this.setCustomValidity('@ A value is required in this field', false);
                    }
                }
            }
        }

        /*
         *  We do this only if we are in our custom personal validation
         *  In other cases, the customValidationMessage will be handled by the browser
         */
        if (this.jehonValidation) {
            jQuery(this).trigger(jehon.events.displayErrors);
        }
	});

	// Enrich the various component with html5 api (and more)
	jQuery(document).on(jehon.events.pagechange, "body, div", function(event) {
		console.groupCollapsed("Event pagechange in jehon.forms for %O", this);
		console.log(event);
		var scope = event.target;
		
        if ((typeof(Modernizr) !== 'undefined') && !Modernizr.inputtypes.date) {
            // Input date
            jQuery('input[type=date]', scope).datepicker({ dateFormat: 'yy-mm-dd' });
        }

        // On each "validable" input:
        jQuery(inputsValidate, scope).each(function() {
            // Test if we have already done this:
            if (typeof(this.jehonValidation) == 'undefined') {
                // We never manage that input, let's do it
                this.jehonValidation = false;

                this.addCustomValidation = function(listener) {
                    jQuery(this).on(jehon.events.customvalidate, listener);
                };

                if (typeof(this.id) === "undefined" || (this.id == "")) {
                    jQuery(this).attr("id", "html5-" + jehon.utils.uuid(32));
                }

                // checkValidity():
                if (typeof(this.setCustomValidity) == 'undefined') {
                    // No "check validity" => install our and fill in default fields
                    this.jehonValidation = true;
                    this.willValidate =  true;
                    this.validationMessage = '';
                    this.setCustomValidity = function(message, recheck) {
                        this.validationMessage = message;
                        if ((typeof(recheck) === undefined) || recheck) {
                            // Allow the user to trigger an "recheck" on the element:
                            // Prevent circular loop
                            // TODO: necessary?
                        }
                    };
                }
            }
        });
        jQuery('form', scope).each(function() {
            if (typeof(this.checkValidity) == 'undefined') {
                // We use checkValidity as a detection for validation system of the browser:
                // beforeSubmit(): not used, need to be called manually !
                this.checkValidity = formCheckValidation;
                jQuery(this).submit(this.checkValidity);
            }
        });
        console.groupEnd();
	});
	
	return { 'form2object': form2object };
}());

// /*********************************** Graphics ********************************/
// /*********************************** Graphics ********************************/
// /*********************************** Graphics ********************************/
// jehon.graphics = {
// 	showAllCorners: function() {
//         jQuery("img[mymargins]").each(function() {
//             this.showCorners();
//         });
// 	}
// };

// jQuery(document).on(jehon.events.pagechange, "body, div", function(event, data) {
// 	jQuery("[mymargins]").each(function() {
// 		// In abstract function, we can declare local variable to store informations
// 		var a = function(graph) {
// 			if (typeof(graph.margins) !== 'undefined') {
// 				return;
// 			}
// 			var margins = {};
// 			margins = eval("margins = " + jQuery(graph).attr('mymargins'));
//             margins = jQuery().extend({}, {
//                 left: 0, right: 1, top: 1, bottom: 0,
//                 vleft: 0, vright: 100, vtop: 100, vbottom: 0
//             }, margins);

//             graph.scan = function(callback) {
//                 jQuery(graph).click(function(event) {
//                     var x = event.offsetX, y = event.offsetY;
//                     var res = { vx: 0, vy: 0 };
//                     res.x = x;
//                     res.y = y;
//                     res.width = jQuery(graph).width();
//                     res.height = jQuery(graph).height();
//                     res.abspx = res.x / res.width;
//                     res.abspy = res.y / res.height;
//                     var h = res.height;
//                     var w = res.width;

//                     x -= margins.left * res.width;
//                     w -= margins.left * res.width;
//                     w -= (1 - margins.right) * res.width;

//                     y -= margins.top * res.height;
//                     h -= margins.top * res.height;
//                     h -= (1 - margins.bottom) * res.height;

//                     res.px = x / w;
//                     res.py = y / h;
//                     res.vx = res.px * (margins.vright - margins.vleft) + margins.vleft;
//                     res.vy = res.py * (margins.vbottom - margins.vtop) + margins.vtop;
//                     event.preventDefault();
//                     if (typeof(callback) == 'function') {
//                         callback(res);
//                     } else {
//                         console.log(res);
//                     }
//                 });
//             };
			
// 			graph.clearTags = function() {
// 				jQuery(video).parent().children(".mark").remove();
// 			};

//             graph.highlight = function(event) {
//                 var uuid = event;
//                 if (typeof(event) !== "string") uuid = jQuery(event.currentTarget).attr('labelid');
//                 jQuery("tr.highlighted").removeClass("highlighted");
//                 jQuery("tr[labelid=" + uuid + "]").addClass("highlighted");

//                 jQuery("div.mark.highlighted[labelid]").removeClass("highlighted");
//                 jQuery("div.mark[labelid=" + uuid + "]").addClass("highlighted");
//             }

// 			graph.tag = function(div, vx, vy, options) {
//                 if (typeof(options) == "undefined") options = {};
//                 options = jQuery().extend({
//                     'my': "left-4px center",
//                     'label': 'nolabel',
//                     'uuid': jehon.utils.uuid()
//                     }, options);

//                 // Instead of waiting for the pictures, let's fix the height and width in img tag so we can draw everything imediately
//                 if (jQuery(graph).is("img")) {
//                     if (!jQuery(graph).prop('complete')) {
//                         jQuery(graph).on('load', function() {
//                             graph.tag(div, vx, vy, options);
//                         });
//                         return "";
//                     }
// 				}

//                 var res = { x: 0, y: 0 };
//                 var resTxt = "";
//                 if (isNaN(vx) || isNaN(vy)) {
//                     resTxt = "Invalid data";
//                 } else {
//                     res.vx = vx;
//                     res.vy = vy;
//                     res.width = jQuery(graph).width();
//                     res.height = jQuery(graph).height();

//                     // Instead of waiting for the pictures, let's fix the height and width in img tag so we can draw everything imediately
//                     if (res.width == 0) {
//                         console.error("No width fixed on picture");
//                         return;
//                     }
//                     if (res.height == 0) {
//                         console.error("No height fixed on picture");
//                         return
//                     }

//                     res.px = (res.vx - margins.vleft) / (margins.vright - margins.vleft);
//                     res.py = (res.vy - margins.vtop) / (margins.vbottom - margins.vtop);

//                     var dtag = jQuery(div);
//                     dtag.addClass("mark");
//                     dtag.attr("onmouseover", "jQuery(this).parent().children('img')[0].highlight(\"" + options.uuid + "\")");
//                     dtag.attr("labelid", options.uuid);
//                     if (res.px < 0) { console.log("far on left");  resTxt = "Outside left of the graph"; }
//                     if (res.px > 1) { console.log("far on right"); resTxt = "Outside right of the graph"; }
//                     if (res.py < 0) { console.log("far on top");   resTxt = "Above the graph"; }
//                     if (res.py > 1) { console.log("far too low");  resTxt = "Below the graph"; }

//                     if (resTxt == "") {
//                         var w = res.width * (margins.right - margins.left);
//                         var h = res.height * (margins.bottom - margins.top);

//                         res.x = margins.left * res.width + w * res.px;
//                         res.y = margins.top * res.height + h * res.py;

//                         dtag.appendTo(jQuery(graph).parent());
//                         dtag.position({ of: graph, at: "left+" + res.x + "px top+" + res.y + "px", collision: "none", my: options.my });
//                     }
//                 }
//                 var dataTable = jQuery("table[datafor=" + jQuery(graph).attr('id') + "]");
//                 if (dataTable.size() > 0 ) {
//                     dataTable = jQuery(dataTable[0]).select("tbody");
//                     dataTable.append("<tr sorting='" + jQuery(div).html() + "' labelid='" + options.uuid + "' onmouseover='jQuery(this).parents(\"fieldset\").children(\"img\")[0].highlight(\"" + options.uuid + "\");'>"
//                         + "<td>" + options.label + "</td>"
//                         + "<td>" + vx + "</td><td>" + vy + "</td>"
//                         + "<td>" + resTxt + "</td></td></tr>");
//                 }
// 			};

// 			graph.showCorners = function() {
//                 graph.tag('<div>+' + margins.vleft + ',' + margins.vbottom + '</div>', margins.vleft, margins.vbottom);
//                 graph.tag('<div>+' + margins.vleft + ',' + margins.vtop + '</div>', margins.vleft, margins.vtop);
//                 graph.tag('<div>+' + margins.vright + ',' + margins.vbottom + '</div>', margins.vright, margins.vbottom);
//                 graph.tag('<div>+' + margins.vright + ',' + margins.vtop + '</div>', margins.vright, margins.vtop);
//                 graph.tag('<div>O' + ((margins.vleft +margins.vright) / 2) + ',' +
//                         ((margins.vbottom + margins.vtop) / 2) + '</div>',
//                         (margins.vleft + margins.vright) / 2,
//                         (margins.vbottom + margins.vtop) / 2);
// 			};
// 		}(this);
// 	});
// });


/*********************************** Html ***********************************/
/*********************************** Html ***********************************/
/*********************************** Html ***********************************/
jehon.html = (function() {
	jQuery(document).on(jehon.events.pagechange, "body, div", function(event, data) {
		var scope = event.target;
		console.groupCollapsed("Event pagechange in jehon.html for %O", this);
		console.log(data);

		data = jQuery().extend({ 'mode': jehon.settings.mode }, data);
		
        // -------------------------- Modes -----------------------
        if (typeof(data.mode) != 'undefined') {
            jehon.html.showMode(data.mode, {'scope': scope });
        }

        // -------------------------- Table Sorter  -----------------------
        jQuery('.tablesorter', scope).each(function() {
            if (jQuery(this).children('tbody').children('tr').length == 0) {
                console.log('tablesorter: no children');
//	            jQuery(this).remove();
                return;
           }
           if (!this.id) {
	        	console.log("tablesorter: no id found - creating one");
	        	this.id = jehon.utils.uuid();
	        	console.log(this);
//	        	return;
	        }
	        jQuery(this).tablesorter();
	        var pagesize = jQuery(this).attr('pagesize');
	        if (pagesize != null) {
	            if (jQuery(this).children('tbody').children('tr').length > pagesize) {
	                var pager = "<div class='pager' for='" + this.id + "'>  \
	<form action='javascript:true;'> \
	    <span class='first'></span> \
	    <span class='prev'></span> \
	    <span class='pagedisplay'></span> \
	    <input type='text' class='pagedisplay'/> \
	    <span class='next'></span> \
	    <span class='last'></span> \
	    <select class='pagesize'> \
	        <option value='5'>5</option> \
	        <option value='10'>10</option> \
	        <option value='25'>25</option> \
	        <option value='50'>50</option> \
	        <option value='100'>100</option> \
	        <option value='1000'>1000</option> \
	        </select> \
	    </form> \
	</div>";
	                jQuery(this).after(pager);
	                jQuery(".pagesize", ".pager[for=" + this.id + "]").val(pagesize);
	                
	                jQuery(this)
	                    .tablesorterPager({
	                        'container': jQuery(".pager[for=" + this.id + "]"), 
	                        'size': parseInt(pagesize)
	                    });
	            } else {
	                console.log("tablesorter: No paging necessary: " + jQuery(this).children('tbody').children('tr').length + " vs. " + pagesize);
	            }
	        }
	    });
	    
	    // -------------------------- Sections functions --------------------
	    jQuery('fieldset.collapsable > legend', scope).on('click', function() {
	        // hide the parent:
	        jQuery(this).parent().toggleClass('collapsed', jehon.settings.collapsable.timing);
	    });

	    // Other autocomplete
	    jQuery('input[autocompletelist]', scope).each(function() {
	        var tsrc = jQuery(this).attr('autocompletelist');
	        var src = eval(tsrc);
	        if ((typeof(src) == 'undefined') || (src.length == 0)) {
	            console.error("autocomplete: src is empty: " + jQuery(this).id + " = " + tsrc);
	            return ;
	        }
	            
	        if (jQuery(this).is('[multiple]')) {
	        	/**
	        	 * Auto complete hack to allow multiple values
	        	 */
	    	    jQuery(this).bind('blur', function() {
	    	        // Sort items on leaving the field
	    	        var terms = this.value.split(/,\s*/);
	    	        terms.sort();
	    	        if (terms[0] == "")
	    	            terms.shift();
	    	        this.value = terms.join(",");
	    	    }).autocomplete({
	    	        minLength : 0,
	    	        source : function(request, response) {
	    	            // delegate back to autocomplete, but extract the last term
	    	            response(jQuery.ui.autocomplete.filter(src, request.term.split(/,\s*/).pop()));
	    	        },
	    	        focus : function() {
	    	            // prevent value inserted on focus
	    	            return false;
	    	        },
	    	        select : function(event, ui) {
	    	            var terms = this.value.split(/,\s*/);
	    	            terms.pop();
	    	            terms.push(ui.item.value);
	    	            terms.sort();
	    	            terms.push("");
	    	            this.value = terms.join(",");
	    	            return false;
	    	        }
	    	    });
	        } else {
	            jQuery(this).autocomplete({ source: src });
	        }
	    });
	    
	    // -------- Security
	    if (typeof(jehon.settings.denied) != "undefined") {
	        _(jehon.settings.denied).each(function(t) {
	            console.log("denied: " + t);
	            jQuery("[security=" + t + "]", scope).hide();
	        });
	    } 

	    // -------- Ending it
	    jQuery(scope).removeClass('disabled');
	    console.groupEnd();
	});
	
	return {
		/**
		 * Mark a div as disabled, graying it
		 * @param cssSelector {cssSelector}: the scop to be disabled
		 */
		disabled: function(cssSelector) {
		    jQuery(cssSelector).addClass('disabled');
		},
		error: function(msg) { 
			console.error(msg); return "<span class='error'>"+msg+"</span>";
		},

		showMode: function(mode, options) {
			options = jQuery().extend({
				'scope': document,
				'tag': 'modes'
			}, options);
//			console.log("mode [" + options.tag + "]: " + mode);
			jQuery('[' + options.tag + ']', options.scope).hide();
			_(mode.split(",")).each(function(m) {
				jQuery('[' + options.tag + '~=' + m + ']', options.scope).show();
			});
		}
		
//		/**
//		 * Mark a div as "waiting"
//		 * Optionnaly show a message in it
//		 * @param {cssSelector} cssSelector
//		 */
//		waiting: function(cssSelector, message) {
//		    if (typeof(message) == "undefined") message = "";
//		    jQuery(cssSelector).html("<span class='waiting' id='message'>" + message + "</span>").css('text-align: center');
//		}
	};
}());

/*********************************** Templates ******************************/
/*********************************** Templates ******************************/
/*********************************** Templates ******************************/
if (typeof(dust)!="undefined") {
	jehon.templates = (function() {
		dust.filters.nl2br = function(e) {
	    	return e.split("\n").join("<br>\n");
		};

		dust.filters.secs2hms = function(secs) {
		    if (typeof(secs) == "string") {
		        if (isNaN(parseInt(secs))) {
		            return secs;
		        }
		    }
		    if (secs < 0) return "-undefined-";
		    var h = Math.floor(secs / 3600);;
		    var m = Math.floor((secs - (h * 3600)) / 60);;
		    var s = Math.floor(secs) % 60;
		    return ("00"+h).slice(-2) + ":" + ("00"+m).slice(-2) + ":" + ("00"+s).slice(-2);
		    return value;
	   	};

	   	dust.helpers.list = function(chunk, context, bodies, params) {
	   		// tip: console.log(dust.helpers.tap(params.header, chunk, context));
	        // tip: console.log(context.get('type'));
		    var res = "";
	        if (typeof(params.type) == "undefined") return chunk.write(jehon.html.error("List: no type given"));
	        if (typeof(params.name) == "undefined") return chunk.write(jehon.html.error("List<" + params.type + ">: no name given"));
	        if (typeof(params.list) == "undefined") return chunk.write(jehon.html.error("List<" + params.type + ">#" + params.name + ": no list given"));
	        var selected;
	        if (typeof(params.value) == "undefined") {
	            selected = params.def;
	        } else {
	            selected = params.value;
	        }
	        if (selected == null) selected = "";
	        var list = params.list;
	        if (typeof(list) != 'object') {
	            // If the list is given as string
	            console.log("list as string");
	            list = list.split(",");
	            if (_(list).size() > 1) {
	            	console.log("list is a comma separated list %o", list);
		            var nlist = {};
		            _(list).each(function(v, i) {
		            	console.log(v);
		                if (typeof(v) == "string") {
		                    var ttt = v.split(":");
		                    console.log(ttt);
		                    if (_(ttt).size() > 1) {
		                        nlist[ttt[0]] = ttt[1];
		                    } else {
		                        nlist[v] = v;
		                    }
		                } else {
		                	nlist[v] = v;
		                }
		            });
	            } else {
	            	console.log("list is a name: " + list[0]);
	            	nlist = eval(list[0]);
	            }
	            list = nlist;
	        } else {
	            // If the list is given as array of value, key = value
		        if (list.length > 0) {
		            var nlist = {};
		            _(list).each(function(v, i) {
		                nlist[v] = v;
		            });
		            list = nlist;
		        }
	        }
	        
	        console.log("selected: " + selected);

	        // Begin
	        switch(params.type) {
	            case "radios": break;
	            case "select": chunk.write("<select name='" + params.name + "'>"); break;
	            default: {
	                return chunk.write(jehon.html.error("invalid type: " + params.type));
	            }
	        }
	        var ni = 0;
	        var nn = _(list).size();
	        _(list).each(function(txt, val) {
	            switch(params.type) {
	                case "radios": 
	                    chunk.write("<input type='radio' name='" + params.name + "' value='"+val+"' "+ (val == selected ? "checked " : "") + ">" + txt);
	                    break;
	                case "select":
	                    chunk.write("<option value='" + val + "'" + (val == selected ? ' selected' : '')+ ">" + txt + "</option>"); 
	                    break;
	            }
	            if (typeof(params.separator) != "undefined")
	                if (typeof(params.separator) == "function")
	                    chunk.write(params.separator(ni, nn));
	                else
	                    chunk.write(params.separator);
	            ni++;
	        });
	        switch(params.type) {
	            case "radios": break;
	            case "select": chunk.write("</select>"); break;
	        }
	        return chunk.write(res);
	    };
		
	    function render(name, doc, cssTarget, options) {
	        console.groupCollapsed("render %s into css %o with doc %O", name, doc, cssTarget);
	        if (typeof(options) == 'function') options = {'callback': options};
	        options = jQuery().extend({ 
	            beforeShow: function() {}
	        }, options);
	        if (typeof(dust.cache[name]) == 'undefined') {
	            console.error("Template <" + name + "> unknown");
	            jQuery(cssTarget).html(jehon.html.error("Template " + name + " unknown"));
	            console.groupEnd();
	            return ;
	        }
            if (jQuery(cssTarget).length == 0) {
                console.error("no target match: %O", cssTarget);
                console.groupEnd();
                return;
            }
	        console.groupCollapsed("render internals");
	        dust.render(name, doc, function(err, out) {
	            if (err != null) {
	                console.groupEnd();
	                console.groupEnd();
	                console.error('Problem when instantiating template: %O', err);
	                return;
	            } 
	            console.groupEnd(); // render internals
	            jQuery(cssTarget).html(out);
	            options.beforeShow(doc);
	            if (typeof(options.mode) == "string") {
	            	jQuery(cssTarget).trigger(jehon.events.pagechange, { mode: options.mode });
	            } else {
	            	jQuery(cssTarget).trigger(jehon.events.pagechange);
	            }
	            if (typeof(options.callback) == 'function') {
	                console.log("callback exists. Closing group and launching it");
	                console.groupEnd();
	                options.callback();
	            } else {
	                console.groupEnd();
	            }
	        });
	    };
	    return { 'render': render };
	}());
} else {
	console.error("dust.js is not loaded");
}

/**************************** Utils *****************************************/
/**************************** Utils *****************************************/
/**************************** Utils *****************************************/
jehon.utils = {};
jehon.utils.browserDescription = function() {
    var res = "";
    res += window.navigator.userAgent;
    return res;
};

/**
 * Remove empty values from the array
 * @param a {array}
 * @para trim {boolean}: consider spaces as empty values (default: yes)
 */
jehon.utils.removeEmpty = function(a, trim) {
    if (typeof(trim) == 'undefined')
        trim = true;
    return _.filter(a, function(i) {
        if (trim) 
        	return i.trim().length > 0;            
        return i.length > 0;            
    });
};

/**
 * Remove a specific value from the array
 * @param {Object} a: an array
 * @param {Object} val: the value to be looked up and removed
 */
jehon.utils.removeFromArray = function(a, val) {
	if (Array.isArray(val)) {
		var n = a;
		for ( var i = 0; i < val.length; i++)
			n = jehon.removeFromArray(n, val[i]);
		return n;
	} else {
		var i = a.indexOf(val);
		if (i < 0)
			return a;
        return a.slice(0, i).concat(a.slice(i + 1, a.length));
	}
};

/**
 * Replace a string formatted as object: 
 *      "a=b,c=d,e" into object { a:b, c:d, e:e }
 *      "1,2,3" into { 1: 1, 2: 2, 3: 3 }
 */
jehon.utils.stringToObject = function(string) {
    if (typeof(string) != "string") return {}; 
    var list = string.split(",");
    var res = {};
    _(list).each(function(i) {
        var v = i;
        var l = i;
        var ttt = i.split(":");
        if (ttt.length > 1) {
            l = ttt[0];
            v = ttt[1];
        }
        res[l] = v;
    });
    return res;
};

/**
 * Return an artificial uuid, in fact, a sequential id
 */
jehon.utils.uuid = (function() {
	var uuid = 1;
	return function() {
		uuid++;
		return "juid-" + uuid;
	};
})();

/**************************** STARTUP FUNCTIONS ******************************/
/**************************** STARTUP FUNCTIONS ******************************/
/**************************** STARTUP FUNCTIONS ******************************/
jQuery(function() {
	/**
	 * Resize the application, with:
	 *     - application_header and application_footer as fixed
	 *     - application_content and application_leftbar as scrollable
	 */
	function myresize() {
	    // This function is needed by the window.onresize
	    var menus = 0;
	    jQuery("#application_header, #application_footer").each(function () { 
	        menus = menus + jQuery(this).outerHeight();
	    });
	    
	    jQuery("#application_content, #application_leftbar").each(function() {
	        var padding = jQuery(this).outerHeight() - jQuery(this).height();
	        jQuery(this).height(jQuery(window).height() - menus - padding);
	        jQuery(this).height(jQuery(window).height() - menus - padding);
	    });
	    
	};
	myresize();
    jQuery(window).on('resize', function() {
    	myresize();
    });
});

/*********************************** EXECUTE ********************************/
/*********************************** EXECUTE ********************************/
/*********************************** EXECUTE ********************************/

jehon.ready = function(fn) {
	jQuery(document).on(jehon.events.ready, fn);
};

jQuery(document).on(jehon.events.pagechange, "body, div, span", function(event) {
	// Prevent the pagechange event from bubling up the tree
	event.stopPropagation();
});

jQuery(function() {
    jQuery(function() {
		jQuery("body").trigger(jehon.events.pagechange, { 'mode': jehon.settings.mode } );
		jQuery(document).triggerHandler(jehon.events.ready);
	});
});
