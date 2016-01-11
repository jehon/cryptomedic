"use strict";

// Test cryptographic:
// Documentation: https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto

/*
 * Authentication flow
 *  [init]
 *  - user open application
 *  - if a key exists, go to [keyok]
 *  - generate a key
 *      - show login form and ask for credentials with the generated key
 *      - if the login is ok, the key is validated. The key is stored
 *      - if there are data in the queue, show them and sign them again with the new key
 *      - continue
 *      [keyok]
 *      - send sync and each operation with the key authentication
 *      - each operation will be stored with a hash in the queue
 *      - loop to [keyok]
 *      [problem] if sync/queue fail with 403 (unauthenticated),
 *      - delete the key
 *      - go back to init
 *
 *      Temporarly:
 *      - user login
 *      - sync is running
 *      - ops are send directly and not queued
 */
function date2CanonicString(d, dateOnly) {
  // d.setMilliseconds(0);
  if (d == null) return "0000-00-00 00:00:00 GMT+0000";

  var ts = - (new Date()).getTimezoneOffset()/60 * 100;

  var dateStr = d.getFullYear() +
      "-" +
      ("00" + (d.getMonth() + 1)).substr(-2) +
      "-" +
      ("00" + (d.getDate())).substr(-2);

  if (dateOnly) return dateStr;

  if (((((d.getHours() + (ts / 100)) % 24) == 0) || (d.getHours() == 0))
      && (d.getMinutes() == 0) && (d.getSeconds() == 0)) {
    return dateStr;
  }

  return dateStr + " " +
      ("00" + d.getHours()).substr(-2) +
      ":" +
      ("00" + d.getMinutes()).substr(-2) +
      ":" +
      ("00" + d.getSeconds()).substr(-2) +
      " GMT" + (ts < 0 ? "-" : "+") +
      ("0000" + Math.abs(ts)).substr(-4);
}

function nullify(what) {
  switch(typeof(what)) {
    case "string":
      if (what === "?") {
        return null;
      }
      if (what === "null") {
        return null;
      }
      if (what === "undefined") {
        return null;
      }
      return what;
    case "object":
      angular.forEach(what, function(val, i) {
        what[i] = nullify(val);
      });
      return what;
  }
  return what;
}

function stringify(what) {
  if (what === null) return what;
  if (what === "") return null;
  if (typeof(what) == "object") {
    if (what instanceof Date) {
      return date2CanonicString(what);
    }
    angular.forEach(what, function (v, k) {
      what[k] = stringify(what[k]);
    });
  }
  return what;
}

function objectify(what) {
  if (what === null) return what;
  switch(typeof(what)) {
    case "undefined": return null;
    case "string":
      if (what === date2CanonicString(null)) {
        return null;
      }
      if (what == "0000-00-00") {
        return null;
      }
      if (what.match("[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2} GMT[+-][0-9]{4}") == what) {
        if (what == "0000-00-00 00:00:00 GMT+0000") return null;
          return new Date(what.substr(0, 4), what.substr(5, 2) - 1, what.substr(8, 2),
              what.substr(11, 2), what.substr(14, 2), what.substr(17, 2));
      };
      if (what.match("[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}") == what) {
        if (what == "0000-00-00 00:00:00") return null;
          return new Date(what.substr(0, 4), what.substr(5, 2) - 1, what.substr(8, 2),
              what.substr(11, 2), what.substr(14, 2), what.substr(17, 2));
      };
      if (what.match("[0-9]+") == what) {
        return parseInt(what);
      }
      if (what.match("[0-9]+.[0-9]+") == what) {
        return parseFloat(what);
      }
      return what;
    case "object":
      angular.forEach(what, function(val, i) {
        what[i] = objectify(what[i]);
      });
      if (typeof(what['_type']) != "undefined") {
        what = new application.models[what['_type']](what);
      }
      return what;
    default:
      return what;
  }
}

/* Initialize the computer id */
if (!window.localStorage.cryptomedicComputerId) {
  console.log("generate cryptomedic_computer_id");
  var mask = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  var result = "";
  for (var i = 0; i < 32; i++) {
      result += mask[Math.floor(Math.random() * mask.length)];
    }
  window.localStorage.cryptomedicComputerId = result;
}

