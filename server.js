var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.dev.js');

new WebpackDevServer(webpack(config), {
  // publicPath: config.output.publicPath,
  publicPath: '/cryptomedic/build',
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
    '/cryptomedic/api/*': {
      target: 'http://localhost',
      secure: false,
    },
    // '/cryptomedic/app/*': {
    //   target: 'http://localhost',
    //   secure: false,
    // },
    // '/cryptomedic/build/bower_components/*': {
    //   target: 'http://localhost',
    //   secure: false,
    // },
    // '/cryptomedic/build/static/*': {
    //   target: 'http://localhost',
    //   secure: false,
    // }
  }
}).listen(8080, '0.0.0.0', function (err) {
  if (err) {
    console.error(err);
  }

  console.info('Listening at 0.0.0.0:8080');
});
