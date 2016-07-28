
import objectify    from 'helpers/objectify';
import Database     from 'helpers/database';
import create       from 'helpers/create';
import catalog      from 'reducers/catalog';
import dispatch     from 'reducers/dispatch';
import MyWorker     from 'helpers/myWorker';
import myFrontFetch from 'helpers/myFrontFetch';
import goThere      from 'helpers/goThere';

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

export function nullify(what) {
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

// /* Initialize the computer id */
// if (!localStorage.cryptomedicComputerId) {
//   var mask = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
//   var result = '';
//   for (var i = 0; i < 32; i++) {
//     result += mask[Math.floor(Math.random() * mask.length)];
//   }
//   localStorage.cryptomedicComputerId = result;
// }

/* service_backend */
export default function service_backend() {
  var db = new Database(true);

  var worker = new MyWorker(function(name, data) {
    switch(name) {
      case 'disconnected':
        if (data == 401) {
          dispatch(catalog.CONNECTION_EXPIRED);
          goThere('#/login');
        } else {
          dispatch(catalog.CONNECTION_SERVER_ERROR);
        }
        break;
      case 'progress':
        if (data.isfinal) {
          dispatch(catalog.DATABASE_DOWNLOADED);
        } else {
          dispatch(catalog.DATABASE_DOWNLOADING);
        }
        dispatch(catalog.CONNECTION_SUCCESS);
        break;
      default:
        dispatch(catalog.CONNECTION_SUCCESS);
        break;
    }
  });

  function mySendAction(name, data) {
    // worker.postMessage({ name: name, data: data });
    worker.post(name, data);
    return data;
  }

  return {
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
    // 'getFolder': function(id) {
    //   if (id == -1) {
    //     return Promise.resolve(create('Folder'));
    //   } else {
    //     // If not final then go to the server anyway...
    //     // return db.getFolder(id).catch(function(error) {
    //     //   console.log('Getting the folder live: #' + id);
    //     return myFrontFetch({ url: 'folder/' + id })
    //       .then(objectify)
    //       .then(function(data) { return create('Folder', data); })
    //       .catch()
    //       ;
    //     // });
    //   }
    // },

    'clear': function() {
      return db.clear()
        .then(function() {
          dispatch(catalog.DATABASE_DOWNLOADING);
        })
        .catch()
        ;
    },

    'checkReference': function(year, order) {
      return myFrontFetch({ url: 'reference/' + year + '/' + order })
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
      return myFrontFetch({ url: 'reports/' + reportName + (timing ? '/' + timing : ''), data: nullify(data) })
        .catch()
        ;
    },

    'searchForPatients': function(params) {
      return myFrontFetch({ url: 'folder', data: params })
        .then(function(data) {
          var list = [];
          for(var i in data) {
            list.push(create('Patient', data[i]));
          }
          return list;
        })
        .then(objectify)
        .then(function(data) {
          for(var i in data) {
            data[i] = create('Patient', data[i]);
          }
          return data;
        })
        .catch()
        ;
    },

    // READWRITE
    'createReference': function(year, order) {
      return myFrontFetch({ url: 'reference', init: { method: 'POST'}, data: {
        'entryyear': year,
        'entryorder': order
      }})
        .then(objectify)
        .then(function(data) { return create('Folder', data); })
        .catch()
        ;
    },

    'createFile': function(data) {
      return myFrontFetch({ url: 'fiche/' + data.getModel(), init: { method: 'POST' }, data: nullify(data)})
        .then(objectify)
        .then(function(data) { return create('Folder', data); })
        .catch()
        ;
    },

    'saveFile': function(data) {
      return myFrontFetch({ url: 'fiche/' + data.getModel() + '/' + data['id'], init: { method: 'PUT' }, data: nullify(data) })
        .then(objectify)
        .then(function(data) { return create('Folder', data); })
        .catch()
        ;
    },

    'deleteFile': function(data) {
      return myFrontFetch({ url: 'fiche/' + data.getModel() + '/' + data['id'], init: { method: 'DELETE' }})
        .then(objectify)
        .then(function(data) { return create('Folder', data); })
        .catch()
        ;
    },

    'unlockFile': function(data) {
      return myFrontFetch({ url: 'unfreeze/' + data.getModel() + '/' + data['id'] })
        .then(objectify)
        .then(function(data) { return create('Folder', data); })
        .catch()
        ;
    },

    'usersList': function() {
      return myFrontFetch({ url: 'users' })
        .catch()
        ;
    },

    'userAdd': function(user) {
      return myFrontFetch({ url: 'users' , init: { method: 'POST' }, data: user })
        .catch()
        ;
    },

    'userDelete': function(id) {
      return myFrontFetch({ url: 'users/' + id, init: { method: 'DELETE' }})
        .catch()
        ;
    },

    'userUpdate': function(user) {
      return myFrontFetch({ url: 'users/' + user.id, init: { method: 'PUT' }, data: user})
        .catch()
        ;
    },

    'userPassword': function(id, pwd) {
      return myFrontFetch({ url: 'users/password/' + id, init: { method: 'POST' }, data: { password: pwd }})
        .catch()
        ;
    }
  };
}
