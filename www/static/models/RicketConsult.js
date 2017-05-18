'use strict';

class RicketConsult extends PatientRelated {
  getModel() {
    return 'RicketConsult';
  }

  validate(res) {
    res = super.validate(res);

    console.log("validate: ", this.Date);

    if ((this.Date > (new Date()).toISOString())) {
    	console.log("error");
      	res.dateInTheFuture = true;
    }
    return res;
  }
}
