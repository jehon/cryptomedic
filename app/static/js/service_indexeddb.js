/**
 * 
 */

function indexedDBCache() {
	var error = function(event) {
		console.error(event.target);
	};
	
	var db = false;
	
	if (indexedDB) {
		var request = indexedDB.open("cryptomedic", 1);
		request.onerror = error;
		request.onsuccess = function(event) {
			  db = event.target.result;
		};
		request.onblocked = function(event) {
			  // If some other tab is loaded with the database, then it needs to be closed
			  // before we can proceed.
			alert("Please close all other tabs with this site open!");
		};
		request.onupgradeneeded = function(event) {
			var db = event.target.result;
			var v = event.oldVersion;
			console.log(event);
			console.log("upgrading from " + v);
			if (v < 1) {
				console.log("upgrading to 1");
				db.createObjectStore("patients", { keyPath: "id" });
			}
		};
	}

	/* 
	 * Old methods !!! 
	 */
	
	var pcache = perishableCache(10);
	var root = "/rest/";
	
	function treatHttp(request, treatResponse) {
		var def = jQuery.Deferred();
		request.success(function(data, status, headers, config) {
			$rootScope.$broadcast("rest_logged_in");
			
			// TODOJH: filter and treat __sync data
			
			if (typeof(treatResponse) == 'function') {
				data = treatResponse(data, status, headers, config);
			}
			def.resolve(data);
		}).error(function(data, status, headers, config) {
			if (status == 401) {
				// 401: Unauthorized
				$rootScope.$broadcast("rest_logged_out");
			} else {
				// 403: Forbidden
				//alert("rest error: " + status + "\n" + data.replace(/<(?:.|\n)*?>/gm, ''));
				$rootScope.$broadcast("rest_error");
			}
			def.reject(data);
		});
		return def;
	}


	
	return {
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
		}
	};
}