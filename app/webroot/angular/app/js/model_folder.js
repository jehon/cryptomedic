"use strict";

cryptomedic.models.Folder = cryptomedic.models.Data.extend({
	init: function(data) {
		this.files = [];
 		this._super(data);
	},
	objectizeList: function() {
		if (this.files && (this.files.length > 0)) {
			var p = -1;
			for(var i in this.files) {
				if (this.files[i]['type'] == "Patient") {
					this.files[i] = new cryptomedic.models.Patient(this.files[i]);
					p = i;
				}
			}
			
			if (p < 0) console.error("No patient found");
			for(var i in this.files) {
				if (!(this.files[i] instanceof Class)) {
					var type = this.files[i]['type'] ;//.toLowerCase();
					if (typeof(cryptomedic.models[type]) == "undefined") {
						console.error("No type found for: " + type + " - Fallback to Data");
						this.files[i] = new (cryptomedic.models.Data)(this.files[i], this.files[p]);
					} else {
						this.files[i] = new (cryptomedic.models[type])(this.files[i], this.files[p]);
					}
				}
			}
			this.files = this.files.sort(this.ordering);
		}
	},
	ordering: function(o1, o2) {
		var o1First = -1;
		var o2First = 1;
		// Return 1 if o1 > o2 (o1 - o2) (o1 est après o2)
		// Return -1 if o1 < o2 (o1 - o2) (o1 est avant o2)
		
		// Patient are first, whatever happen!
		if ((typeof(o1['type']) != "undefined") && typeof(o2['type'] != "undefined") && (o1['type'] != o2['type'])) {
			if (o1['type'] == "Patient") return o1First;
			if (o2['type'] == "Patient") return o2First;
		} 

		// What to do if one 'id' is missing
		if (typeof(o1['id']) == "undefined") {
			if (typeof(o2['id']) != "undefined") {
				return o1First;
			}
		} else {
			if (typeof(o2['id']) == "undefined") {
				return o2First;
			}
		}
		
		// What to do if one 'type' is missing
		if (typeof(o1['type']) == "undefined") { 
			if (typeof(o2['type']) != "undefined") return o1First;
		} else {
			if (typeof(o2['type']) == "undefined") return o2First;
		} 

		// What to do if one 'Date' is missing
		if (typeof(o1['Date']) == "undefined") { 
			if (typeof(o2['Date']) != "undefined") return o1First;
		} else {
			if (typeof(o2['Date']) == "undefined") return o2First;
		} 

		// Both 'date' are present
		if (typeof(o1['Date']) != "undefined" && typeof(o2['Date']) != 'undefined') {
			if (o1['Date'] < o2['Date']) return o2First;
			if (o1['Date'] > o2['Date']) return o1First;
		}
		
		// Both 'type' are present
		if (typeof(o1['type']) != "undefined" && typeof(o2['type']) != 'undefined') {
			if (o1['type'] < o2['type']) return o1First;
			if (o1['type'] > o2['type']) return o2First;
		}
		
		// Both 'id' are present
		if (typeof(o1['id']) != "undefined" && typeof(o2['id']) != 'undefined') {
			if (o1['id'] < o2['id']) return o1First;
			if (o1['id'] > o2['id']) return o2First;
		}
		return 0;
	},
	file: function(i) {
		if (i >= this.files.length) return null;
		return this.files[i];
	},
	getPatient: function() {
		return this.file(0);
	}
});
