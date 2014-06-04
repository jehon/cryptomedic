"use strict";

cryptomedic.models.Patient = cryptomedic.models.Data.extend({
	'actualAge': function(date) {
		if (typeof(date) == "undefined") date = new Date();
		if (this.Yearofbirth >= 1900) {
			return (date.getFullYear() - this.Yearofbirth) + " years old today";
		} else {
			return "#Year of birth unknown#";
		} 
	},
	'sexStr': function() {
		if (!this.isNotZero('Sex')) return null;
		return this.Sex == 207 ? "m" : "f"; 
	}
});
