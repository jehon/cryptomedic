#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');
const resemble = require('node-resemble-js');
const chalk = require('chalk');

const p_ok = chalk.green(' ✓ ');
const p_warn = chalk.yellow(' ? ');
const p_ko = chalk.red('✗  ');

const projectRoot = path.dirname(path.dirname(__dirname));
const stylesRoot = path.join(projectRoot, "tmp", "styles");
const referenceFolder = path.join(stylesRoot, "references");
const runFolder = path.join(stylesRoot, "run");
const referenceUpdateFolder = path.join(projectRoot, 'tests', 'styles', 'references');

const opts = require('yargs/yargs')(process.argv.slice(2))
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
    glob.sync('**/*.png', { cwd: referenceFolder }).map(f => listOfFiles.push({
        key: f,
        name: path.basename(f),
        ref: path.join(referenceFolder, f)
    }));

    // Add the run
    glob.sync('**/*.png', { cwd: runFolder }).map(f => listOfFiles.push({
        key: f,
        name: path.basename(f),
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
        await new Promise((resolve) => resemble(fset.run)
            .compareTo(fset.ref)
            .onComplete(function (data) {
                fset.compared = true;
                const diffContent = parseFloat(data.misMatchPercentage);
                const diffSize = Math.hypot(data.dimensionDifference.width, data.dimensionDifference.height);

                console.assert(isFinite(diffContent));
                console.assert(isFinite(diffSize));

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
        .filter(fset => fset.problem || fset.warning)
        .map(fset => {
            if (fset.run) {
                fset.runURL = path.relative(stylesRoot, fset.run);
            }
            if (fset.ref) {
                fset.refURL = path.relative(stylesRoot, fset.ref);
            }
            return fset;
        })

    // Show the problem list
    for (const fset of uniqueFiles) {
        if (fset.problem) {
            console.error(`${p_ko}: ${fset.key} ${fset.problemText}`);
        } else if (fset.warning) {
            console.warn(`${p_warn}: ${fset.key} ${fset.warningText}`);
        } else {
            console.info(`${p_ok}: ${fset.key}`);
        }
    }

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
        fs.mkdirSync(stylesRoot, { recursive: true });
        fs.writeFileSync(path.join(stylesRoot, 'styles.json'), JSON.stringify(problemsList, null, 2));
        if (problemsList.filter(fset => fset.problem).length > 0) {
            console.error(p_ko, 'some tests did fail');
            process.exit(1);
        }
    }
    console.info(p_ok, 'ok');
    process.exit(0);
})();