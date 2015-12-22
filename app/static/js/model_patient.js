"use strict";

application.models.Patient = application.models.Data.extend({
	'sexStr': function() {
	    	if (!this.isNotZero('Sex')) return null;
	    	if (this.Sex == "Male") return "m";
	    	if (this.Sex == "Female") return "f";
	    	return null;
	},
});
