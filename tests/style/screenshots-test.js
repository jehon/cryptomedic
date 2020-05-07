
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
                            const diffContent = data.misMatchPercentage;
                            const diffSize = Math.hypot(data.dimensionDifference.width, data.dimensionDifference.height);
                            expect(diffSize)
                                .withContext('differ too much in size')
                                .toBeLessThan(1);
                            expect(diffContent)
                                .withContext('differ too much in content')
                                .toBeLessThan(1);
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
        let res = `
            <html><body>
            <script>
                module = { exports: {}};

                function img2data(id, w, h) {
                    const myImgElement = document.querySelector('#' + id);

                    // 1) Create a canvas, either on the page or simply in code
                    var canvas = document.createElement('canvas');
                    canvas.height = h;
                    canvas.width = w;
                    var ctx    = canvas.getContext('2d');
                    
                    // 2) Copy your image data into the canvas
                    ctx.drawImage( myImgElement, 0, 0, w, h );
                    
                    // 3) Read your image data
                    return ctx.getImageData(0,0,w,h).data;
                }

                function img_diff(id) {
                    const myImgElement = document.querySelector('#i' + id + '_ref');
                    const w = myImgElement.naturalWidth;
                    const h = myImgElement.naturalHeight;

                    const canvas = document.querySelector('#i' + id + '_fin');
                    canvas.width = w;
                    canvas.height = h;
                    const diff = canvas.getContext('2d');
                    
                    const diffImg = diff.createImageData(w, h);

                    pixelmatch(
                        img2data('i' + id + '_ref', w, h), 
                        img2data('i' + id + '_tst', w, h), 
                        diffImg.data, 
                        w, h, { threshold: 0.01 });
                    diff.putImageData(diffImg, 0, 0);
                }
            </script>
            <script src='../../node_modules/pixelmatch/index.js'></script>
            <style>
                img, canvas {
                    width: 30%;
                    border: solid 1px black;
                }
                compare {
                    border-bottom: 1px solid black;
                    margin-bottom: 5px;
                }
            </style>\n`;

        if (problemsList.size < 1) {
            res += "no problem found";
        } else {
            // Houston, we've had a problem...
            let id = 0;
            for (let f of problemsList) {
                res += `<div class='compare'>
                <img id='i${id}_ref' src='../tests/style/references/${f}'></img>
                <img id='i${id}_tst' src='e2e/browsers/firefox/${f}'></img>
                <canvas id='i${id}_fin' for='${id}'></canvas>
            </div>
            <script>
                window.addEventListener('load', () => {
                    document.querySelectorAll('canvas[for]').forEach(e => {
                        img_diff(e.getAttribute('for'));
                    });
                })
            </script>
            \n`;
                id++;
            }
        }
        res += '\n</body></html>';
        fs.writeFileSync('target/style.html', res);
    });
});
