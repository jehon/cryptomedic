"use strict";

cryptomedic.models.File = cryptomedic.models.Data.extend({
	'init': function(data, patient) {
		this._super(data);
		this.patient = patient;
	},
	'ageAtConsultTime': function() {
		if (!this.isNotZero('Date')) throw new DataMissingException("Date");
		if (!this.isNotZero('patient')) throw new DataMissingException("Patient");
		if (!this.patient.isNotZero('Yearofbirth')) throw new DataMissingException("Year of Birth");
	    
		return parseInt(this.Date.substr(0, 4)) - this.patient.Yearofbirth;
	},
	'ds_height': function() {
		if (!this.isNotZero("Heightcm")) throw new DataMissingException("Height");
		var sex = this.patient.sexStr();
		if (!sex) throw new DataMissingException("sex");
		var age = this.ageAtConsultTime();
		if (typeof(age) != "number") throw new DataMissingException("Age");

		return cryptomedic.math.stdDeviation(amd_stats[sex]['height'], age, this.Heightcm);
	},
	'ds_weight': function() {
		if (!this.isNotZero("Weightkg")) throw new DataMissingException("Weight");
		var sex = this.patient.sexStr();
		if (!sex) throw new DataMissingException("sex");
		var age = this.ageAtConsultTime();
		if (typeof(age) != "number") throw new DataMissingException("Age");

		return cryptomedic.math.stdDeviation(amd_stats[sex]['weight'], age, this.Weightkg);
	},
	'wh': function() {
		if (!this.isNotZero("Heightcm")) throw new DataMissingException("Height");
		if (!this.isNotZero("Weightkg")) throw new DataMissingException("Weight");

		return this.Weightkg/this.Heightcm;
	},
	'ds_weight_height': function() {
		if (!this.isNotZero("Heightcm")) throw new DataMissingException("Height");
		if (!this.isNotZero("Weightkg")) throw new DataMissingException("Weight");
		var sex = this.patient.sexStr();
		if (!sex) throw new DataMissingException("sex");

		return cryptomedic.math.stdDeviation(amd_stats[sex]['wh'], el.Heightcm, el.Weightkg);
	},
	'bmi': function(height, weight) {
		if (!this.isNotZero("Heightcm")) throw new DataMissingException("Height");
		if (!this.isNotZero("Weightkg")) throw new DataMissingException("Weight");

		return 10000 * this.Weightkg / (this.Heightcm * this.Heightcm);
	},
	'ds_bmi': function() {
//		if (!this.isNotZero("Heightcm")) throw new DataMissingException("Height");
//		if (!this.isNotZero("Weightkg")) throw new DataMissingException("Weight");
		var sex = this.patient.sexStr();
		if (!sex) throw new DataMissingException("sex");
		var age = this.ageAtConsultTime();
		if (typeof(age) != "number") throw new DataMissingException("Age");

		return cryptomedic.math.stdDeviation(amd_stats[sex]['BMI'], age, this.bmi());
	}
});
