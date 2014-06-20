"use strict";

cryptomedic.models.Patient = cryptomedic.models.Data.extend({
	'actualAge': function(date) {
		date = date || new Date();
		if ((typeof(this.Yearofbirth) != "number") 
				|| ((typeof(this.Yearofbirth) == "number") && (this.Yearofbirth <= 1900)))
			throw new DataMissingException("Yearofbirth");
		return (date.getUTCFullYear() - this.Yearofbirth) + " years old today";
	},
	'sexStr': function() {
		if (!this.isNotZero('Sex')) return null;
		return this.Sex == 207 ? "m" : "f"; 
	},
	'calculateSocialLevel': function() {
		return "TODO";
	},
	'ratioSalary': function() {
		return "TODO";
	}
});
