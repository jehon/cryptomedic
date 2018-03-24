/* eslint-env jasmine */
/* global webDescribe, JHElement */
/* global readJSON, API_VERSION */
/* exported loadReference, webDescribe, extractPath */

function loadReference(name) {
	// Thanks to http://stackoverflow.com/a/27830579/1954789
	let valid_respond = readJSON('api/' + API_VERSION + '/tests/references/' + name);
	expect(valid_respond).not.toBeNull('The reference ' + name + ' is empty or not found');
	return valid_respond;
}

function webDescribe(title, html, fn) {
	return describe(title, function() {
		let div;
		let element;
		let oldTimeout;

		beforeEach(function(done) {
			// Set an acceptable timeout
			oldTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
			jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

			// Build up the element

			// - The real component

			div = document.createElement('div');
			div.style='border: red solid 1px; min-height: 10px';
			div.innerHTML = html.trim();

			// - Add the title for completeness
			let h3 = document.createElement('h3');
			h3.innerHTML = title;
			div.appendChild(h3);

			// - Dump code for info
			let pre = document.createElement('pre');
			pre.innerHTML = html.split('<').join('&lt;').split('>').join('&gt');
			div.appendChild(pre);

			// Add some styling
			let style = document.createElement('style');
			style.innerHTML = `
        pre {
          background-color: yellow;
        }
      `;
			div.appendChild(style);

			document.body.appendChild(div);
      
			let check = (el) => {
				if (el instanceof HTMLUnknownElement) {
					return el.tagName;
				}
				for(let i in el.children) {
					let res = check(el.children[i]);
					if (res !== true) {
						return res;
					}
				}
				return true;
			};

			let i = 40;
			let interval = setInterval(() => {
				if (i-- <= 0) {
					// console.log("too much tests", div.firstChild);
					clearInterval(interval);
					done.fail('testComponent: component could not be instanciated ', html);
					return;
				}

				// Do we have a first child?
				if (!div.firstChild) {
					// console.log("no first child");
					return ;
				}

				// Check all object for HTMLUnknownElements
				if (!check(div.firstChild)) {
					// console.log("checking child nodes does not work");
					return;
				}

				// Happy case
				clearInterval(interval);
				element = div.firstChild;
				done();
			}, 100);
		});

		afterEach(function() {
			// For debugging purpose, sometimes, we want to keep the element...
			if (this.jh_keep) {
				return;
			}

			// Register removing it afterwards
			document.body.removeChild(div);
			jasmine.DEFAULT_TIMEOUT_INTERVAL = oldTimeout;
		});

		it('should initialize the object correctly', function() {
			expect(element).not.toBeUndefined();     
			expect(element).not.toBeNull();     
		});

		// We need to pass it as a function, because as we start this function
		// element is not already defined
		fn(() => element);
	});
}

webDescribe('webDescribe.js', '<div></div>', function(element) {
	it('should work', function() {
		expect(element()).not.toBe(null);
		expect(element().tagName).toBe('DIV');
	});
});


function extractPath(url) {
	return url.replace(/^http.?:\/\/localhost:[0-9]+/, '');
}

it('with extractPath', function() {
	expect(extractPath('http://localhost:9876/test')).toBe('/test');
	expect(extractPath('https://localhost:9876/test')).toBe('/test');

	// invalid
	expect(extractPath('xhttp://localhost:9876/test')).toBe('xhttp://localhost:9876/test');
});
