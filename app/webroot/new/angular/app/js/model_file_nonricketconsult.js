"use strict";

cryptomedic.models.NonricketConsult = cryptomedic.models.File.extend({
	'init': function(data, patient) {
		this._super(data, patient);
		if (!data) {
			this._type = "NonricketConsult";
		}
	},
});
