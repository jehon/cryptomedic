
class Data {
  constructor(data = {}) {
    if (data) {
      Object.assign(this, data);
    }
  }

  isSet(field) {
    if (typeof(this[field]) == 'undefined') {
      return false;
    }
    if (this[field] == null) {
      return false;
    }
    return true;
  }

  isNotZero(field) {
    if (!this.isSet(field)) {
      return false;
    }
    if (this[field] === 0) {
      return false;
    }
    return true;
  }

  validate(res) {
    if (!res) {
      res = {};
    }
    return res;
  }

  isLocked() {
    return false;
  }
}
