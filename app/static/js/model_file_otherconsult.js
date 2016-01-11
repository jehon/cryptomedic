"use strict";

application.models.OtherConsult = application.models.File.extend({
	  "init": function(data, folder) {
		  this._super(data, folder);
		  if (!data) {
			  this._type = "OtherConsult";
		}
	},
});
