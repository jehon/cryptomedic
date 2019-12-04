'use strict';

/* global PatientRelated */

class OtherConsult extends PatientRelated {
	getModel() {
		return 'OtherConsult';
	}

	validate(res) {
		res = super.validate(res);

		if ((this.Date > (new Date()).toISOString())) {
			res.dateInTheFuture = true;
		}

		return res;
	}
}
