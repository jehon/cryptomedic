

const express = require('express');
const morgan = require('morgan');
const hotReloadingProxy = require('hot-reloading-proxy/server.js');

const app = express();

// https://github.com/expressjs/morgan
app.use(morgan('tiny'));

app.use('/static', express.static('www/static'));
app.use('/', express.static('.'));

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

