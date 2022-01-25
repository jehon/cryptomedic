#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import glob from 'glob';
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
    sizePercent: 0.1,
    contentPixels: 40
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

    const problemsList = Object.values(listOfFiles.reduce((acc, val) => {
        // Join ref and run
        // { fk1: f1+f1, fk2: f2 } => [ f1 f2 f3 ]
        acc[val.key] = {
            ...acc[val.key],
            ...val
        };
        return acc;
    }, {}))
        .map(fset => {
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

            if (!fset.problem) {
                fset.mode = fset.ref.split('/')[1];
                fset.name = fset.ref.split('/').pop();

                // Generate the diffs
                fset.diff = path.join(diffFolder, fset.key);
                const ref = PNG.sync.read(fs.readFileSync(inStyles(fset.ref)));
                const run = PNG.sync.read(fs.readFileSync(inStyles(fset.run)));
                const { width, height } = ref;
                const diffPNG = new PNG({ width, height });

                fset.diffSize = Math.abs(1 - (run.height * run.width) / (ref.height * ref.width));
                if (fset.diffSize == 0) {
                    fset.diffPixels = pixelMatch(ref.data, run.data, diffPNG.data, width, height /*, { threshold: 0.1 } */);
                }

                const r = (v) => Math.round(v * 100) + '%';

                if (fset.diffSize == 0 && fset.diffContent == 0) {
                    fs.unlinkSync(inStyles(fset.ref));
                } else {
                    if (fset.diffSize > 0) {
                        // if (fset.diffSize > MaxDiffs.sizePercent) {
                        fset.problem = true;
                        fset.problemText = `size    - ${r(fset.diffSize)} vs. ${MaxDiffs.sizePercent}`;
                        // }
                    } else if (fset.diffPixels > 0) {
                        if (fset.diffPixels > MaxDiffs.contentPixels) {
                            fset.problem = true;
                            fset.problemText = `content - ${fset.diffPixels} vs. ${MaxDiffs.contentPixels}`;
                        } else {
                            fset.warning = true;
                            fset.warningText = `content - ${fset.diffPixels} - ${fset.diffContent}`;
                        }
                    }

                    fs.writeFileSync(inStyles(fset.diff), PNG.sync.write(diffPNG));
                }

            }
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
            fs.copyFileSync(inStyles(fset.run), path.join(referenceUpdateFolder, fset.mode, fset.name));
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