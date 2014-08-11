"use strict";

cryptomedic.models.ClubFoot = cryptomedic.models.File.extend({
	'init': function(data, patient) {
		this._super(data, patient);
		if (!data) {
			this._type = "ClubFoot";
		}
	},
});
