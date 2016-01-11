"use strict";

application.models.ClubFoot = application.models.File.extend({
	  "init": function(data, folder) {
		  this._super(data, folder);
		  if (!data) {
			  this._type = "ClubFoot";
		}
	},
	  "f": function(val) {
		  if (val == null) return 0;
		  if (typeof(val) == "string") return parseFloat(val);
		  return val;
	},
	  "getPiraniLeft": function() {
		  return this.f(this.CurvedLateralBorderLeft)
			+ this.f(this.MedialCreaseLeft)
			+ this.f(this.TalarHeadCoverageLeft)
			+ this.f(this.PosteriorCreaseLeft)
			+ this.f(this.RigidEquinusLeft)
			+ this.f(this.EmptyHeelLeft);
	},

	  "getPiraniRight": function() {
		  return this.f(this.CurvedLateralBorderRight)
			+ this.f(this.MedialCreaseRight)
			+ this.f(this.TalarHeadCoverageRight)
			+ this.f(this.PosteriorCreaseRight)
			+ this.f(this.RigidEquinusRight)
			+ this.f(this.EmptyHeelRight);
	}
});
