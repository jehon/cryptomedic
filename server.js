var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.dev.js');

var remoteTarget = config.personnal.remoteTarget; // configured and detected in webpack.js

new WebpackDevServer(webpack(config), {
  // publicPath: config.output.publicPath,
  publicPath: '/build/',
  hot: true,
  historyApiFallback: true,
  stats: {
    colors: true
  },
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  },
  proxy: {
    '/': {
      target: remoteTarget,
      secure: false,
    },
    '/api/*': {
      target: remoteTarget,
      secure: false,
    },
    '/bower_components/*': {
      target: remoteTarget,
      secure: false,
    },
    '/static/*': {
      target: remoteTarget,
      secure: false,
    },
    '/maintenance/*': {
      target: remoteTarget,
      secure: false,
    },
  }
}).listen(8080, '0.0.0.0', function (err) {
  if (err) {
    console.error(err);
  }

  console.info('Listening at 0.0.0.0:8080 and forwarding to ' + remoteTarget);
});