/* service_backend */
function service_backend_fn() {
  var rest = cryptomedic.flavor + "/api/v1.0";

  var db = build_db(true);

  var worker = new Worker("static/worker/worker.js");
  worker.onerror = function(e) {
    console.error("@service: Error in worker: ", e);
  };

  worker.onmessage = function(e) {
    var name = e.data.name;
    var data = e.data.data;

    // Propagate event
    // myEvents.trigger("backend_" + name, data);

    switch(name) {
      case "disconnected":
        if (data == 401) {
          appState().actions.connection.expired();
          server.settings = false;
          location.hash = "#/login";
        } else {
          appState().actions.connection.serverError();
        }
        break;
      case "progress":
        if (data.isfinal) {
          appState().actions.database.downloaded();
        } else {
          appState().actions.database.downloading();
        }
        appState().actions.connection.success();
        break;
      default:
        appState().actions.connection.success();
        break;
    }
    // if (name == "disconnected") {
    //   if (data == 401) {
    //     appState().actions.connection.expired();
    //     server.settings = false;
    //     location.hash = "#/login";
    //   } else {
    //     appState().actions.connection.serverError();
    //   }
    //   // onFailure(data);
    // } else {
    //   appState().actions.connection.success();
    //   // onSuccess();
    // }
  };

  function mySendAction(name, data) {
    worker.postMessage({ name: name, data: data });
    return data;
  }

  mySendAction("init", { restUrl: rest });

  function myFrontFetch(url, init, data) {
    return myFetch(url, init, data).then(
      function(json) {
        appState().actions.connection.success();
        if (json._offline) {
          return db.storeRecord({ record: json })
            .then(function() { return json; });
        } else {
          return json;
        }
      }, function(httpErrorCode) {
      switch(httpErrorCode) {
          case 401: // unauthorized
            appState().actions.connection.expired();
            server.settings = false;
            location.hash = "#/login";
            break;
          case 403: // forbidden
            appState().actions.connection.failed();
            break;
          case 404: // not found
            appState().actions.connection.serverError();
            break;
          case 500: // internal server error
            appState().actions.connection.serverError();
            break;
          default:
            appState().actions.connection.serverError();
            break;
        }
      return Promise.reject("myFrontFetch error: " + httpErrorCode);
    }
    );
  }

  return {
    /* Authentification */
    "login": function(username, password) {
      return myFrontFetch(rest + "/auth/mylogin", { method: "POST" },
        {
          "username": username,
          "password": password,
              // 'appVersion': cryptomedic.version,
          "computerId": window.localStorage.cryptomedicComputerId
        })
        .then(appState().actions.connection.settings)
        .then(mySendAction.bind(this, "init"))
        .catch()
        ;
    },
    "checkLogin": function() {
      return myFrontFetch(rest + "/auth/settings", null,
        {
              // 'appVersion': cryptomedic.version,
          "computerId": window.localStorage.cryptomedicComputerId
        }
        )
        .then(appState().actions.connection.settings)
        .then(mySendAction.bind(this, "init"))
        .catch()
        ;
    },
    "logout": function() {
      // TODO: clean up the cache --> cache managed in other object???
      return myFrontFetch(rest + "/auth/logout")
        .then(function(data) {
          appState().actions.connection.expired();
          return data;
        })
        .catch()
        ;
    },

    // Go to the worker
    "sync": function() {
      mySendAction("sync");
    },
    "resync": function() {
      mySendAction("resync");
    },
    // Temp function
    "storeData": function(json) {
      if (json._offline) {
        var offdata = jQuery.extend(true, {}, json._offline);
        mySendAction("storeData", offdata);
        delete json._offline;
      }
      return json;
    },

    // Go to the database
    "getFolder": function(id) {
      if (id == -1) {
        return Promise.resolve(new application.models.Folder({
          mainFile: new application.models.Patient()
        }));
      } else {
        // If not final then go to the server anyway...
        // return db.getFolder(id).catch(function(error) {
        //   console.log("Getting the folder live: #" + id);
        return myFrontFetch(rest + "/folder/" + id)
          .then(function(data) {
            return objectify(data);
          })
          .catch()
          ;
        // });
      }
    },

    "clear": function() {
      return db.clear()
        .then(function() {
          appState().actions.database.downloading();
        })
        .catch()
        ;
    },

    // Go to the rest server
    "checkReference": function(year, order) {
      return myFrontFetch(rest + "/reference/" + year + "/" + order)
        .then(function(data) {
          if ((typeof(data._type) != "undefined") && (data._type == "Folder")) {
            return data["id"];
          } else {
            return false;
          }
        })
        .catch()
        ;
    },

    "getReport": function(reportName, data, timing) {
      return myFrontFetch(rest + "/reports/" + reportName + (timing ? "/" + timing : ""), null, nullify(data))
        .catch()
        ;
    },

    "searchForPatients": function(params) {
      return myFrontFetch(rest + "/folder", null, params)
        .then(function(data) {
          var list = [];
          for(var i in data) {
            list.push(new application.models.Patient(data[i]));
          }
          return list;
        })
        .then(objectify)
        .catch()
        ;
    },

    // READWRITE
    "createReference": function(year, order) {
      return myFrontFetch(rest + "/reference", { method: "POST"},
        // return treatHttp($http.post(rest + "/reference",
        {
          "entryyear": year,
          "entryorder": order
        })
        .then(objectify)
        .catch()
        ;
    },

    "createFile": function(data) {
      return myFrontFetch(rest + "/fiche/" + data["_type"], { method: "POST" }, nullify(data))
        .then(objectify)
        .catch()
        ;
    },

    "saveFile": function(data) {
      return myFrontFetch(rest + "/fiche/" + data["_type"] + "/" + data["id"], { method: "PUT" }, nullify(data))
        .then(objectify)
        .catch()
        ;
    },

    "deleteFile": function(data, folderId) {
      return myFrontFetch(rest + "/fiche/" + data["_type"] + "/" + data["id"], { method: "DELETE" })
        .then(objectify)
        .catch()
        ;
    },

    "unlockFile": function(data, folderId) {
      return myFrontFetch(rest + "/unfreeze/" + data["_type"] + "/" + data["id"])
        .then(objectify)
        .catch()
        ;
    },

    "usersList": function() {
      return myFrontFetch(rest + "/users")
        .catch()
        ;
    },

    "userAdd": function(user) {
      return myFrontFetch(rest + "/users" , { method: "POST" }, user)
        .catch()
        ;
    },

    "userDelete": function(id) {
      return myFrontFetch(rest + "/users/" + id, { method: "DELETE" })
        .catch()
        ;
    },

    "userUpdate": function(user) {
      return myFrontFetch(rest + "/users/" + user.id, { method: "PUT" }, user)
        .catch()
        ;
    },

    "userPassword": function(id, pwd) {
      return myFrontFetch(rest + "/users/password/" + id, { method: "POST" }, { password: pwd })
        .catch()
        ;
    }
  };
}
