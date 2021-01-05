
const path = require('path');
const parse = require('lcov-parse');

const filename = path.join(__dirname, '../tmp/js/lcov.info');

function i(f, what) {
    if (f[what].hit == f[what].found) {
        return ''.padStart(10);
    }
    return (
        what[0] + ': ' +
        ('' + f[what].hit)
        + '/'
        + ('' + f[what].found)).padEnd(10);
}

parse(filename, function (err, data) {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    data.forEach(f => {
        if (f.branches.hit == f.branches.found
            && f.lines.hit == f.lines.found
            && f.functions.hit == f.functions.found
        ) {
            return;
        }

        process.stdout.write(` ${i(f, 'lines')} ${i(f, 'branches')} ${i(f, 'functions')} ${f.file.padEnd(35)} - `);
        const details = [].concat(f.lines.details, f.branches.details, f.functions.details);

        var collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' });

        const lines = Array.from(new Set(details.map(v => v.line))).sort(collator.compare);
        if (lines.length < 10) {
            process.stdout.write(lines.join(' '));
        } else {
            process.stdout.write(lines.slice(0, 10).join(' ') + ' ...');
        }
        process.stdout.write('\n');
    });
});
