"use strict";

cryptomedic.models.RicketConsult = cryptomedic.models.File.extend({
	'init': function(data, patient) {
		this._super(data, patient);
		if (!data) {
			this._type = "RicketConsult";
		}
	},
});
