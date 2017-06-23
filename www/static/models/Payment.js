'use strict';

class Payment extends FolderPage {
  getModel() {
    return 'Payment';
  }

  // validate(res) {
  //   res = super.validate(res);

  //   if ((this.Date > new Date())) {
  //     res.dateInTheFuture = true;
  //   }
    // return res;
  // }
}
