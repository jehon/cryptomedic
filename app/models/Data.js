
import date2CanonicString from "helpers/date2CanonicString";

function objectify(what) {
  if (what === null) return what;
  switch(typeof(what)) {
    case "undefined": return null;
    case "string":
      if (what == date2CanonicString(null)) {
        return null;
      }
      if (what == "0000-00-00") {
        return null;
      }
      if (what.match("[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2} GMT[+-][0-9]{4}") == what) {
        if (what == "0000-00-00 00:00:00 GMT+0000") return null;
        return new Date(what.substr(0, 4), what.substr(5, 2) - 1, what.substr(8, 2),
          what.substr(11, 2), what.substr(14, 2), what.substr(17, 2));
      }
      if (what.match("[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}") == what) {
        if (what == "0000-00-00 00:00:00") return null;
        return new Date(what.substr(0, 4), what.substr(5, 2) - 1, what.substr(8, 2),
          what.substr(11, 2), what.substr(14, 2), what.substr(17, 2));
      }
      if (what.match("[0-9]+") == what) {
        return parseInt(what);
      }
      if (what.match("[0-9]+.[0-9]+") == what) {
        return parseFloat(what);
      }
      return what;
    case "object":
      for(var i in what) {
        what[i] = objectify(what[i]);
      }
      return what;
    default:
      return what;
  }
}

class Data {
  constructor(data) {
    if (data) {
      for(var i in data) {
        this[i] = objectify(data[i]);
      }
    }
  }

  isSet(field) {
    if (typeof(this[field]) == "undefined") {
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

export default Data;
