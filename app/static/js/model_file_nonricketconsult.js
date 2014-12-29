"use strict";

application.models.NonricketConsult = application.models.File.extend({
	'init': function(data, folder) {
		this._super(data, folder);
		if (!data) {
			this._type = "NonricketConsult";
		}
	},
});
