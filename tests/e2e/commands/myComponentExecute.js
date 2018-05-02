// https://gist.github.com/ChadKillingsworth/d4cb3d30b9d7fbc3fd0af93c2a133a53

/**
 * This function runs in the browser context
 */
function executeInShadowDom(selector, fn, ...args) {
	const selectors = selector.split('>>>').map(s => s.trim());
	var currentElement = document;
	for (var i = 0; i < selectors.length; i++) {
		if (i > 0) {
			currentElement = currentElement.shadowRoot;
		}
		if (selectors[i] == '') {
			return currentElement.shadowRoot;
		}
		currentElement = currentElement.querySelector(selectors[i]);
		if (!currentElement) {
			throw('Element not found: ' + selector + ' at ' + selectors[i]);
		}
	}

	let val = '';
	if ((fn.substring(0, 8) == 'function') || (fn[0] == '(')) {
		// https://stackoverflow.com/a/1271572/1954789
		val = (eval('[' + fn + ']')[0]).apply(currentElement, args);
	} else {
		// Function given is the name of a function
		val = currentElement[fn].apply(currentElement, args);
	}
	return val;
}

exports.command = function(selector, fn = () => { return this; }, args = [], callback = function() {}) {
	if (typeof(fn) == 'function') {
		fn = fn.toString();
	}
	this.execute(executeInShadowDom, [ selector, fn, args ], function(result) { callback(result.value); });
	return this;
};
