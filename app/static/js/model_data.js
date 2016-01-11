"use strict";

application.models.Data = Class.extend({
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
	  setPatient: function(_patient) {
		  patient = _patient;
	},
	  isSet: function(field) {
		  if (typeof(this[field]) == "undefined") return false;
		  if (this[field] == null) return false;
		  return true;
	},
	  isNotZero: function(field) {
		  if (!this.isSet(field)) return false;
		  if (this[field] === 0) return false;
		  return true;
	},
	  "validate": function(res) {
		  if (!res) res = {};
		  return res;
	}
});
