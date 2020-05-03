
import XFile from './x-file.js';
import store from '../js/store.js';
import { DataMissingException, ConfigurationMissingException } from '../js/exceptions.js';

export default class XFileBill extends XFile {
    get categoriesList() {
        return ['consult', 'medecine', 'workshop', 'surgical', 'other'];
    }

    label(key) {
        let p1 = key.indexOf('_');
        if (p1 > 0) {
            return key.substring(p1 + 1).split('_').join(' ');
        }
        return key;
    }

    constructor() {
        super();
        store.subscribe(() => {
            this.adapt();
        });
        this.calculatePrice();
    }

    adapt() {
        super.adapt();
        this.calculatePrice();
        this.innerHTML = 'bill available: ' + JSON.stringify(this.value);
    }

    calculatePrice() {
        try {
            const definitions = store.getState().definitions;
            if (!definitions || !('prices' in definitions)) {
                throw ConfigurationMissingException('Prices');
            }
            const prices = definitions.prices;
            if (!prices || prices.length < 1) {
                throw new DataMissingException('prices');
            }

            // Should be in string for comparisons to works...
            const dref = this.assertExists('Date');

            let index = -1;
            for (const i in prices) {
                const p = prices[i];
                if (((p['datefrom'] == null) || (p['datefrom'] <= dref))
					&& ((p['dateto'] == null) || (p['dateto'] > dref))) {
                    index = i;
                }
            }
            if (index < 0) {
                throw new Error('Price id not found');
            }
            this.price = prices[index];
        } catch (_e) {
            this.price = false;
        }
        return this.price;
    }

    getFieldsBelongingTo(category) {
        if (!this.price) {
            return [];
        }
        const res = [];
        for (const key in this.price) {
            if (key.substr(0, category.length + 1) == category + '_') {
                res.push(key);
            }
        }
        return res;
    }

    // ratioSalary() {
    // 	/**
    // 	  From TC:
    // 	  Level 0 is when the familial ration is < 300
    // 	  Level 1 is when the familial ration is 300<  FR < 500
    // 	  Level 2 is when the familial ration is 500< FR < 1500
    // 	  Level 3 is when the familial ration is 1500< FR < 3000
    // 	  Level 4 is when the familial ration is 3000< FR
    // 	 */
    // 	this.Sociallevel = 4;
    // 	if (!this.isNotZero('sl_numberOfHouseholdMembers')) {
    // 		throw new DataMissingException('sl_numberOfHouseholdMembers');
    // 	}

    // 	var rs = Math.ceil(this.sl_familySalary / this.sl_numberOfHouseholdMembers);

    // 	if (rs <= 300)  {
    // 		this.Sociallevel = 0;
    // 	} else {
    // 		if (rs <= 500) {
    // 			this.Sociallevel = 1;
    // 		} else {
    // 			if (rs <= 1500) {
    // 				this.Sociallevel = 2;
    // 			} else {
    // 				if (rs <= 3000) {
    // 					this.Sociallevel = 3;
    // 				} else {
    // 					this.Sociallevel = 4;
    // 				}
    // 			}
    // 		}
    // 	}
    // 	return rs;
    // }

    // calculate_total_real() {
    // 	if (!this.price) {
    // 		this.total_real = 0;
    // 		this.total_asked = 0;
    // 		return -1;
    // 	}
    // 	var total = 0;
    // 	for(var i in this.price) {
    // 		if (i[0] == '_') { continue; }
    // 		if (i == 'id') { continue; }
    // 		if (i == 'created_at') { continue; }
    // 		if (i == 'updated_at') { continue; }
    // 		if (i == 'lastuser') { continue; }
    // 		if (i == 'datefrom') { continue; }
    // 		if (i == 'dateto') { continue; }
    // 		if (i == 'controller') { continue; }
    // 		if (i == 'locked') { continue; }
    // 		if (i == 'dlocked') { continue; }
    // 		if (i == 'socialLevelPercentage_0') { continue; }
    // 		if (i == 'socialLevelPercentage_1') { continue; }
    // 		if (i == 'socialLevelPercentage_2') { continue; }
    // 		if (i == 'socialLevelPercentage_3') { continue; }
    // 		if (i == 'socialLevelPercentage_4') { continue; }
    // 		if (this.price[i] < 0) { continue; }
    // 		if (typeof(this[i]) == 'undefined') { continue; }
    // 		if (this[i] <= 0) { continue; }
    // 		total += this.price[i] * this[i];
    // 	}//, this);
    // 	this.total_real = total;
    // 	this.total_asked = this.total_real * this.calculate_percentage_asked();
    // 	return this.total_real;
    // }

