"use strict";

cryptomedic.models = {};

cryptomedic.models.Data = Class.extend({
	init: function(data){
		this.load(data);
	},
	load: function(data) {
		if ((typeof(data) != undefined) && (data != null)) {
			for(var i in data) {
				this[i] = data[i];
			}
		}
	},
	loadFrom: function(url, cb) {
		var t = this;
		return jQuery.getJSON(url).done(function(data) {
			t.load(data);
		});
	}
});
