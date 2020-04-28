
const fs = require('fs');
const path = require('path');
const glob = require('glob');
const resemble = require('node-resemble-js');

const globP = (pattern, options) => {
    return glob.sync(pattern, options);
};

const refPath = path.join(__dirname, 'references');
const testPath = path.join(__dirname, '..', '..', 'target', 'e2e', 'browsers', 'firefox');

let refs = globP('*', { cwd: refPath });
let tests = globP('*_reference*.png', { cwd: testPath });
let fullList = new Set([...refs, ...tests]);
let problemsList = new Set(fullList);

// We add a custom reporter to track the list of problematic files
jasmine.getEnv().addReporter({
    specDone: async result => {
        const fn = result.fullName.split(':').splice(1).join('').trim();
        const status = result.failedExpectations.length < 1;
        if (status) {
            problemsList.delete(fn);
        }
    }
});

describe('with screenshots', () => {
    for (let f of fullList) {
        it('screenshot: ' + f, function (done) {
            if (refs.includes(f)) {
                if (tests.includes(f)) {
                    resemble(path.join(testPath, f))
                        .compareTo(path.join(refPath, f))
                        .onComplete(function (data) {
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

    afterAll(() => {
        if (problemsList.size < 1) {
            return;
        }
        // Houston, we've had a problem...
        let res = `
            <html><body>
            <style>
                img {
                    width: 45%;
                }
                compare {
                    border-bottom: 1px solid black;
                    margin-bottom: 5px;
                }
            </style>
            \n`;
        for (let f of problemsList) {
            res += `<div class='compare'>
                <img src='../tests/style/references/${f}'>
                <img src='e2e/browsers/firefox/${f}'>
            </div>\n`;
        }
        res += '\n</body></html>';
        fs.writeFileSync('target/style.html', res);
    });
});
