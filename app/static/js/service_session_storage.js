"use strict";

function service_session_storage(onReady) {
  var values = {};
  var types = {};

  if (typeof(onReady) == "function") {
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

  get("examiner", "");
  get("center", "");
  get("period", "month");
  get("day", appState().helpers.date2CanonicString(new Date(), true));
  get("month", appState().helpers.date2CanonicString(new Date(), true).substring(0, 7));
  get("year", appState().helpers.date2CanonicString(new Date(), true).substring(0, 4));

  return {
    "get": get,
    "getAll": function() {
      var res = {};
      var t = this;
      for(var k in values) {
        if (typeof(t.get(k)) == "undefined") {
          res[k] = null;
        } else {
          res[k] = t.get(k);
        }
      }
      return res;
    },
    "set": function(key, newVal) {
      var val = newVal;
      if (val === null || typeof(val) == "undefined") {
        val = "";
      }
      values[key] = val;
      if (sessionStorage) {
      //    sessionStorage.setItem(key, stringify(val));
        sessionStorage.setItem(key, val);
      }
    },
    "clear": function() {
      values = {};
      if (sessionStorage) {
        sessionStorage.clear();
      }
    }
  };
}
