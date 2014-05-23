"use strict";

cryptomedic.prototypes.file = Class.extend({
	initialize : function() { // initialize is called by constructor at instanciation.
		this.numberOfLegs = 4;
	},
	test: function() { console.info("test working"); },	
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
	patient: function() {
		return file[0];
	}
});


//cryptomedic.prototypes.file = function() {};
//cryptomedic.prototypes.file.prototype = {};
