

function perishableCache(n, perish) {
	var cache = {};
	var timestamps = {};
	
	return {
		'isCached': function(id) {
			return (typeof(cache[id]) != "undefined");
		},
		'get': function(id) {
			if (this.isCached(id)) 
				return angular.copy(cache[id]);
			return null;
		},
		'perish': function(id) {
			if (this.isCached(id))
				delete(cache[id]);
			return true;
		},
		'set': function(id, data) {
			cache[id] = angular.copy(data);
			return data;
		}
	};
};