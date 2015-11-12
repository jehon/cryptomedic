"use strict";

function service_session_storage(onReady) {
  var values = {};
  var defaults = {};
  var types = {};

  if (typeof(onReady) == 'function') {
    onReady();
  }

  function get(key, def) {
    types[key] = typeof(def);
    if (values[key]) return angular.copy(values[key]);
    if (sessionStorage && sessionStorage[key]) {
      var it = sessionStorage.getItem(key);
      if (it === "null") {
        values[key] = null;
      } else {
  //    values[key] = objectify(it);
        values[key] = it;
      }
      if (typeof(def) != types[key]) {
        return def;
      }
      return values[key];
    }
    values[key] = def;
    return def;
  }

  // Set default values
  var now = new Date();
  var year = now.getFullYear();
  var month = "0" + (now.getMonth() + 1);
  month = month.substring(month.length - 2);
  var day = "0" + now.getDate();
  day = day.substring(day.length - 2);

  get("examiner", "");
  get("center", "");
  get("period", "month");
  get("day", day);
  get("month", year + "-" + month);
  get("year", year);

  return {
    'get': get,
    'getAll': function() {
      var res = {};
      var t = this;
      angular.forEach(values, function(v, k) {
        if (typeof(t.get(k)) == "undefined") {
          res[k] = null;
        } else {
          res[k] = t.get(k);
        }
      });
      return res;
    },
    'set': function(key, newVal) {
      var val = newVal;
      if (val === null || typeof(val) == 'undefined') {
        val = "";
      }
      values[key] = val;
      if (sessionStorage) {
      //    sessionStorage.setItem(key, stringify(val));
        sessionStorage.setItem(key, val);
      }
    },
    'clear': function() {
      values = {};
      if (sessionStorage) {
        sessionStorage.clear();
      }
    }
  }
}
