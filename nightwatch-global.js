
let stopWeb;

module.exports = {
    // External before hook is ran at the beginning of the tests run, before creating the Selenium session
    before: function(done) {
        require('kill-by-port').killByPort(4444);

        const startServer = require('./bin/server.js')
        stopWeb = startServer(5556);
        done();
    },

    after: function() {
        stopWeb();
    }
}
