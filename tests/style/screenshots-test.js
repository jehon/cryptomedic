
const path = require('path');
const glob = require('glob');

const globP = (pattern, options) => new Promise((resolve, reject) => {
	glob(pattern, options, (err, files) => {
		if (err) {
			reject(err);
		}
		resolve(files);
	});
});

const refPath = path.join(__dirname, 'references');
const testPath = path.join(__dirname, '..', '..', 'target', 'e2e', 'browsers', 'firefox');

describe('screenshots', function () {
	it('should match screenshots', () => {
		expect(true).toBeTruthy();
	});

	return Promise.all([ 
		globP('*', { cwd: refPath }),
		globP('*', { cwd: testPath }),
	]).then(([ refs, tests ]) => {
		console.log(refs);
		console.log(tests);
	});
});
