
const path = require('path');
const glob = require('glob');
const resemble = require('node-resemble-js');

const globP = (pattern, options) => {
	return glob.sync(pattern, options);
};

const refPath = path.join(__dirname, 'references');
const testPath = path.join(__dirname, '..', '..', 'target', 'e2e', 'browsers', 'firefox');

let refs =     globP('*', { cwd: refPath });
let tests =    globP('*_reference*.png', { cwd: testPath });
let fullList = new Set([...refs, ...tests]);

for (let f of fullList) {
	it('screenshot: ' + f, function(done) {
		if (refs.includes(f)) {
			if (tests.includes(f)) {
				resemble(path.join(testPath, f))
					.compareTo(path.join(refPath, f))
					.onComplete(function(data){
						// console.log(f, data);
						const diffContent = data.misMatchPercentage;
						const diffSize = Math.hypot(data.dimensionDifference.width, data.dimensionDifference.height);
						expect(diffSize)
							.withContext('differ too much in size')
							.toBeLessThan(2);
						expect(diffContent)
							.withContext('differ too much in content')
							.toBeLessThan(5);
						done();
					});
			} else {
				done.fail('test is not available');
			}
		} else {
			// if refs does not includes it, it is only present from 'test'
			pending('reference is not available');
		}
	});
}
