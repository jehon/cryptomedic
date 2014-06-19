"use strict";

cryptomedic.models.Bill = cryptomedic.models.File.extend({
	'getPriceFor': function(key) {
		return cryptomedic.prices[this.price_id][key];
	},
	'getTotalFor': function(key) {
		return cryptomedic.prices[this.price_id][key] * this[key];
	},
	'calculatePriceId': function() {
		this.price_id = -1;
		angular.forEach(cryptomedic.prices, function(p, i) {
			if (((p['datefrom'] == null) || (p['datefrom'] <= this.Date))
					&& ((p['dateto'] == null) || (p['dateto'] > this.Date))) {
				this.price_id = i;
			}
		});
		if (this.price_id < 0) {
			throw new Exception("Price Id not set");
		}
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
	}
});
