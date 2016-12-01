'use strict';

class Picture extends Item {
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
    return '/api/v1.0/picture/' + this.id;
  }

  getThumbnailUrl() {
    return '/api/v1.0/picture/' + this.id + '/thumbnail';
  }
}
