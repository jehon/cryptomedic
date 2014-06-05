"use strict";

cryptomedic.models.Patient = cryptomedic.models.Data.extend({
	'actualAge': function(date) {
		date = date || new Date();
		if (this.Yearofbirth >= 1900) {
			return (date.getUTCFullYear() - this.Yearofbirth) + " years old today";
		}
		throw new DataMissingException("Year");
	},
	'sexStr': function() {
		if (!this.isNotZero('Sex')) return null;
		return this.Sex == 207 ? "m" : "f"; 
	}
});
