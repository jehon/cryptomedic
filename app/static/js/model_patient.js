"use strict";

application.models.Patient = application.models.Data.extend({
	'actualAge': function(date) {
		date = date || new Date();
		if ((typeof(this.Yearofbirth) != "number") 
				|| ((typeof(this.Yearofbirth) == "number") && (this.Yearofbirth <= 1900)))
			throw new DataMissingException("Yearofbirth");
		return (date.getUTCFullYear() - this.Yearofbirth);
	},
	'sexStr': function() {
		if (!this.isNotZero('Sex')) return null;
		return this.Sex == 207 ? "m" : "f"; 
	},
	'ratioSalary': function() {
		if (!this.isNotZero('Numberofhouseholdmembers')) throw new DataMissingException("Numberofhouseholdmembers");
		return Math.ceil(this.Familysalaryinamonth / this.Numberofhouseholdmembers);
	},
	'calculateSocialLevel': function() {
		/**
			From TC:
		 	Level 0 is when the familial ration is < 300
			Level 1 is when the familial ration is 300<  FR < 500
			Level 2 is when the familial ration is 500< FR < 1500
			Level 3 is when the familial ration is 1500< FR < 3000
			Level 4 is when the familial ration is 3000< FR  
		 * 
		 */
		
		if (typeof(this.ratioSalary()) == "string") throw new DataMissingException("Numberofhouseholdmembers");
		if (this.ratioSalary() <= 300) 	return 0;
		if (this.ratioSalary() <= 500)	return 1;
		if (this.ratioSalary() <= 1500)	return 2;
		if (this.ratioSalary() <= 3000)	return 3;
		return 4;
	},
	'validate': function(res) {
		res = this._super(res);

		if (!this.pathology_Clubfoot
			&& !this.pathology_Ricket
			&& !this.pathology_Adult
			&& !this.pathology_CP
			&& !this.pathology_Polio
			&& !this.pathology_Burn
			&& !this.pathology_Congenital
			&& !this.pathology_other) {

			res.noPathology = true;
		}

		return res;
	}
});
