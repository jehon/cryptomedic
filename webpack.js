'use strict';

require('es6-promise').polyfill();

var path = require('path');
var webpack = require('webpack');
var glob = require('glob');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var scriptLoader = require('script-loader');

// https://github.com/petehunt/webpack-howto

// Global variables
// https://webpack.github.io/docs/library-and-externals.html
// https://webpack.github.io/docs/shimming-modules.html
// https://github.com/webpack/expose-loader

module.exports = {
  entry: []
    .concat([
      './app/bower_components/jquery-ui/themes/ui-lightness/jquery-ui.min.css',
      './app/bower_components/bootstrap/dist/css/bootstrap.min.css'
    ])
    .concat(glob.sync('./app/static/css/*.css'))
    .concat([
      './app/status.js',
      // './app/static/js/bugreporting.js',
      // './app/static/js/html2canvas.js',
      // './node_modules/angular/angular.min.js',
      // './node_modules/angular-route/angular-route.min.js',
      // './node_modules/excellentexport/excellentexport.min.js',
      // './node_modules/dexie/dist/latest/Dexie.min.js',
      // './node_modules/whatwg-fetch/fetch.js',
      // './node_modules/bootstrap/dist/css/bootstrap.min.css',
      // './node_modules/bootstrap/dist/js/bootstrap.min.js',
      // './node_modules/jquery/dist/jquery.min.js',
      // './node_modules/jquery-ui/jquery-ui.js',
      // './node_modules/jquery-ui/themes/ui-lightness/jquery-ui.min.css',

      // './app/bower_components/jquery/dist/jquery.min.js',
      // './app/bower_components/jquery-ui/jquery-ui.min.js',
      // './app/bower_components/jquery-ui/themes/ui-lightness/jquery-ui.min.css',
      // './app/bower_components/bootstrap/dist/js/bootstrap.min.js',
      // './app/bower_components/bootstrap/dist/css/bootstrap.min.css',
      // './app/bower_components/angular/angular.min.js',
      // './app/bower_components/angular-route/angular-route.min.js',
      // './app/bower_components/fetch/fetch.js',
      // './app/bower_components/dexie/dist/latest/Dexie.min.js',
      // './app/bower_components/excellentexport/excellentexport.min.js',

      // './app/static/js/application.js',
      // './app/static/js/database.js',
      // './app/static/js/myfetch.js',
      // './app/static/js/cryptomedic.js',
      // './app/static/js/amd_stats_datas.js',
      // './app/static/js/exceptions.js',
      // './app/static/worker/worker.js',
    ])
    // .concat(glob.sync('./app/static/js/model_*.js'))
    // .concat(glob.sync('./app/static/js/service_*.js'))
    // .concat(glob.sync('./app/static/js/ctrl_*.js'))
    ,
  resolve: {
    extensions: ['', '.js', '.jsx'],
    modulesDirectories: ['node_modules', 'app'],
  },
  output: {
    path: path.join(__dirname, 'build/'),
    // filename: 'bundle.js',
    filename: 'bundle-[hash].js',
    chunkFilename: "[id].[hash].bundle.js",

    // @see https://webpack.github.io/docs/library-and-externals.html
    libraryTarget: "var",
    library: "appState"
  },
  module: {
    loaders: [
      // {
      //   test: /app\/static\/js/,
      //   loaders: [
      //     'script-loader',
      //   ]
      // },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loaders: [
          'babel-loader?sourceMaps=inline&optional=runtime',
        ]
      },
      {
        // https://webpack.github.io/docs/stylesheets.html
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.svg($|\?)|\.gif$|.png$/,
        loader: 'file-loader?name=img/[name].[ext]'
      },
      {
        test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)/,
        loader: 'file-loader?name=fonts/[name].[ext]'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'app/index.html', // Load a custom template
      inject: 'body' // Inject all scripts into the body
    })
  ]
};
