'use strict';

class Surgery extends PatientRelated {
	getModel() {
		return 'Surgery';
	}

	getServerRessource() {
		return 'surgeries';
	}

	validate(res) {
		res = super.validate(res);

		if ((this.Date > (new Date()).toISOString())) {
			res.dateInTheFuture = true;
		}
		return res;
	}
}
