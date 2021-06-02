#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');
const resemble = require('node-resemble-js');
const chalk = require('chalk');

const p_ok = chalk.green(' ✓ ');
const p_warn = chalk.yellow(' ? ');
const p_ko = chalk.red('✗  ');

const opts = require('yargs/yargs')(process.argv.slice(2))
    .option('module', {
        alias: 'm',
        type: 'string',
        choices: ['desktop', 'mobile']
    })
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
const configs = [];
if (!opts.module || opts.module == 'desktop') {
    console.info(chalk.yellow('Adding desktop config'));
    configs.push(
        {
            mode: 'desktop',
            refPath: path.join('references', 'desktop'),
            runPath: path.join('..', '..', 'tmp', 'e2e', 'desktop', 'screenshots')
        });
}
if (!opts.module || opts.module == 'mobile') {
    console.info(chalk.yellow('Adding mobile config'));
    configs.push({
        mode: 'mobile',
        refPath: path.join('references', 'mobile'),
        runPath: path.join('..', '..', 'tmp', 'e2e', 'mobile', 'screenshots')
    });
}

(async function () {
    function real(p) {
        return path.join(__dirname, p);
    }

    const listOfFiles = [];
    for (const cfg of configs) {
        // Add the ref
        glob.sync('**/*.png', { cwd: real(cfg.refPath) }).map(f => listOfFiles.push({
            ...cfg,
            key: cfg.mode + '#' + path.basename(f),
            name: path.basename(f),
            ref: path.join(cfg.refPath, f)
        }));

        // Add the run
        glob.sync('**/*.png', { cwd: real(cfg.runPath) }).map(f => listOfFiles.push({
            ...cfg,
            key: cfg.mode + '#' + path.basename(f),
            name: path.basename(f),
            run: path.join(cfg.runPath, f)
        }));
    }

    // Combine all results => { fk1: f1+f1, fk2: f2 } => [ f1 f2 f3 ]
    const uniqueFiles = Object.values(listOfFiles.reduce((acc, val) => {
        acc[val.key] = {
            ...acc[val.key],
            ...val
        };
        // Object.assign({}, acc[val.key], val);
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
        await new Promise((resolve) => resemble(real(fset.run))
            .compareTo(real(fset.ref))
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

    const problemsList = uniqueFiles.filter(fset => fset.problem || fset.warning);

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
            const dest = fset.ref ? fset.ref : path.join(fset.refPath, fset.name);
            process.stdout.write(`> ${fset.mode}/${fset.name}\n`);
            fs.copyFileSync(real(fset.run), real(dest));
        }
        if (!success) {
            console.error(p_ko, 'Problem');
            process.exit(1);
        }
    } else {
        fs.writeFileSync(path.join(__dirname, '../../tmp/styles.json'), JSON.stringify(problemsList, null, 2));
        if (problemsList.filter(fset => fset.problem).length > 0) {
            console.error(p_ko, 'some tests did fail');
            process.exit(1);
        }
    }
    console.info(p_ok, 'ok');
    process.exit(0);
})();