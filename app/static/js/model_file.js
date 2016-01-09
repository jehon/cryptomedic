"use strict";

application.models.File = application.models.Data.extend({
	'init': function(data, folder) {
		this._super(data, folder);
		if (data == null) {
			this.patient_id = folder.getMainFile().id;
			var c = service_session_storage();
			this.ExaminerName = c.get("examinerName", "");
			this.Center = c.get("center", "Chakaria");
			this.Date = c.get("date", null);
			if (this.Date == null) {
				this.Date = date2CanonicString(new Date(), true);
			}
		} else {
			if (typeof(folder) == "undefined") folder = null;
			// this.patient = patient;
		}
		if (folder && folder.getMainFile) {
			this.setPatient(folder.getMainFile());
		} else {
			this.setPatient(null);
		}
	},
	'setPatient': function(patient) {
		this.getPatient = function() { return patient; };
	},
	// For graphic, by default it expect number -> textual render it in text only on demand
	'ageAtConsultTime': function(textual) {
		var age = calculations.age.fromBirthDate(this.getPatient().Yearofbirth, { reference: this.Date, format: (textual ? false : 'number') });
		// if (age == "?") throw new DataMissingException("Date");
		return age;
	},
	'ds_height': function() {
		var sex = this.getPatient().sexStr();
		if (!sex) throw new DataMissingException("sex");
		var age = this.ageAtConsultTime();
		if (typeof(age) != "number") throw new DataMissingException("Age");
		if (!this.isNotZero("Heightcm")) throw new DataMissingException("Height");

		return calculations.math.stdDeviation(amd_stats[sex]['Heightcm'], age, this.Heightcm);
	},
	'ds_weight': function() {
		var sex = this.getPatient().sexStr();
		if (!sex) throw new DataMissingException("sex");
		var age = this.ageAtConsultTime();
		if (typeof(age) != "number") throw new DataMissingException("Age");
		if (!this.isNotZero("Weightkg")) throw new DataMissingException("Weight");

		return calculations.math.stdDeviation(amd_stats[sex]['Weightkg'], age, this.Weightkg);
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

		return calculations.math.stdDeviation(amd_stats[sex]['wh'], this.Heightcm, this.Weightkg);
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

		return calculations.math.stdDeviation(amd_stats[sex]['bmi'], age, this.bmi());
	},
	'isLocked': function () {
		if (!this.updated_at) return false;
		var dlock = new Date(this.updated_at);
		dlock.setDate(dlock.getDate() + 35);
		return (dlock < new Date());
	},
});
