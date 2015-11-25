"use strict";

application.models.Appointment = application.models.File.extend({
	'init': function(data, folder) {
		this._super(data, folder);
		if (!data) {
      var now = new Date();
      var year = now.getFullYear();
      var month = "0" + (now.getMonth() + 1);
      month = month.substring(month.length - 2);
      var day = "0" + now.getDate();
      day = day.substring(day.length - 2);

			this.Date = year + "-" + month + "-" + day;
      this._type = "Appointment";
		}
	},
});
