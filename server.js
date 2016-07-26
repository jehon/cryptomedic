var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.dev.js');

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
      target: 'http://localhost:10080/',
      secure: false,
    },
    '/api/*': {
      target: 'http://localhost:10080/',
      secure: false,
    },
    '/static/*': {
      target: 'http://localhost:10080/',
      secure: false,
    },
    '/maintenance/*': {
      target: 'http://localhost:10080/',
      secure: false,
    },
  }
}).listen(8080, '0.0.0.0', function (err) {
  if (err) {
    console.error(err);
  }

  console.info('Listening at 0.0.0.0:8080');
});
