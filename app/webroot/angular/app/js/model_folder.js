"use strict";

cryptomedic.models.Folder = cryptomedic.models.Data.extend({
	load: function(data) {
		this._super(data);
		this.mainFile = this.mainFile || {};
		this.subFiles = this.subFiles || [];
		for(var i = 0; i < this.subFiles.length; i++) {
			this.subFiles[i].patient = this.mainFile;
		}
		this.subFiles.sort(this.ordering);
	},
	getId: function() { return this.id; },
	getSubFiles: function() {
		return this.subFiles;
	},
	getSubFile: function(i) {
		if (i >= this.subFiles.length) return null;
		return this.subFiles[i];
	},
	getMainFile: function() {
		return this.mainFile;
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
	}
});
