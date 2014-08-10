"use strict";

cryptomedic.models.Data = Class.extend({
	init: function(data){
		if (typeof(data) == "undefined") {
			console.warn("We have undefined data");
		}
		if (data == null) {
			console.warn("We have null data");
		}
		this.load(data);
	},
	load: function(data) {
		if ((typeof(data) != undefined) && (data != null)) {
			for(var i in data) {
				this[i] = data[i];
			}
		}
	},
	loadFrom: function(url, cb) {
		var t = this;
		return jQuery.getJSON(url).done(function(data) {
			t.load(objectify(data));
		});
	},
	setPatient: function(_patient) {
		patient = _patient;
	},
	isSet: function(field) {
		if (typeof(this[field]) == "undefined") return false;
		if (this[field] == null) return false;
		return true;
	},
	isNotZero: function(field) {
		if (!this.isSet(field)) return false;
		if (this[field] === 0) return false;
		return true;
	}
});
