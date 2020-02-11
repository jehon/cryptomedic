/* exported TimedMap */

let TimedMap = (function () {
	let cache = new WeakMap();

	class TimedMap {
		constructor(timeoutSecs = 1 * 60) {
			cache.set(this, {});
			this.timeOutMs = timeoutSecs * 1000;
		}

		checkValidity(id) {
			// Empty case
			if (typeof (cache.get(this)[id]) === 'undefined') {
				return null;
			}

			// Expired case
			if ((cache.get(this)[id]['ts'] + this.timeOutMs) < ((new Date()).getTime())) {
				delete (cache.get(this)[id]);
				return false;
			}
			return true;
		}

		get(id) {
			if (this.checkValidity(id)) {
				// clone.js:
				return window.clone(cache.get(this)[id]['data'], true);
			}
			return null;
		}

		set(id, data) {
			cache.get(this)[id] = {
				ts: (new Date()).getTime(),
				data: data
			};
			return data;
		}

		count() {
			// First, remove perished values
			for (let i in cache.get(this)) {
				this.checkValidity(i);
			}
			return Object.keys(cache.get(this)).length;
		}

		dump() {
			console.info(cache.get(this));
		}
	}

	return TimedMap;
}());
