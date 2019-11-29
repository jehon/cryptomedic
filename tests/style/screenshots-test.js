
const path = require('path');
const glob = require('glob');

const globP = (pattern, options) => {
	return glob.sync(pattern, options);
};

const refPath = path.join(__dirname, 'references');
const testPath = path.join(__dirname, '..', '..', 'target', 'e2e', 'browsers', 'firefox');

let refs =     globP('*', { cwd: refPath });
let tests =    globP('*', { cwd: testPath });
let fullList = new Set([...refs, ...tests]);

for (let f of fullList) {
	it('screenshot: ' + f, function(done) {
		if (refs.includes(f)) {
			if (tests.includes(f)) {
				// 	var screenshot = new Buffer(pngString, 'base64');
				// 	resemble(image)
				// 	  .compareTo(screenshot)
				// 	  .onComplete(function(data){
				// 		if (Number(data.misMatchPercentage) <= 0.01) {
				// 		  callback();
				// 		} else {
				// 		  data.getDiffImage().pack().pipe(fs.createWriteStream(image + 'diff.png'));
				// 		  callback.fail(new Error("Screenshot '" + image+  "' differ " + data.misMatchPercentage + "%"));
				// 		}
				// 	  });
				//   });
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