    // calculate_percentage_asked() {
    // 	if (!this.price) {
    // 		//console.warn('calculate_percentage_asked(): no price id');
    // 		return 1;
    // 	}
    // 	var sl = this['Sociallevel'];
    // 	if (sl == null) {
    // 		//console.warn('calculate_percentage_asked(): no social level');
    // 		return 1;
    // 	}
    // 	if (typeof(this.price['socialLevelPercentage_' + sl]) == 'undefined') {
    // 		//console.warn('calculate_percentage_asked(): no social level in price for sl ' + sl);
    // 		return 1;
    // 	}
    // 	var perc = this.price['socialLevelPercentage_' + sl];
    // 	// console.log("price", this.price, sl, perc)
    // 	return perc;
    // }

    // getPriceFor(key) {
    // 	if (!this.price) return 0;
    // 	if (!this.price[key]) return 0;
    // 	return this.price[key];
    // }

    // getTotalFor(key) {
    // 	if (!this.price) return 0;
    // 	if (!this.price[key]) return 0;
    // 	if (!this[key]) return 0;
    // 	return this.price[key] * this[key];
    // }

    // calculatePriceId(prices) {
    // 	if (typeof(this.Date) == 'undefined' || !this.Date || !prices) {
    // 		this.price_id = 0;
    // 		this.price = false;
    // 		return 0;
    // 	}
    // 	this.price_id = -1;
    // 	var t = this;
    // 	var dref = this.Date;
    // 	for(var i in prices) {
    // 		var p = prices[i];
    // 		if (((p['datefrom'] == null) || (p['datefrom'] <= dref))
    // 	&& ((p['dateto'] == null) || (p['dateto'] > dref))) {
    // 			t.price_id = i;
    // 			t.price = prices[i];
    // 		}
    // 	}
    // 	if (this.price_id < 0) {
    // 		throw new Error('Price Id not set');
    // 	}
    // 	this.calculate_total_real();
    // }

    // getPriceId() {
    // 	return this.price_id;
    // }

    // create -> copy some fields...
    // if (folder) {
    // 	for (var v of folder.getListByType(Bill)) {
    // 		if (!last_bill) {
    // 			last_bill = v;
    // 		} else {
    // 			if (last_bill.Date < v.Date) {
    // 				last_bill = v;
    // 			}
    // 		}
    // 	}
    // 	if (last_bill) {
    // 		this.sl_familySalary = last_bill.sl_familySalary;
    // 		this.sl_numberOfHouseholdMembers = last_bill.sl_numberOfHouseholdMembers;
    // 	}
    // }


    // validate(res) {
    // 	/* Business rules (price > 4):
    // 	- il faut pourvoir coder home visit ou give appointment mais pas les 2
    // 	- il faut pourvoir coder consultation physio ou doctor mais pas les 2
    // 	*/
    // 	res = super.validate(res);

    // 	if (!this.Date) {
    // 		res.noDate = true;
    // 	}

    // 	if ((this.Date > (new Date()).toISOString())) {
    // 		res.dateInTheFuture = true;
    // 	}

    // 	if (this.price_id >= 2) {
    // 		if ((this.consult_home_visit > 0) && (this.consult_give_appointment > 0)) {
    // 			res.homeVisitAndGiveAppointment = true;
    // 		}

    // 		if ((this.consult_CDC_consultation_physio > 0) && (this.consult_CDC_consultation_Doctor > 0)) {
    // 			res.consultPhisioAndDoctor = true;
    // 		}
    // 	}
    // 	return res;
    // }


}

window.customElements.define('x-file-bill', XFileBill);
