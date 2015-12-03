var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.dev.js');

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
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
    '/cryptomedic/app/*': {
      target: 'http://localhost',
      secure: false,
    },
    '/cryptomedic/cache/*': {
      target: 'http://localhost',
      secure: false,
    }
  }
}).listen(8080, '0.0.0.0', function (err) {
  if (err) {
    console.log(err);
  }

  console.log('Listening at 0.0.0.0:8080');
});
