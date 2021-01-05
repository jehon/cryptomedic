#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');
const resemble = require('node-resemble-js');
const chalk = require('chalk');

const globP = (pattern, options) => {
    return glob.sync(pattern, options);
};

const refPath = path.join(__dirname, 'references');
const testPath = path.join(__dirname, '..', '..', 'tmp', 'e2e', 'browsers', 'firefox');

let refs = globP('*', { cwd: refPath });
let tests = globP('*_reference*.png', { cwd: testPath });
let fullList = new Set([...refs, ...tests]);

const result = {};
let success = true;

const p_ok = chalk.green(' ✓');
const p_warn = chalk.yellow(' !');
const p_ko = chalk.red(' ✗');

Promise.allSettled(Array.from(fullList).map(f => {
    return new Promise((resolve, reject) => {
        if (!refs.includes(f)) {
            // if refs does not includes it, it is only present from 'test'
            result[f] = {
                level: 'warning',
                type: 'pending'
            };
            console.error(`${p_warn} ${f}: ${result[f].type}`);
            return resolve();
        }
        if (!tests.includes(f)) {
            result[f] = {
                level: 'error',
                type: 'unavailable'
            };
            console.error(`${p_ko} ${f}: ${result[f].type}`);
            success = false;
            return resolve();
        }
        resemble(path.join(testPath, f))
            .compareTo(path.join(refPath, f))
            .onComplete(function (data) {
                const diffContent = data.misMatchPercentage;
                const diffSize = Math.hypot(data.dimensionDifference.width, data.dimensionDifference.height);
                if (diffSize > 0.5) {
                    result[f] = {
                        level: 'error',
                        type: 'size',
                        max: 0.5,
                        actual: diffSize
                    };
                    console.error(`${p_ko} ${f}: (${result[f].type}) - ${result[f].actual} vs. ${result[f].max}`);
                    success = false;
                    return reject();
                }
                if (diffContent > 0.5) {
                    result[f] = {
                        level: 'error',
                        type: 'content',
                        max: 0.5,
                        actual: diffContent
                    };
                    console.error(`${p_ko} ${f}: (${result[f].type}) - ${result[f].actual} vs. ${result[f].max}`);
                    success = false;
                    return reject();
                }
                if (diffContent > 0) {
                    result[f] = {
                        level: 'warning',
                        msg: f + ' differ is content',
                        type: 'content',
                        max: 0.5,
                        actual: diffContent
                    };
                    console.error(`${p_warn} ${f}: (${result[f].type}) - ${result[f].actual} vs. ${result[f].max}`);
                    return resolve();
                }
                console.info(p_ok, f, ': ok');
                return resolve();
            });
    });
}))
    .finally(() => {
        fs.writeFileSync(path.join(__dirname, '../../tmp/styles.json'), JSON.stringify(result));
    }).then((_result) => {
        console.info('*** Final result ***');

        // TODO: trust the allSetted (_result[*].statut = fulfulled|rejected, .reason=data
        if (success) {
            console.info(p_ok, 'ok');
            process.exit(0);
        } else {
            console.error(p_ko, 'some tests did fail');
            process.exit(1);
        }
    });
