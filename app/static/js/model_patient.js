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
	    	if (this.Sex == "Male") return "m";
	    	if (this.Sex == "Female") return "f";
	    	return null;
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
