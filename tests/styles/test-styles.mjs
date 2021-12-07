#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import glob from 'glob';
import resemble from 'node-resemble-js';
import chalk from 'chalk';
import pixelMatch from 'pixelmatch';
import { PNG } from 'pngjs';
import yargs from 'yargs';
import { fileURLToPath } from 'url';

const p_ok = chalk.green(' ✓ ');
const p_warn = chalk.yellow(' ? ');
const p_ko = chalk.red('✗  ');

const projectRoot = path.dirname(path.dirname(path.dirname(fileURLToPath(import.meta.url))));
const stylesRoot = path.join(projectRoot, 'tmp', 'styles');
const referenceFolder = 'references';
const runFolder = 'run';
const diffFolder = 'diff';
const referenceUpdateFolder = path.join(projectRoot, 'tests', 'styles', 'references');

function inStyles(...folder) {
    return path.join(stylesRoot, ...folder);
}

fs.mkdirSync(stylesRoot, { recursive: true });
fs.mkdirSync(inStyles(diffFolder), { recursive: true });
fs.mkdirSync(inStyles(diffFolder, 'desktop'), { recursive: true });
fs.mkdirSync(inStyles(diffFolder, 'mobile'), { recursive: true });

const opts = yargs(process.argv.slice(2))
    .option('update', {
        alias: 'u',
        type: 'boolean'
    })
    .help()
    .strict()
    .argv;

// Configurations
const MaxDiffs = {
    size: 0.1,
    content: 0.1
};

(async function () {
    const listOfFiles = [];
    // Add the ref
    glob.sync('**/*.png', { cwd: inStyles(referenceFolder) }).map(f => listOfFiles.push({
        key: f,
        ref: path.join(referenceFolder, f)
    }));

    // Add the run
    glob.sync('**/*.png', { cwd: inStyles(runFolder) }).map(f => listOfFiles.push({
        key: f,
        run: path.join(runFolder, f)
    }));

    // Combine all results => { fk1: f1+f1, fk2: f2 } => [ f1 f2 f3 ]
    const uniqueFiles = Object.values(listOfFiles.reduce((acc, val) => {
        acc[val.key] = {
            ...acc[val.key],
            ...val
        };
        return acc;
    }, {}));

    uniqueFiles.map(fset => {
        fset.problem = false;
        fset.warning = false;

        if (!('ref' in fset)) {
            fset.problem = true;
            fset.problemText = 'No reference found';
        }
        if (!('run' in fset)) {
            fset.problem = true;
            fset.problemText = 'No run found';
        }
    });

    let scanned = 0;
    for (const fset of uniqueFiles) {
        if (fset.problem) {
            continue;
        }
        // Calculate problems for each files
        await new Promise((resolve) => resemble(inStyles(fset.run))
            .compareTo(inStyles(fset.ref))
            .onComplete(function (data) {
                fset.compared = true;
                const diffContent = parseFloat(data.misMatchPercentage);
                const diffSize = Math.hypot(data.dimensionDifference.width, data.dimensionDifference.height);

                console.assert(isFinite(diffContent));
                console.assert(isFinite(diffSize));

                if (diffSize == 0 && diffContent == 0) {
                    fs.unlinkSync(inStyles(fset.ref));
                    // fs.unlinkSync(inStyles(fset.run));
                } else {
                    if (diffSize > 0) {
                        fset.diffSize = diffSize;
                        if (diffSize > MaxDiffs.size) {
                            fset.problem = true;
                            fset.problemText = `size    - ${diffSize} vs. ${MaxDiffs.size}`;
                        }
                    } else if (diffContent > 0) {
                        fset.diffContent = diffContent;
                        if (diffContent > MaxDiffs.content) {
                            fset.problem = true;
                            fset.problemText = `content - ${diffContent} vs. ${MaxDiffs.content}`;
                        } else {
                            fset.warning = true;
                            fset.warningText = `content - ${diffContent}`;
                        }
                    }

                    // Generate the diffs
                    fset.diff = path.join(diffFolder, fset.key);
                    const ref = PNG.sync.read(fs.readFileSync(inStyles(fset.ref)));
                    const run = PNG.sync.read(fs.readFileSync(inStyles(fset.run)));
                    const { width, height } = ref;
                    const diff = new PNG({ width, height });

                    pixelMatch(ref.data, run.data, diff.data, width, height, { threshold: 0.1 });

                    fs.writeFileSync(inStyles(fset.diff), PNG.sync.write(diff));
                }

                scanned++;
                if (process.stdout.clearLine) {
                    process.stdout.clearLine(0);
                    process.stdout.cursorTo(0);
                    process.stdout.write(`Processed ${scanned}/${uniqueFiles.length}`);
                }
                resolve();
            }));
    }
    if (process.stdout.clearLine) {
        process.stdout.clearLine(0);
        process.stdout.cursorTo(0);
    }

    const problemsList = uniqueFiles
        .map(fset => {
            if (fset.problem || fset.warning) {
                if (fset.problem) {
                    console.error(`${p_ko}: ${fset.key} ${fset.problemText}`);
                } else {
                    console.warn(`${p_warn}: ${fset.key} ${fset.warningText}`);
                }
            } else {
                console.info(`${p_ok}: ${fset.key}`);
            }
            return fset;
        })
        .filter(fset => fset.problem || fset.warning);

    console.info('---------------------');

    if (opts.update) {
        console.info(chalk.yellow('update mode'));
        let success = true;
        for (const fset of problemsList) {
            if (!fset.problem && !fset.warning) {
                continue;
            }
            if (!fset.run) {
                console.error(`${p_ko}: ${fset.key} does not have a run`);
                success = false;
                continue;
            }
            process.stdout.write(`> ${fset.ref}\n`);
            fs.copyFileSync(fset.run, path.join(referenceUpdateFolder, fset.dest));
        }
        if (!success) {
            console.error(p_ko, 'Problem');
            process.exit(1);
        }
    } else {
        fs.writeFileSync(path.join(stylesRoot, 'styles-problems-list.js'), 'problemsList = ' + JSON.stringify(problemsList, null, 2));
        if (problemsList.filter(fset => fset.problem).length > 0) {
            console.error(p_ko, 'some tests did fail');
            process.exit(1);
        }
    }
    console.info(p_ok, 'ok');
    process.exit(0);
})();