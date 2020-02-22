
(function() {
	const shouldUpgrade = function() {
		window.location.href = '/static/upgrade.html';
	};

	if (!Promise || !sessionStorage || !fetch || !ShadowRoot || !customElements) {
		shouldUpgrade();
	}

	// Test input[type=date]
	// @See https://stackoverflow.com/a/10199306/1954789
	(function() {
		var input = document.createElement('input');
		input.setAttribute('type','date');

		var notADateValue = 'not-a-date';
		input.setAttribute('value', notADateValue);

		if (input.value === notADateValue) {
			shouldUpgrade('input[type=date]');
		}
	})();

	// Test cookies
	(function() {
		var cookieEnabled = (navigator.cookieEnabled) ? true : false;

		if (typeof(navigator.cookieEnabled) == 'undefined' && !cookieEnabled) {
			document.cookie = 'testcookie';
			cookieEnabled = (document.cookie.indexOf('testcookie') != -1) ? true : false;
		}
		if (!cookieEnabled) {
			alert('Your cookie are disabled. Please enable them.\nVos cookies sont désactivés. Merci de les activer.');
			console.error('Cookies are disabled');
		}
	})();
})();
