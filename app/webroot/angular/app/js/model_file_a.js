"use strict";

cryptomedic.models.File = cryptomedic.models.Data.extend({
	'init': function(data, patient) {
		this._super(data);
		this.patient = patient;
	},
	'ageAtConsultTime': function() {
		if (!this.isNotZero('Date')) return "#Date unknown#";
		if (!this.isNotZero('patient')) return "#Patient not found#";
		if (!this.patient.isNotZero('Yearofbirth')) return "#Year of Birth unknown#";
	    
		return parseInt(this.Date.substr(0, 4)) - this.patient.Yearofbirth;
	},
	'ageAtConsultTimeStr': function() {
		var age = this.ageAtConsultTime();
		if (typeof(age) == "number") return age + " years old at that time of consultation";
		return age;
	},
	'ds_height': function() {
		if (!this.isNotZero("Heightcm")) return "#Height unknown#";
		var sex = !this.patient.sexStr;
		if (!sex) return "#sex unknown#";
		var age = this.ageAtConsultTime();
		if (typeof(age) != "number") return "#Age unknowns#";
	
		return cryptomedic.math.stdDeviation(amd_stats[sex]['height'], age, this.Heightcm);
	},
	'ds_weight': function() {
		if (!this.isNotZero("Weightkg")) return "#Weight unknown#";
		var sex = !this.patient.sexStr;
		if (!sex) return "#sex unknown#";
		var age = this.ageAtConsultTime();
		if (typeof(age) != "number") return "#Age unknowns#";

		return cryptomedic.math.stdDeviation(amd_stats[sex]['weight'], age, this.Weightkg);
	},
	'wh': function() {
		if (!this.isNotZero("Heightcm")) return "#Height unknown#";
		if (!this.isNotZero("Weightkg")) return "#Weight unknown#";

		return this.Weightkg/this.Heightcm;
	},
	'ds_weight_height': function() {
		if (!this.isNotZero("Heightcm")) return "#Height unknown#";
		if (!this.isNotZero("Weightkg")) return "#Weight unknown#";
		var sex = !this.patient.sexStr;
		if (!sex) return "#sex unknown#";

		return cryptomedic.math.stdDeviation(amd_stats[sex]['wh'], el.Heightcm, el.Weightkg);
	},
	'bmi': function(height, weight) {
		if (!this.isNotZero("Heightcm")) return null;
		if (!this.isNotZero("Weightkg")) return null;

		return 10000 * this.Weightkg / (this.Heightcm * this.Heightcm);
	},
	'ds_bmi': function() {
		if (!this.isNotZero("Heightcm")) return "#Height unknown#";
		if (!this.isNotZero("Weightkg")) return "#Weight unknown#";
		var sex = !this.patient.sexStr;
		if (!sex) return "#sex unknown#";
		var age = this.ageAtConsultTime();
		if (typeof(age) != "number") return "#Age unknowns#";

		return cryptomedic.math.stdDeviation(amd_stats[sex]['BMI'], age, this.bmi());
	}
});
