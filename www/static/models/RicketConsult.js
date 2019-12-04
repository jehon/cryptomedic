/* global PatientRelated */

'use strict';

class RicketConsult extends PatientRelated {
	getModel() {
		return 'RicketConsult';
	}

	validate(res) {
		res = super.validate(res);

		if ((this.Date > (new Date()).toISOString())) {
			console.error('error');
			res.dateInTheFuture = true;
		}
		return res;
	}
}
