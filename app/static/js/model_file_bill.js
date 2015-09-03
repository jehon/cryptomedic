"use strict";

// TODO: there seems to have a race condition around here...

application.models.Bill = application.models.File.extend({
	'init': function(data, folder) {
		this._super(data, folder);
		if (!data) {
			// Initialize social level from last bill (if any)
			var last_bill = null;
			angular.forEach(folder.subFiles, function(v, k) {
				if (v._type == "Bill") {
					if (!last_bill) {
						last_bill = v;
					} else {
						if (last_bill.Date < v.Date) {
							last_bill = v;
						}
					}
				}
			});
			if (last_bill) {
				this.sl_familySalary = last_bill.sl_familySalary;
				this.sl_numberOfHouseholdMembers = last_bill.sl_numberOfHouseholdMembers;
			}
			this._type = "Bill";
		}
	},
	'ratioSalary': function() {
	/**
		From TC:
	 	Level 0 is when the familial ration is < 300
		Level 1 is when the familial ration is 300<  FR < 500
		Level 2 is when the familial ration is 500< FR < 1500
		Level 3 is when the familial ration is 1500< FR < 3000
		Level 4 is when the familial ration is 3000< FR  
	 */
		this.Sociallevel = 4;
		if (!this.isNotZero('sl_numberOfHouseholdMembers')) {
		    throw new DataMissingException("sl_numberOfHouseholdMembers");
		}

		var rs = Math.ceil(this.sl_familySalary / this.sl_numberOfHouseholdMembers);
		
		if (rs <= 300) 	{
		    this.Sociallevel = 0;
		} else {
		    if (rs <= 500) { 
			this.Sociallevel = 1;
		    } else {
			if (rs <= 1500)	{
			    this.Sociallevel = 2;
			} else {
			    if (rs <= 3000) {
				    this.Sociallevel = 3;
			    } else {
				    this.Sociallevel = 4;
			    }
			}
		    }
		}
		
		return rs;
	},
//	'calculateSocialLevel': function() {
//		/**
//			From TC:
//		 	Level 0 is when the familial ration is < 300
//			Level 1 is when the familial ration is 300<  FR < 500
//			Level 2 is when the familial ration is 500< FR < 1500
//			Level 3 is when the familial ration is 1500< FR < 3000
//			Level 4 is when the familial ration is 3000< FR  
//		 */
//
//		if (typeof(this.ratioSalary()) == "string") throw new DataMissingException("sl_numberOfHouseholdMembers");
//		if (this.ratioSalary() <= 300) 	{
//		    this.Sociallevel = 0;
//		} else {
//		    if (this.ratioSalary() <= 500) { 
//			this.Sociallevel = 1;
//		    } else {
//			if (this.ratioSalary() <= 1500)	{
//			    this.Sociallevel = 2;
//			} else {
//			    if (this.ratioSalary() <= 3000) {
//				    this.Sociallevel = 3;
//			    } else {
//				    this.Sociallevel = 4;
//			    }
//			}
//		    }
//		}
//		return this.Sociallevel;
//	},
	'calculate_total_real': function() {
		if (!this.price_id || !server.settings) {
			this.total_real = 0;
			this.total_asked = 0;
			return -1;
		}
		var price = server.settings.prices[this.price_id];
		var total = 0;
		angular.forEach(price, function(p, i) {
			if (i[0] == "_") return;
			if (i == "id") return;
			if (i == "created_at") return;
			if (i == "updated_at") return;
			if (i == "lastuser") return;
			if (i == "datefrom") return;
			if (i == "dateto") return;
			if (i == "controller") return;
			if (i == "locked") return;
			if (i == "dlocked") return;
			if (i == "socialLevelPercentage_0") return;
			if (i == "socialLevelPercentage_1") return;
			if (i == "socialLevelPercentage_2") return;
			if (i == "socialLevelPercentage_3") return;
			if (i == "socialLevelPercentage_4") return;
			if (p < 0) return;
			if (typeof(this[i]) == 'undefined') return;
			if (this[i] <= 0) return;
			total += price[i] * this[i];
		}, this);
		this.total_real = total;
		this.total_asked = this.total_real * this.calculate_percentage_asked();
		return this.total_real;
	},
	'calculate_percentage_asked': function() {
		if (!this.price_id || !server.settings) {
			//console.warn("calculate_percentage_asked(): no price id");
			return 1;
		}
		var sl = this['Sociallevel'];
		if (sl == null) {
			//console.warn("calculate_percentage_asked(): no social level");
			return 1;
		}
		var price = server.settings.prices[this.price_id];
		if (typeof(price["socialLevelPercentage_" + sl]) == "undefined") {
			//console.warn("calculate_percentage_asked(): no social level in price for sl " + sl);
			return 1;
		}
		var perc = price["socialLevelPercentage_" + sl];
		return perc;
	},
	'getPriceFor': function(key) {
	    if (!this.price_id || !server.settings) return 0;
	    if (typeof(server.settings.prices[this.price_id]) == 'undefined') return 0;
	    return server.settings.prices[this.price_id][key];
	},
	'getTotalFor': function(key) {
	    if (!this.price_id || !server.settings) return 0;
	    if (!this[key]) return 0;
	    return server.settings.prices[this.price_id][key] * this[key];
	},
	'calculatePriceId': function() {
		if (typeof(this.Date) == "undefined" || !server.settings) {
			this.price_id = 1;
			return 0;
		}
		this.price_id = -1;
		var t = this;
		var dref = this.Date;
		angular.forEach(server.settings.prices, function(p, i) {
			// console.log(p);
			if (((p['datefrom'] == null) || (p['datefrom'] <= dref))
					&& ((p['dateto'] == null) || (p['dateto'] > dref))) {
				t.price_id = i;
			}
		});
		if (this.price_id < 0) {
			throw new ApplicationException("Price Id not set");
		}
		this.calculate_total_real();
	},
	'tagIt': function() {
		if (pi < 0) {
			angular.forEach(server.settings.prices[pi], function(v, i) {
				var tag = "[pricefor=" + i + "]";
				if (v > 0) {
					jQuery(tag).html(v);
					jQuery(tag).parentsUntil('tbody').find("input").attr('disabled', false);
				} else {
					jQuery(tag).html('not available');
					jQuery(tag).parentsUntil('tbody').find("input").attr('disabled', true).val(0);
				}
			});
		}
	},
	'calculateIt': function() {
	    if (!!server.settings) return 0;
		var pi = jQuery('[name="data[price_id]"]').val();
		var total = 0;
		_(jQuery('input:enabled[type=number]')).each(function(v, i) {
			var n = jQuery(v).attr('name').replace("data[", "").replace("]", "");
			var p = server.settings.prices[pi][n]; 
			if ((typeof(p) != 'undefined') && (p > 0)) {
				total += p * jQuery(v).val();
			}
		});
		jQuery('#total_real').html(total);
		var total_social = total;
		var sl = jQuery('[name="data[Sociallevel]"]:checked').val();
		if ((typeof(sl) != undefined) && (sl >= "")) {
			var psl = server.settings.prices[pi]['socialLevelPercentage_' + sl];
			if ((typeof(psl) != 'undefined') && (psl >= 0)) {
				total_social = total * psl;
			}
		}
		jQuery('#total_asked').html(total_social);
	},
	'validate': function(res) {
		/* Business rules (price > 4):
		- il faut pourvoir coder home visit ou give appointment mais pas les 2
		- il faut pourvoir coder consultation physio ou doctor mais pas les 2
		*/
		res = this._super(res);

		if (this.price_id >= 2) {
			if ((this.consult_home_visit > 0) && (this.consult_give_appointment > 0)) {
				res.homeVisitAndGiveAppointment = true;
			}
	
			if ((this.consult_CDC_consultation_physio > 0) && (this.consult_CDC_consultation_Doctor > 0)) {
				res.consultPhisioAndDoctor = true;
			}
		}
		return res;
	}
});
