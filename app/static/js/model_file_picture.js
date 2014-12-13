"use strict";

application.models.Picture = application.models.File.extend({
	'init': function(data, patient) {
		this._super(data, patient);
		if (!data) {
			this._type = "Picture";
		}
	},
});
