
exports.command = function (timestampStart) {
    this.getLog('browser', function (results) {
        results.forEach(result => console.info(`+${result.timestamp - timestampStart} [${result.level}] ${result.source}: ${result.message}`));
    });
};

