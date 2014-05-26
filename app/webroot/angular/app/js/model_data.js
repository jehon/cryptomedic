"use strict";

cryptomedic.models = {};

cryptomedic.models.Data = Class.extend({
	init: function(data){
//		this._super.init();
		this.load(data);
	},
	load: function(data) {
		if ((typeof(data) != undefined) && (data != null)) {
			for(var i in data) {
				this[i] = data[i];
			}
		}
	},
	getName: function () { return 'Data'; }
});
