"use strict";

application.models.RicketConsult = application.models.File.extend({
	'init': function(data, patient) {
		this._super(data, patient);
		if (!data) {
			this._type = "RicketConsult";
		}
	},
});
