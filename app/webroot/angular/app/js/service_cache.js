

function perishableCache(n, perish) {
	var cache = {};
	var timestamps = {};
	
	return {
		'isCached': function(id) {
			return (typeof(cache[id]) != "undefined");
		},
		'get': function(id) {
			if (this.isCached(id)) return cache[id];
			return null;
		},
		'perish': function(id) {
			if (this.isCached(id))
				delete(cache[id]);
		},
		'set': function(id, data) {
			cache[id] = data;
		}
	}
};