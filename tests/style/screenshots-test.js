
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
                const done = new Set();

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

                let p = new Promise(resolve => {
                    window.addEventListener('load', () => resolve());
                });
                function img_diff_tempo(id) {
                    p = p.then(() => img_diff(id));
                    return p;
                }

                function img_diff(id) {
                    if (done.has(id)) {
                        return;
                    }
                    done.add(id);

                    console.info("Calculating ", id);

                    const myImgElement = document.querySelector('#i' + id + '_ref');
                    const w = myImgElement.naturalWidth;
                    const h = myImgElement.naturalHeight;

                    const canvas = document.querySelector('#i' + id + '_fin');
                    canvas.setAttribute('status', 'running');
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
                    canvas.removeAttribute('status');
                }
            </script>
            <script src='../../node_modules/pixelmatch/index.js'></script>
            <style>
                img, canvas {
                    width: 30%;
                    border: solid 1px black;
                }

                [status='empty'] {
                    border: solid gray 2px;
                }

                [status='running'] {
                    border: solid yellow 2px;
                }

                compare {
                    border-bottom: 1px solid black;
                    margin-bottom: 5px;
                }
            </style>\n`;

        if (problemsList.size < 1) {
            res += 'no problem found';
        } else {
            // Houston, we've had a problem...
            let id = 0;
            for (let f of problemsList) {
                res += `<h3>${f}</h3>
            <div class='compare'>
                <img id='i${id}_ref' src='../tests/style/references/${f}'></img>
                <img id='i${id}_tst' src='e2e/browsers/firefox/${f}'></img>
                <canvas status='empty' id='i${id}_fin' for='${id}'></canvas>
                <script>img_diff_tempo(${id});</script>
            </div>
            \n`;
                id++;
            }
        }
        res += `
        </body></html>`;
        fs.writeFileSync('target/style.html', res);
    });
});
