
class Data {
  constructor(data = null) {
    if (data) {
      for(var i in data) {
        this[i] = data[i];
      }
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
