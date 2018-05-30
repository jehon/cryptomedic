/* global DataMissingException, ApplicationException */

function cannonizeDate(value) {
	if (typeof(value) == 'number') {
		value = '' + value;
	}
	if (value == 'string') {
		if (value.length < 4) {
			throw 'Invalid reference';
		}
		var ry = parseInt(value.substring(0, 4));
		var rm = parseInt(value.substring(5, 7));
		if (isNaN(rm)) {
			rm = 1; // emulate january
		}
		value = new Date(ry, rm - 1, 1);
	}
	return value;
}


class DataClass {

	constructor(data) {
		this.value = data;
	}

	assertData() {
		if (!this.value) {
			throw new ApplicationException('Data not set');
		}
		return this.value;
	}

	assertExists(field) {
		const values = this.assertData();
		if (typeof (values[field]) == 'undefined'
			|| values[field] == null
		) {
			throw new DataMissingException(field, 'is undefined');
		}
		return values[field];
	}

	assertNumeric(field) {
		let v = this.assertExists(field);
		if (typeof(v) == 'number') {
			return v;
		}
		if (typeof(v) == 'string') {
			let vi = parseInt(this.value[field]);
			if (!isNaN(vi)) {
				return vi;
			}
		}

		throw new DataMissingException(field, `is not numeric(${v})`);
	}

	assertNumericNotZero(field) {
		const v = this.assertNumeric(field);
		if (v !== 0) {
			return v;
		}
		throw new DataMissingException(field, `is not non-zero(${v})`);
	}

	// // For graphic, by default it expect number -> textual render it in text only on demand
	ageAtConsultTimeFractionnal(toDate = new Date()) {
		if (!this.isSet('Date')) {
			throw new DataMissingException('Date');
		}
		if (birth == '' || birth == null) {
			return '';
		}
		options = Object.assign({}, {
			reference: new Date(),
			format: false
		}, options);
		// reference = reference || new Date();
		if (typeof(options.reference) == 'number') {
			options.reference = '' + options.reference;
		}
		if (typeof(options.reference) == 'string') {
			if (options.reference.length < 4) {
				return options.format ? null : '?';
				// throw new Exception('Invalid reference');
			}
			var ry = parseInt(options.reference.substring(0, 4));
			var rm = parseInt(options.reference.substring(5, 7));
			if (isNaN(rm)) {
				rm = 1; // emulate january
			}
			options.reference = new Date(ry, rm - 1, 1);
		}
		// reference is a Date

		if (typeof(birth) == 'number') {
			birth = '' + birth;
		}
		if (typeof(birth) == 'string') {
			if (birth.length < 4) {
				return options.format ? null : '?';
				// throw new Exception('Invalid birth');
			}
			var by = parseInt(birth.substring(0, 4));
			var bm = parseInt(birth.substring(5, 7));
			if (isNaN(bm)) {
				bm = 1; // emulate january
			}
			birth = new Date(by, bm - 1 -1, 30);
		}
		// birth is a Date

		var days = new Date(0, 0, 0, 0, 0, 0, options.reference - birth);
		var res = { years: days.getFullYear() - 1900, months: days.getMonth()};
		if (options.format == 'object') {
			return res;
		}
		// Future default ? See fromBirthDateAsHumanReadable
		if (options.format == 'number') {
			return res.years + (res.months / 12);
		}
		// Default ?
		return res.years + 'y' + res.months + 'm';
	}

	// ageAtConsultTimeForHuman() {
	// 	if (!this.patient) {
	// 		return 'Incomplete data';
	// 	}
	// 	if (!this.isSet('Date')) {
	// 		return 'Undefined';
	// 	}
	// 	return calculations.age.fromBirthDateAsHumanReadable(this.patient.Yearofbirth);
	// }

	// ds_height() {
	// 	var sex = this.getPatient().sexStr();
	// 	if (!sex) {
	// 		throw new DataMissingException('sex');
	// 	}
	// 	var age = this.ageAtConsultTime();
	// 	if (typeof (age) != 'number') {
	// 		throw new DataMissingException('Age');
	// 	}
	// 	if (!this.isNotZero('Heightcm')) {
	// 		throw new DataMissingException('Height');
	// 	}
	// 	return calculations.math.stdDeviation(amd_stats[sex]['Heightcm'], age, this.Heightcm);
	// }

	// ds_weight() {
	// 	var sex = this.getPatient().sexStr();
	// 	if (!sex) {
	// 		throw new DataMissingException('sex');
	// 	}
	// 	var age = this.ageAtConsultTime();
	// 	if (typeof (age) != 'number') {
	// 		throw new DataMissingException('Age');
	// 	}
	// 	if (!this.isNotZero('Weightkg')) {
	// 		throw new DataMissingException('Weight');
	// 	}
	// 	return calculations.math.stdDeviation(amd_stats[sex]['Weightkg'], age, this.Weightkg);
	// }

	// wh() {
	// 	if (!this.isNotZero('Heightcm')) {
	// 		throw new DataMissingException('Height');
	// 	}
	// 	if (!this.isNotZero('Weightkg')) {
	// 		throw new DataMissingException('Weight');
	// 	}
	// 	return this.Weightkg / this.Heightcm;
	// }

	// ds_weight_height() {
	// 	var sex = this.getPatient().sexStr();
	// 	if (!sex) {
	// 		throw new DataMissingException('sex');
	// 	}
	// 	if (!this.isNotZero('Heightcm')) {
	// 		throw new DataMissingException('Height');
	// 	}
	// 	if (!this.isNotZero('Weightkg')) {
	// 		throw new DataMissingException('Weight');
	// 	}
	// 	return calculations.math.stdDeviation(amd_stats[sex]['wh'], this.Heightcm, this.Weightkg);
	// }

	// bmi() {
	// 	if (!this.isNotZero('Heightcm')) {
	// 		throw new DataMissingException('Height');
	// 	}
	// 	if (!this.isNotZero('Weightkg')) {
	// 		throw new DataMissingException('Weight');
	// 	}
	// 	return 10000 * this.Weightkg / (this.Heightcm * this.Heightcm);
	// }

	// ds_bmi() {
	// 	var sex = this.getPatient().sexStr();
	// 	if (!sex) {
	// 		throw new DataMissingException('sex');
	// 	}
	// 	var age = this.ageAtConsultTime();
	// 	if (typeof (age) != 'number') {
	// 		throw new DataMissingException('Age');
	// 	}
	// 	return calculations.math.stdDeviation(amd_stats[sex]['bmi'], age, this.bmi());
	// }
}

function Data(array) {
	return new DataClass(array);
}

function DataCatch(array) {
	// See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy
	const o = Data(array);
	const p = new Proxy(o, {
		// http://2ality.com/2015/10/intercepting-method-calls.html
		// (Modified)
		get: function(target, propKey) {
			const origMethod = target[propKey];
			return function (...args) {
				try {
					return origMethod.apply(o, args);
				} catch(e) {
					if (e instanceof Error) {
						return e.message;
					}
					return e;
				}
			};
		}
	});
	return p;
}
