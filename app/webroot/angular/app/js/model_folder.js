"use strict";

cryptomedic.models.Folder = cryptomedic.models.Data.extend({
	init: function(data) {
		this.files = [ new cryptomedic.models.Patient() ];
 		this._super(data);
	},
	objectizeList: function() {
		if (this.files && (this.files.length > 0)) {
			for(var i in this.files) {
				if (!(this.files[i] instanceof Class)) {
					var type = this.files[i]['type'] ;//.toLowerCase();
					if (typeof(cryptomedic.models[type]) == "undefined") {
						console.error("No type found for: " + type + " - Fallback to Class");
						this.files[i] = new (cryptomedic.models.data)(this.files[i]);
					} else {
						this.files[i] = new (cryptomedic.models[type])(this.files[i]);
					}
				}
			}
			this.files = this.files.sort(this.ordering);
		}
	},
	ordering: function(big, small) {
		if (typeof(big.Date) == "undefined") {
			if (typeof(small.Date) == "undefined") {
				// refine
				return 0;
			} else {
				return -1;
			}
		}
		if (typeof(small.Date) == "undefined") {
			return -1;
		}
		if (big.Date == small.Date) {
			// refine
			return 0;
		}
		return (big.Date > small.Date ? 1 : -1);
	},
	file: function(i) {
		if (i >= this.files.length) return null;
		return this.files[i];
	},
	getPatient: function() {
		return this.file(0);
	}
});
