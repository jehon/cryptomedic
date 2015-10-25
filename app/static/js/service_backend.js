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

/* Initialize the computer id */
if (!window.localStorage.cryptomedicComputerId) {
    console.log("generate cryptomedic_computer_id");
    var mask = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var result = "";
    for (var i = 0; i < 32; i++) {
        result += mask[Math.floor(Math.random() * mask.length)];
    }
    window.localStorage.cryptomedicComputerId = result;
}

/* service_my_backend */
function service_my_backend_fn() {
    var rest = "/cryptomedic/api/v1.0";

    var db = build_db(true);

    var worker = new Worker("static/worker/worker.js");
    worker.onerror = function(e) {
    console.error("@service: Error in worker: ", e);
    };

    worker.onmessage = function(e) {
        var name = e.data.name;
        var data = e.data.data;
        // console.log('@service: ' + name + ': ', data);
        switch(name) {
            case "progress":
                // localStorage.cryptomedicLastSync = data.checkpoint;
                // To be compatible with old version
                myEvents.trigger("backend_cache_progress", data);
                    break;
        }
        // Propagate event
        myEvents.trigger("backend_" + name, data);
    };

    function mySendAction(name, data) {
        worker.postMessage({ name: name, data: data });
    }

    mySendAction("init", {});

    return {
    /* Authentification */
    'login': function(username, password) {
        return myFetch(rest + "/auth/mylogin", { method: "POST" },
            {
                'username': username,
                'password': password,
                'appVersion': cryptomedic.version,
                'computerId': window.localStorage.cryptomedicComputerId
            })
            .then(this.storeData);
    },
    'checkLogin': function() {
        return myFetch(rest + "/auth/settings", null,
            {
                'appVersion': cryptomedic.version,
                'computerId': window.localStorage.cryptomedicComputerId
            }
        )
        .then(this.storeData)
    },
    'logout': function() {
        // TODO: clean up the cache --> cache managed in other object???
        return myFetch(rest + "/auth/logout");
    },

    // Go to the worker
    'sync': function() {
        mySendAction("sync");
    },
    'resync': function() {
        mySendAction("resync");
    },
    // Temp function
    'storeData': function(json) {
        if (json._offline) {
        var offdata = jQuery.extend(true, {}, json._offline);
        mySendAction("storeData", offdata);
        delete json._offline;
        }
        return json;
    },

    // Go to the database
    'getFolder': function(id) {
        // TODO: if not final then go to the server anyway...
        return db.getFolder(id);
    },
    'getByReference': function(year, order) {
        return db.getByReference(year, order);
    },
    'clear': function() {
        return db.clear();
    },

    // Go to the rest server
    'getReport': function(reportName, data, timing) {
        return myFetch(rest + "/reports/" + reportName + (timing ? "/" + timing : ""), null, data)
            .then(this.storeData);
        },
    };
};

/******* OLD INTERFACE **********/
/******* OLD INTERFACE **********/
/******* OLD INTERFACE **********/
/******* OLD INTERFACE **********/
/******* OLD INTERFACE **********/

// TODO: use the new "queue" system
mainApp.factory('service_backend', [ '$http', function($http) {
    var rest = "/cryptomedic/api/v1.0";

    // Transform the $http request into a promise
    function treatHttp(request) {
        var def = jQuery.Deferred();
        request.success(function(data, status, headers, config) {
            def.resolve(data);
        }).error(function(data, status, headers, config) {
            def.reject(data);
        });
        return def;
    }

    // TODO: migrate all these services to the new infrastructure
    return {
    /*******************************
     * Data oriented services
     */
    // READONLY -> when sync is done, this is to be managed on the idb !!!
    'searchForPatients': function(params) {
        return treatHttp($http.get(rest + "/folder", { 'params': params })).then(function(data) {
        var list = [];
        for(var i in data) {
            list.push(new application.models.Patient(data[i]));
        }
        return list;
        });
    },
    'checkReference': function(year, order) {
        return treatHttp($http.get(rest + "/reference/" + year + "/" + order)).then(function(data) {
            if ((typeof(data._type) != 'undefined') && (data._type == 'Folder')) {
                return data['id'];
            } else {
                return false;
            }
        });
    },

    // READWRITE
    'createReference': function(year, order) {
        return treatHttp($http.post(rest + "/reference",
        {
            'entryyear': year,
            'entryorder': order
        }));
    },
    'createFile': function(data, folderId) {
        return treatHttp($http.post(rest + "/fiche/" + data['_type'], data));
    },
    'saveFile': function(data, folderId) {
        return treatHttp($http.put(rest + "/fiche/" + data['_type'] + "/" + data['id'], data));
    },
    'deleteFile': function(data, folderId) {
        return treatHttp($http['delete'](rest + "/fiche/" + data['_type'] + "/" + data['id']));
    },
    'unlockFile': function(data, folderId) {
        return treatHttp($http.get(rest + "/unfreeze/" + data['_type'] + "/" + data['id']));
    }
    };
}]);

// https://docs.angularjs.org/api/ng/service/$http
// http://www.webdeveasy.com/interceptors-in-angularjs-and-useful-examples/
mainApp.factory('sessionInjector', [ '$q', '$rootScope', function($q, $rootScope) {
    return {
        'request': function(config) {
            if (config.data) {
                config.data = stringify(config.data);
            }
            //config.headers['X-OFFLINE-CP'] = localStorage.cryptomedicLastSync;
            return config;
        },
        'response': function(response) {
            // Take away the "offline" data with the new service
            // if (typeof(response.data) == "object") {
            //     // This will strip out the offline data;
            //     var d = service_my_backend.storeData(response.data);
            //     response.data = d;
            // }
            response.data = objectify(response.data)
            return response;
        },
        'responseError': function(rejection) {
            switch(rejection.status) {
                case 401: // Unauthorized
                    $rootScope.$broadcast("backend_logged_out");
                    break;
                default:
                console.warn(rejection);
            }
            return $q.reject(rejection);
        },
    };
}]);

mainApp.config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('sessionInjector');
}]);
