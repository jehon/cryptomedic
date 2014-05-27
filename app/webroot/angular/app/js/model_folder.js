"use strict";

cryptomedic.models.Folder = cryptomedic.models.Data.extend({
	init: function(data) {
		this.files = [];
 		this._super(data);
	},
	objectizeList: function() {
		if (this.files && (this.files.length > 0)) {
			for(var i in this.files) {
				if (!(this.files[i] instanceof Class)) {
					var type = this.files[i]['type'] ;//.toLowerCase();
					if (typeof(cryptomedic.models[type]) == "undefined") {
						console.error("No type found for: " + type + " - Fallback to Data");
						this.files[i] = new (cryptomedic.models.Data)(this.files[i]);
					} else {
						this.files[i] = new (cryptomedic.models[type])(this.files[i]);
					}
				}
			}
			this.files = this.files.sort(this.ordering);
		}
	},
	ordering: function(big, small) {
		// Sort by: [undefined/date]-type-id
		function st(what) {
			return (typeof(what['Date']) == 'undefined' ? "0" : what['Date']) +
				"-" +
				(typeof(what['type']) == 'undefined' ? "z" : what['type']) +
				"-" +
				(typeof(what['id']) == 'undefined' ? 0 : what['id']);
		}
		var bigs = st(big);
		var smls = st(small);
		if (bigs == smls) return 0;
		if (bigs > smls) return 1;
		return -1;
	},
	file: function(i) {
		if (i >= this.files.length) return null;
		return this.files[i];
	},
	getPatient: function() {
		return this.file(0);
	}
});
