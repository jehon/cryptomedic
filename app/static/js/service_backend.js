"use strict";

/*
 * expected behavior:
 * - always store what come back from the server in the cache
 * - if offline, this data does not perish
 * - if online, this data perish (see checkId which manage that)
 * 
 * Expected from the server:
 * - if offline, the list of modifications since last time
 * - if online, nothing special
 *
 * Tasks:
 * 1. make this cache async in its calls (return promise)
 * 2. manage the fallback mode: when no indexedDB are available (!db)
 * 3. enrich when receiving data from the server and get from the indexedDB
 * 
 */

mainApp.factory('service_backend', [ '$http', '$rootScope', function($http, $rootScope) {
//    var rest = service_rest($http);

    var pcache = perishableCache(10);
    var phprest = "/rest/";
    var rest = "/cryptomedic/rest/public/";
    var onLogin = jQuery.Callbacks();
    var onLogout = jQuery.Callbacks();
    var onError = jQuery.Callbacks();

    onLogin.add(function() { 
	console.info("service_backend.onLogin"); 
	$rootScope.$broadcast("backend_logged_in");
    });

    onLogout.add(function() { 
	console.info("service_backend.onLogout"); 
	$rootScope.$broadcast("backend_logged_out");
    });

    onError.add(function() { 
	console.info("service_backend.onError"); 
	$rootScope.$broadcast("backend_logged_error");
    });

    function treatHttp(request, treatResponse) {
	var def = jQuery.Deferred();
	request.success(function(data, status, headers, config) {
	    onLogin.fire();
			
	    if (typeof(treatResponse) == 'function') {
		data = treatResponse(data, status, headers, config);
	    }
	    def.resolve(data);
	}).error(function(data, status, headers, config) {
	    if (status == 401) {
		// 401: Unauthorized
		onLogout.fire();
	    } else {
		// 403: Forbidden
		onError.fire();
	    }
	    def.reject(data);
	});
	return def;
    }

    return {
	'checkLogin': function() {
	    // TODOJH: Give hime information about last sync
	    return treatHttp($http.get(phprest + "/authenticate/settings&appVersion=" + cryptomedic.versions.agglomerated));
	},
	'doLogin': function(username, password) {
	    // Hack: if no username is given, then checkLogin instead
	    if (username == "") return this.checkLogin();
	    return treatHttp($http.post(phprest + "/authenticate/login", 
		    { 'username': username, 
			'password': password, 
			'appVersion': cryptomedic.versions.agglomerated 
		    }));
	},
	'doLogout': function() {
	    // TODO: more cleanup
	    pcache.clear();
	    return treatHttp($http.get(phprest + "/authenticate/logout"), function(data) {
		onLogout.fire();
	    });
	},
	'getFolder': function(id) {
	    if (pcache.isCached(id)) {
		return jQuery.Deferred().resolve(pcache.get(id));
	    }
	    return treatHttp($http.get(rest + "/folder/" + id), function(data) {
		pcache.set(data.getMainFile().id, data);
		return data;				
	    });
	},
	'getParent': function(type, id) {
	    return treatHttp($http.get(rest + "/related/" + type + "/" + id), function(data) {
		pcache.set(data.getMainFile().id, data);
		return data;				
	    });
	},
	'searchForPatients': function(params) {
	    return treatHttp($http.get(rest + "/folder", { 'params': params }), function(data) {
		var list = [];
		for(var i in data) {
		    list.push(new application.models.Patient(data[i]));
		}
		return list;
	    });
	},
	'searchForConsultations': function(day, center) {
	    day = date2CanonicString(day, true);
	    return treatHttp($http.get(rest + "/reports/consultations", { 'params': { 'day': day, 'center': center} }), function(data) {
		var list = [];
		for(var i in data) {
		    list.push(new application.models.Patient(data[i]));
		}
		return list;
	    });
	},
	'checkReference': function(year, order) {
	    return treatHttp($http.get(phprest + "/references/", 
		{ 'params': { 
		    'entryyear': year, 
		    'entryorder': order
		}}), 
		function(data) {
			if (data.length == 1) {
			    return data[0]['id'];
			} else {
			    return false;
			}
		});
	},
	'createReference': function(year, order) {
	    return treatHttp($http.post(phprest + "/references/", 
		{ 
			'entryyear': year, 
			'entryorder': order
		}), function(data) {
			pcache.set(data.getMainFile().id, data);
			return data;
		}); 
	},
	'unlockFile': function(data, folderId) {
	    pcache.perish(folderId);
	    return treatHttp($http({ method: "UNLINK", url: phprest + "/fiche/" + data['_type'] + "/" + data['id'] }), function(data) {
		pcache.set(data.getMainFile().id, data);
		return data;				
	    });
	},
	'saveFile': function(data, folderId) {
	    pcache.perish(folderId);
	    return treatHttp($http.put(phprest + "/fiche/" + data['_type'] + "/" + data['id'], data), function(data) {
		pcache.set(data.getMainFile().id, data);
		return data;				
	    });
	},
	'createFile': function(data, folderId) {
	    pcache.perish(folderId);
	    return treatHttp($http.post(phprest + "/fiche/" + data['_type'], data), function(data, status, headers, config) {
		pcache.set(data.getMainFile().id, data);
		return data;				
	    });
	},
	'deleteFile': function(data, folderId) {
	    pcache.perish(folderId);
	    return treatHttp($http.delete(phprest + "/fiche/" + data['_type'] + "/" + data['id']), function(data) {
		if (data instanceof application.models.Folder) {
		    pcache.set(data.getMainFile().id, data);
		}
		return data;				
	    });
	},
	'getReport': function(reportName, data) {
	    console.log(reportName);
	    console.log(data);
	    return treatHttp($http.get(rest + "/reports/" + reportName, { 'params': data }), 
		    function(data) { return data; }
	    	);
	},
	'onLogout': onLogout,
	'onLogin': onLogin,
	'onError': onError
    };
}]);
