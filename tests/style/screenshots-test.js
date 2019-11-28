
const path = require('path');
const glob = require('glob');

const globP = (pattern, options) => {
	return glob.sync(pattern, options);
};

const refPath = path.join(__dirname, 'references');
const testPath = path.join(__dirname, '..', '..', 'target', 'e2e', 'browsers', 'firefox');

describe('screenshots', function () {
	let refs =     globP('*', { cwd: refPath });
	let tests =    globP('*', { cwd: testPath });
	let fullList = new Set([...refs, ...tests]);

	it('should match screenshots', () => {
		expect(true).toBeTruthy();
	});

	for (let f of fullList) {
		it(f, function (done) {
			if (refs.includes(f)) {
				if (tests.includes(f)) {
					done();
				} else {
					done.fail('test is not available');
				}
			} else {
				// if refs does not includes it, it is only present from 'test'
				pending('reference is not available');
			}
		});
	}
});
