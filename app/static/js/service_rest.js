"use strict";

function service_rest($http) {
    var pcache = perishableCache(10);
    var root = "/rest/";
    var onLogin = jQuery.Callbacks();
    var onLogout = jQuery.Callbacks();
    var onError = jQuery.Callbacks();

    onLogin.add(function() { console.info("service_rest onLogin"); });
    onLogout.add(function() { console.info("service_rest onLogout"); });
    onError.add(function() { console.info("service_rest onError"); });
	
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
			return treatHttp($http.get(root + "/authenticate/settings&version=" + cryptomedic.version));
		},
		'doLogin': function(username, password) {
			// Hack: if no username is given, then checkLogin
			// instead
			if (username == "") return this.checkLogin();
			return treatHttp($http.post(root + "/authenticate/login", { 'username': username, 'password': password, 'version': cryptomedic.version }));
		},
		'doLogout': function() {
		    // TODO: more cleanup
			pcache.clear();
			return treatHttp($http.get(root + "/authenticate/logout"), function(data) {
				onLogout.fire();
			});
		},
		'getFolder': function(id) {
			if (pcache.isCached(id)) {
				return jQuery.Deferred().resolve(pcache.get(id));
			}
			return treatHttp($http.get(root + "/folders/" + id), function(data) {
				pcache.set(data.getMainFile().id, data);
				return data;				
			});
		},
		'getParent': function(type, id) {
			return treatHttp($http.get(root + "/related/" + type + "/" + id), function(data) {
				pcache.set(data.getMainFile().id, data);
				return data;				
			});
		},

		'searchForPatients': function(params) {
			return treatHttp($http.get(root + "/folders/", { 'params': params }), function(data) {
				var list = [];
				for(var i in data) {
					list.push(new application.models.Patient(data[i]));
				}
				return list;
			});
		},
		'searchForConsultations': function(day, center) {
			day = date2CanonicString(day, true);
			return treatHttp($http.get(root + "/consultations/", { 'params': { 'day': day, 'center': center} }), function(data) {
				var list = [];
				for(var i in data) {
					list.push(new application.models.Patient(data[i]));
				}
				return list;
			});
		},
		'checkReference': function(year, order) {
			return treatHttp($http.get(root + "/references/", 
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
			return treatHttp($http.post(root + "/references/", 
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
		    return treatHttp($http({ method: "UNLINK", url: root + "/fiche/" + data['_type'] + "/" + data['id'] }), function(data) {
				pcache.set(data.getMainFile().id, data);
				return data;				
			});
		},
		'saveFile': function(data, folderId) {
			pcache.perish(folderId);
			return treatHttp($http.put(root + "/fiche/" + data['_type'] + "/" + data['id'], data), function(data) {
				pcache.set(data.getMainFile().id, data);
				return data;				
			});
		},
		'createFile': function(data, folderId) {
			pcache.perish(folderId);
			return treatHttp($http.post(root + "/fiche/" + data['_type'], data), function(data, status, headers, config) {
				pcache.set(data.getMainFile().id, data);
				return data;				
			});
		},
		'deleteFile': function(data, folderId) {
			pcache.perish(folderId);
			return treatHttp($http.delete(root + "/fiche/" + data['_type'] + "/" + data['id']), function(data) {
				if (data instanceof application.models.Folder)
					pcache.set(data.getMainFile().id, data);
				return data;				
			});
		},
		'onLogout': onLogout,
		'onLogin': onLogin,
		'onError': onError
	};
};
