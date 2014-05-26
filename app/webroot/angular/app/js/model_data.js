"use strict";

cryptomedic.models = {};

cryptomedic.models.Data = Class.extend({
	init: function(data){
//		this._super();
		if (data != null) {
			for(var i in data) {
				this[i] = data[i];
			}
		}
	},
	getName: function () { return 'Data'; }
});
