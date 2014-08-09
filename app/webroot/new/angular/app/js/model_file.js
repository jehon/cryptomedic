"use strict";

cryptomedic.models.File = cryptomedic.models.Data.extend({
	'setPatient': function(patient) {
		this.getPatient = function() { return patient; }; 
	},
	'init': function(data, patient) {
		this._super(data);
		if (typeof(patient) == "undefined") patient = null;
		this.setPatient(patient);
		// this.patient = patient;
	},
	'ageAtConsultTime': function() {
		if (!this.isNotZero('Date')) throw new DataMissingException("Date");
		// if (this.Date.substr(0, 10) == "0000-00-00") throw new DataMissingException("Date");
		if (this.getPatient() == null) throw new DataMissingException("Patient");
		if (!this.getPatient().isNotZero('Yearofbirth')) throw new DataMissingException("Year of Birth");

		return (this.Date.getFullYear() - this.getPatient().Yearofbirth);
	},
	'ds_height': function() {
		var sex = this.getPatient().sexStr();
		if (!sex) throw new DataMissingException("sex");
		var age = this.ageAtConsultTime();
		if (typeof(age) != "number") throw new DataMissingException("Age");
		if (!this.isNotZero("Heightcm")) throw new DataMissingException("Height");

		return cryptomedic.math.stdDeviation(amd_stats[sex]['Heightcm'], age, this.Heightcm);
	},
	'ds_weight': function() {
		var sex = this.getPatient().sexStr();
		if (!sex) throw new DataMissingException("sex");
		var age = this.ageAtConsultTime();
		if (typeof(age) != "number") throw new DataMissingException("Age");
		if (!this.isNotZero("Weightkg")) throw new DataMissingException("Weight");

		return cryptomedic.math.stdDeviation(amd_stats[sex]['Weightkg'], age, this.Weightkg);
	},
	'wh': function() {
		if (!this.isNotZero("Heightcm")) throw new DataMissingException("Height");
		if (!this.isNotZero("Weightkg")) throw new DataMissingException("Weight");

		return this.Weightkg/this.Heightcm;
	},
	'ds_weight_height': function() {
		var sex = this.getPatient().sexStr();
		if (!sex) throw new DataMissingException("sex");
		if (!this.isNotZero("Heightcm")) throw new DataMissingException("Height");
		if (!this.isNotZero("Weightkg")) throw new DataMissingException("Weight");

		return cryptomedic.math.stdDeviation(amd_stats[sex]['wh'], this.Heightcm, this.Weightkg);
	},
	'bmi': function(height, weight) {
		if (!this.isNotZero("Heightcm")) throw new DataMissingException("Height");
		if (!this.isNotZero("Weightkg")) throw new DataMissingException("Weight");

		return 10000 * this.Weightkg / (this.Heightcm * this.Heightcm);
	},
	'ds_bmi': function() {
		var sex = this.getPatient().sexStr();
		if (!sex) throw new DataMissingException("sex");
		var age = this.ageAtConsultTime();
		if (typeof(age) != "number") throw new DataMissingException("Age");

		return cryptomedic.math.stdDeviation(amd_stats[sex]['bmi'], age, this.bmi());
	},
	'isLocked': function () {
		if (!this.modified) return false;
		var dlock = new Date(this.modified);
		dlock.setDate(dlock.getDate() + 5);
		return (dlock < new Date());
	}
});
