"use strict";

cryptomedic.models.Bill = cryptomedic.models.File.extend({
	'calculate': function() {
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
			// 	$total += $price[$i] * $data[$i];
		}, this);
		return total;
	},
	'calculate_total_real': function() {
		return this.calculate();
	},
	'calculate_percentage_asked': function() {
		var sl = this['Sociallevel'];
		if (sl == null || sl == 0) return total;
		var price = cryptomedic.prices[this.price_id];
		if (typeof(price["socialLevelPercentage_" + this.price_id]) == "undefined") return 1;
		return price["socialLevelPercentage_" + this.price_id];
	},
	'calculate_total_asked': function() {
		return this.calculate_total_real() * this.calculate_percentage_asked();
	},
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
