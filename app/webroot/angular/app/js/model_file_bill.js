"use strict";

cryptomedic.models.Bill = cryptomedic.models.File.extend({
	getPriceFor: function(key) {
		return cryptomedic.prices[this.price_id][key];
	},
	getTotalFor: function(key) {
		return cryptomedic.prices[this.price_id][key] * this[key];
	},
	calculatePriceId: function() {
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
	tagIt: function() {
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
	}
});
