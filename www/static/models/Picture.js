/* global API_VERSION */
'use strict';

class Picture extends PatientRelated {
  getModel() {
    return 'Picture';
  }

  validate(res) {
    res = super.validate(res);
    if (!this.fileContent && !this.file) {
      res.pictureRequired = true;
    }
    return res;
  }

  getPictureUrl() {
    return '/api/' + API_VERSION + '/picture/' + this.id;
  }

  getThumbnailUrl() {
    return '/api/' + API_VERSION + '/picture/' + this.id + '/thumbnail';
  }
}
