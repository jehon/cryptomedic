'use strict';

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

function nullify(what) {
  switch(typeof(what)) {
    case 'string':
      if (what === '?') {
        return null;
      }
      if (what === 'null') {
        return null;
      }
      if (what === 'undefined') {
        return null;
      }
      return what;
    case 'object':
      for(var k in what) {
        what[k] = nullify(what[k]);
      }
      // });
      return what;
  }
  return what;
}

function stringify(what) {
  if (what === null) return what;
  if (what === '') return null;
  if (typeof(what) == 'object') {
    if (what instanceof Date) {
      return appState().helpers.date2CanonicString(what);
    }
    for(var k in what) {
      what[k] = stringify(what[k]);
    }
  }
  return what;
}

/* Initialize the computer id */
if (!window.localStorage.cryptomedicComputerId) {
  var mask = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  var result = '';
  for (var i = 0; i < 32; i++) {
    result += mask[Math.floor(Math.random() * mask.length)];
  }
  window.localStorage.cryptomedicComputerId = result;
}

/* service_backend */
function service_backend_fn() {
  var rest = cryptomedic.flavor + '/api/v1.0';

  var db = build_db(true);

  var worker = new Worker('static/worker/worker.js');
  worker.onerror = function(e) {
    console.error('@service: Error in worker: ', e);
  };

  worker.onmessage = function(e) {
    var name = e.data.name;
    var data = e.data.data;

    switch(name) {
      case 'disconnected':
        if (data == 401) {
          appState().dispatch(appState().catalog.CONNECTION_EXPIRED);
          server.settings = false;
          location.hash = '#/login';
        } else {
          appState().dispatch(appState().catalog.CONNECTION_SERVER_ERROR);
        }
        break;
      case 'progress':
        if (data.isfinal) {
          appState().dispatch(appState().catalog.DATABASE_DOWNLOADED);
        } else {
          appState().dispatch(appState().catalog.DATABASE_DOWNLOADING);
        }
        appState().dispatch(appState().catalog.CONNECTION_SUCCESS);
        break;
      default:
        appState().dispatch(appState().catalog.CONNECTION_SUCCESS);
        break;
    }
  };

  function mySendAction(name, data) {
    worker.postMessage({ name: name, data: data });
    return data;
  }

  mySendAction('init', { restUrl: rest });

  function myFrontFetch(url, init, data) {
    return myFetch(url, init, data).then(
      function(json) {
        appState().dispatch(appState().catalog.CONNECTION_SUCCESS);
        if (json._offline) {
          return db.storeRecord({ record: json })
            .then(function() { return json; });
        } else {
          return json;
        }
      }, function(httpErrorCode) {
      switch(httpErrorCode) {
        case 401: // unauthorized
          appState().dispatch(appState().catalog.CONNECTION_EXPIRED);
          server.settings = false;
          location.hash = '#/login';
          break;
        case 403: // forbidden
          appState().dispatch(appState().catalog.CONNECTION_FAILED);
          break;
        case 404: // not found
          appState().dispatch(appState().catalog.CONNECTION_SERVER_ERROR);
          break;
        case 500: // internal server error
          appState().dispatch(appState().catalog.CONNECTION_SERVER_ERROR);
          break;
        default:
          appState().dispatch(appState().catalog.CONNECTION_SERVER_ERROR);
          break;
      }
      return Promise.reject('myFrontFetch error: ' + httpErrorCode);
    }
    );
  }

  return {
    /* Authentification */
    'login': function(username, password) {
      return myFrontFetch(rest + '/auth/mylogin', { method: 'POST' },
        {
          'username': username,
          'password': password,
              // 'appVersion': cryptomedic.version,
          'computerId': window.localStorage.cryptomedicComputerId
        })
        .then(appState().dispatch.bind(this, appState().catalog.CONNECTION_SETTINGS))
        .then(mySendAction.bind(this, 'init'))
        .catch()
        ;
    },
    'checkLogin': function() {
      return myFrontFetch(rest + '/auth/settings', null,
        {
              // 'appVersion': cryptomedic.version,
          'computerId': window.localStorage.cryptomedicComputerId
        }
        )
        .then(appState().dispatch.bind(this, appState().catalog.CONNECTION_SETTINGS))
        .then(mySendAction.bind(this, 'init'))
        .catch()
        ;
    },
    'logout': function() {
      // TODO: clean up the cache --> cache managed in other object???
      return myFrontFetch(rest + '/auth/logout')
        .then(function(data) {
          appState().dispatch(appState().catalog.CONNECTION_EXPIRED);
          return data;
        })
        .catch()
        ;
    },

    // Go to the worker
    'sync': function() {
      mySendAction('sync');
    },
    'resync': function() {
      mySendAction('resync');
    },
    // Temp function
    'storeData': function(json) {
      if (json._offline) {
        var offdata = jQuery.extend(true, {}, json._offline);
        mySendAction('storeData', offdata);
        delete json._offline;
      }
      return json;
    },

    // Go to the database
    'getFolder': function(id) {
      if (id == -1) {
        return Promise.resolve(appState().helpers.create('Folder'));
      } else {
        // If not final then go to the server anyway...
        // return db.getFolder(id).catch(function(error) {
        //   console.log('Getting the folder live: #' + id);
        return myFrontFetch(rest + '/folder/' + id)
          .then(appState().helpers.objectify)
          .then(function(data) { return appState().helpers.create('Folder', data); })
          .catch()
          ;
        // });
      }
    },

    'clear': function() {
      return db.clear()
        .then(function() {
          appState().dispatch(appState().catalog.DATABASE_DOWNLOADING);
        })
        .catch()
        ;
    },

    // Go to the rest server
    'checkReference': function(year, order) {
      return myFrontFetch(rest + '/reference/' + year + '/' + order)
        .then(function(data) {
          if (data && data.id) {
          // if ((data.getModel() != 'undefined') && (data.getModel() == 'Folder')) {
            return data['id'];
          } else {
            return false;
          }
        })
        .catch()
        ;
    },

    'getReport': function(reportName, data, timing) {
      return myFrontFetch(rest + '/reports/' + reportName + (timing ? '/' + timing : ''), null, nullify(data))
        .catch()
        ;
    },

    'searchForPatients': function(params) {
      return myFrontFetch(rest + '/folder', null, params)
        .then(function(data) {
          var list = [];
          for(var i in data) {
            list.push(appState().helpers.create('Patient', data[i]));
          }
          return list;
        })
        .then(appState().helpers.objectify)
        .then(function(data) {
          for(var i in data) {
            data[i] = appState().helpers.create('Patient', data[i]);
          }
          return data;
        })
        .catch()
        ;
    },

    // READWRITE
    'createReference': function(year, order) {
      return myFrontFetch(rest + '/reference', { method: 'POST'},
        // return treatHttp($http.post(rest + '/reference',
        {
          'entryyear': year,
          'entryorder': order
        })
        .then(appState().helpers.objectify)
        .then(function(data) { return appState().helpers.create('Folder', data); })
        .catch()
        ;
    },

    'createFile': function(data) {
      return myFrontFetch(rest + '/fiche/' + data.getModel(), { method: 'POST' }, nullify(data))
        .then(appState().helpers.objectify)
        .then(function(data) { return appState().helpers.create('Folder', data); })
        .catch()
        ;
    },

    'saveFile': function(data) {
      return myFrontFetch(rest + '/fiche/' + data.getModel() + '/' + data['id'], { method: 'PUT' }, nullify(data))
        .then(appState().helpers.objectify)
        .then(function(data) { return appState().helpers.create('Folder', data); })
        .catch()
        ;
    },

    'deleteFile': function(data) {
      return myFrontFetch(rest + '/fiche/' + data.getModel() + '/' + data['id'], { method: 'DELETE' })
        .then(appState().helpers.objectify)
        .then(function(data) { return appState().helpers.create('Folder', data); })
        .catch()
        ;
    },

    'unlockFile': function(data) {
      return myFrontFetch(rest + '/unfreeze/' + data.getModel() + '/' + data['id'])
        .then(appState().helpers.objectify)
        .then(function(data) { return appState().helpers.create('Folder', data); })
        .catch()
        ;
    },

    'usersList': function() {
      return myFrontFetch(rest + '/users')
        .catch()
        ;
    },

    'userAdd': function(user) {
      return myFrontFetch(rest + '/users' , { method: 'POST' }, user)
        .catch()
        ;
    },

    'userDelete': function(id) {
      return myFrontFetch(rest + '/users/' + id, { method: 'DELETE' })
        .catch()
        ;
    },

    'userUpdate': function(user) {
      return myFrontFetch(rest + '/users/' + user.id, { method: 'PUT' }, user)
        .catch()
        ;
    },

    'userPassword': function(id, pwd) {
      return myFrontFetch(rest + '/users/password/' + id, { method: 'POST' }, { password: pwd })
        .catch()
        ;
    }
  };
}
