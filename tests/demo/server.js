

const express = require('express');
const serveIndex = require('serve-index');
const hotReloadingProxy = require('hot-reloading-proxy/server.js');

const app = express();

app.use('/static', express.static('www/static'));
app.use('/', express.static('.'));
app.use('/', serveIndex('.'));

const listener = app.listen(5558, function () {
    const demoPort = listener.address().port;
    console.info(`Example app listening on port ${demoPort}!`);
    console.info(`http://localhost:${demoPort}/tests/demo/`);

    hotReloadingProxy.start({
        port: 5557,
        remote: `http://localhost:${demoPort}`,
        watch: ['app', 'www/static', 'tests/demo'],
        // logLevel: 10
    }).then((realHotPort) => {
        console.info(`Hot reloading proxy listening on port ${realHotPort}!`);
        console.info(`http://localhost:${realHotPort}/tests/demo/`);
    });
});
