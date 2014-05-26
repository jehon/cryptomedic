"use strict";

cryptomedic.models.Folder = cryptomedic.models.Data.extend(cryptomedic.models.Data, {
	init : function() {},
	objectizeList: function() {
		for(var i in this.files) {
			if (!(this.files[i] instanceof Class)) {
				var type = this.files[i]['type'].toLowerCase();
				if (typeof(cryptomedic.models[type]) == "undefined") {
					console.error("No type found for: " + type + " - Fallback to Class");
					this.files[i] = new (cryptomedic.models.data)(this.files[i]);
				} else {
					this.files[i] = new (cryptomedic.models[type])(this.files[i]);
				}
			}
		}
		this.files = this.files.sort(this.ordering);
	},
	file: function(i) {
		return files[i];
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
	getPatient: function() {
		return this.files[0];
	}
});
