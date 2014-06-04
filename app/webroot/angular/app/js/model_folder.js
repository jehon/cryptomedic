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
		if (typeof(o1['type']) != "undefined") {
			if (typeof(o2['type'] != "undefined")) {
				if (o1['type'] != o2['type']) {
					if (o1['type'] == "Patient") return o1First;
					if (o2['type'] == "Patient") return o2First;
//					return o1.localeCompare(o2);
				}
			}
		} 

		// What to do if one 'id' is missing
		if (typeof(o1['id']) == "undefined") {
			if (typeof(o2['id'] != "undefined")) return o1First;
		} else {
			if (typeof(o2['id'] == "undefined")) return o2First;
		}
		
		// What to do if one 'type' is missing
		if (typeof(o1['type']) == "undefined") { 
			if (typeof(o2['type'] != "undefined")) return o1First;
		} else {
			if (typeof(o2['type'] == "undefined")) return o2First;
		} 

		// What to do if one 'Date' is missing
		if (typeof(o1['Date']) == "undefined") { 
			if (typeof(o2['Date'] != "undefined")) return o1First;
		} else {
			if (typeof(o2['Date'] == "undefined")) return o2First;
		} 

		// What to do if info is missing at both sides ???
		
		// str1.localeCompare(str2);
		
		var big = o1;
		var small = o2;
		// Sort by: 
		//  - patients first
		//  - [undefined/date]-type-id
		function st(what) {
			return (typeof(what['Date']) == 'undefined' ? "9999-99-99" : what['Date']) +
				"-" +
				(typeof(what['type']) == 'undefined' ? "z" : what['type']) +
				"-" +
				(typeof(what['id']) == 'undefined' ? 0 : what['id']);
		}
		var bigs = st(big);
		var smls = st(small);
		if (bigs == smls) return 0;
		if (bigs > smls) return -1;
		return 1;
	},
	file: function(i) {
		if (i >= this.files.length) return null;
		return this.files[i];
	},
	getPatient: function() {
		return this.file(0);
	}
});
