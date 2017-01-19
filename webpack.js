/* eslint-env node */
/* eslint no-console: off */

var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var recursiveReadSync = require('recursive-readdir-sync');
var remoteTarget = require(__dirname + '/bin/lib/vagrantPort');

// Global variables
// https://webpack.github.io/docs/library-and-externals.html
// https://webpack.github.io/docs/shimming-modules.html
// https://github.com/webpack/expose-loader

// @see https://github.com/webpack/webpack-with-common-libs/blob/master/webpack.config.js
// @see http://mts.io/2015/04/08/webpack-shims-polyfills/

var config = {
  personnal: {
    remoteTarget: remoteTarget, // Custom entry - exported for server.js
  },
  entry: [ ]
    .concat([
      // 'script!./node_modules/excellentexport/excellentexport.min.js',
      './app/mainApp.js'
    ])
    // Last one, since it will define what is exported:
    // Added at the end of the config file
    // .concat([ './app/status.js' ])
    ,
  resolve: {
    extensions: ['', '.js', '.jsx'],
    modulesDirectories: [ 'node_modules', 'app' ],
  },
  output: {
    path: path.join(__dirname, 'www/build/'),
    filename: 'bundle-[hash].js',
    chunkFilename: '[id].[hash].bundle.js',
    publicPath: '/build/',

    // @see https://webpack.github.io/docs/library-and-externals.html
    libraryTarget: 'var',
    library: 'appState',
    pathinfo: false // Not in production
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loaders: [
          'babel-loader?sourceMaps=inline&optional=runtime'
        ]
      },
      // {
      //   test: /\.html$/,
      //   exclude: /index\.html/,
      //   loaders: [
      //     'ng-cache?-removeEmptyAttributes&prefix=templates:/**/api/v1.0/templates/',
      //   ]
      // },
      // {
      //   test: /\.php$/,
      //   loaders: [
      //     // file looks like: /templates/templates/reports/surgery.php
      //     'ng-cache?-removeEmptyAttributes&prefix=templates:/**/api/v1.0/templates/',
      //     // 'html-minify',
      //     'php-loader?' + JSON.stringify({
      //       proxy: __dirname + '/loader.php',
      //       args: [ '--httplive=' + remoteTarget ],
      //       dependancies: [
      //         __dirname + '/www/api/v1.0/app/**/*.php',
      //         __dirname + '/www/templates/**/*.php'
      //       ],
      //       debug: true
      //     })
      //   ]
      // },
      {
        test: /\.css$/,
        loaders: ['style', 'css']
      },
      {
        test: /\.less$/,
        loaders: ['style', 'css', 'less']
      },
      {
        test: /\.svg($|\?)|\.jp(e)?g|\.gif$|.png$/,
        loaders: [
          'file-loader?name=img/[name].[ext]'
        ]
      },
      {
        test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)/,
        loaders: [
          'file-loader?name=fonts/[name].[ext]'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'app/index.html', // Load a custom template
      inject: 'head' // Inject all scripts into the head
    })
  ]
};

// var templates = recursiveReadSync(__dirname + '/www/templates/templates');
// config.entry = config.entry.concat(templates);

// Last one, since it will define what is exported:
config.entry = config.entry.concat([ './app/status.js' ]);

module.exports = config;
