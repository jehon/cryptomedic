"use strict";

application.models.Bill = application.models.File.extend({
	'init': function(data, folder) {
		this._super(data, folder);
		if (!data) {
			// Initialize social level from last bill (if any)
			var last_bill = null;
			angular.forEach(folder.subFiles, function(v, k) {
				if (v._type == "Bill") {
					console.log(v);
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
		if (!this.isNotZero('sl_numberOfHouseholdMembers')) throw new DataMissingException("sl_numberOfHouseholdMembers");
		return Math.ceil(this.sl_familySalary / this.sl_numberOfHouseholdMembers);
	},
	'calculateSocialLevel': function() {
		/**
			From TC:
		 	Level 0 is when the familial ration is < 300
			Level 1 is when the familial ration is 300<  FR < 500
			Level 2 is when the familial ration is 500< FR < 1500
			Level 3 is when the familial ration is 1500< FR < 3000
			Level 4 is when the familial ration is 3000< FR  
		 */

		if (typeof(this.ratioSalary()) == "string") throw new DataMissingException("sl_numberOfHouseholdMembers");
		if (this.ratioSalary() <= 300) 	return 0;
		if (this.ratioSalary() <= 500)	return 1;
		if (this.ratioSalary() <= 1500)	return 2;
		if (this.ratioSalary() <= 3000)	return 3;
		return 4;
	},
	'calculate_total_real': function() {
		if (!this.price_id) {
			this.total_real = 0;
			this.total_asked = 0;
			return -1;
		}
		var price = cryptomedic.prices[this.price_id];
		var total = 0;
		angular.forEach(price, function(p, i) {
			if (i[0] == "_") return;
			if (i == "id") return;
			if (i == "modified") return;
			if (i == "created") return;
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
		if (!this.price_id) {
			console.warn("calculate_percentage_asked(): no price id");
			return 1;
		}
		var sl = this['Sociallevel'];
		if (sl == null) {
			console.warn("calculate_percentage_asked(): no social level");
			return 1;
		}
		var price = cryptomedic.prices[this.price_id];
		if (typeof(price["socialLevelPercentage_" + sl]) == "undefined") {
			console.warn("calculate_percentage_asked(): no social level in price for sl " + sl);
			return 1;
		}
		var perc = price["socialLevelPercentage_" + sl];
		return perc;
	},
	'getPriceFor': function(key) {
		if (!this.price_id) return 0;
		return cryptomedic.prices[this.price_id][key];
	},
	'getTotalFor': function(key) {
		if (!this.price_id) return 0;
		if (!this[key]) return 0;
		return cryptomedic.prices[this.price_id][key] * this[key];
	},
	'calculatePriceId': function() {
		if (typeof(this.Date) == "undefined") {
			this.price_id = 1;
			return 0;
		}
		this.price_id = -1;
		var t = this;
		var dref = this.Date;
		// if (typeof(this.Date) == "string") {
		// 	// this.Date = new Date(this.Date);
		// 	dref = new Date(this.Date);
		// }
		// console.info(dref);
		angular.forEach(cryptomedic.prices, function(p, i) {
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
			angular.forEach(cryptomedic.prices[pi], function(v, i) {
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
		console.log("calculating");
		var pi = jQuery('[name="data[price_id]"]').val();
		var total = 0;
		_(jQuery('input:enabled[type=number]')).each(function(v, i) {
			var n = jQuery(v).attr('name').replace("data[", "").replace("]", "");
			var p = cryptomedic.prices[pi][n]; 
			if ((typeof(p) != 'undefined') && (p > 0)) {
				total += p * jQuery(v).val();
			}
		});
		jQuery('#total_real').html(total);
		var total_social = total;
		var sl = jQuery('[name="data[Sociallevel]"]:checked').val();
		if ((typeof(sl) != undefined) && (sl >= "")) {
			var psl = cryptomedic.prices[pi]['socialLevelPercentage_' + sl];
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
