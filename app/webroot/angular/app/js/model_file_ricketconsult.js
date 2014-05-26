"use strict";

cryptomedic.prototypes.ricketconsult = Class.extend({
	getName: function() { return 'ricketconsult'; },
	actualage: function() {
		if (this.Yearofbirth >= 1900) {
			return (new Date().getFullYear() - this.Yearofbirth) + " years old today";
		} else {
			return "#Year of birth unknown#";
		} 

	},
});
