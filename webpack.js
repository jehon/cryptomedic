'use strict';

// offline-plugin

require('es6-promise').polyfill();

var path = require('path');
var webpack = require('webpack');
var glob = require('glob');
var HtmlWebpackPlugin = require('html-webpack-plugin');
// var scriptLoader = require('script-loader');
var recursiveReadSync = require('recursive-readdir-sync');
var fse = require('fs-extra');
var OfflinePlugin = require('offline-plugin');

// Always restart from a blank page
fse.emptyDirSync(__dirname + '/www/build/');

// Add files not managed by webpack
fse.copySync(__dirname + '/app/static/', __dirname + '/www/build/static');
var unmanaged = []
        .concat(glob('static/**', { sync: true, cwd: __dirname + '/www/build/' }))
        ;

// https://github.com/petehunt/webpack-howto

// Global variables
// https://webpack.github.io/docs/library-and-externals.html
// https://webpack.github.io/docs/shimming-modules.html
// https://github.com/webpack/expose-loader

// @see https://github.com/webpack/webpack-with-common-libs/blob/master/webpack.config.js
// @see http://mts.io/2015/04/08/webpack-shims-polyfills/

// test: jQuery('#busy').modal('show'); jQuery('#busy').datepicker()


var config = {
  entry: [ ]
    .concat([
      './node_modules/bootstrap/dist/css/bootstrap.css',
      './node_modules/jquery-ui/themes/ui-lightness/jquery-ui.css'
    ])
    .concat(glob.sync('./app/css/*.css'))
    .concat([
      'expose?jQuery!./node_modules/jquery/dist/jquery.js',
      './node_modules/jquery-ui/datepicker.js',
      './node_modules/angular/angular.js',
      './node_modules/angular-route/angular-route.min.js',
      './node_modules/html2canvas/dist/html2canvas.js',

      'script!./node_modules/excellentexport/excellentexport.min.js',
      './node_modules/bootstrap/dist/js/bootstrap.min.js',

      'script!./app/static/js/bugreporting.js',
    ])
    // Last one, since it will define what is exported:
    .concat([ './app/status.js' ])
    ,
  resolve: {
    extensions: ['', '.js', '.jsx'],
    modulesDirectories: [ 'node_modules', 'app' ],
    alias: {
      'jquery': 'jquery'
    }
  },
  output: {
    path: path.join(__dirname, 'www/build/'),
    // filename: 'bundle.js',
    filename: 'bundle-[hash].js',
    chunkFilename: '[id].[hash].bundle.js',

    // @see https://webpack.github.io/docs/library-and-externals.html
    libraryTarget: 'var',
    library: 'appState'
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
      {
        test: /\.html$/,
        loaders: [
          'ng-cache?-removeEmptyAttributes&prefix=templates:/**/api/v1.0/templates/',
        ]
      },
      {
        test: /\.php$/,
        loaders: [
          // /templates/templates/reports/surgery.php
          'ng-cache?-removeEmptyAttributes&prefix=templates:/**/api/v1.0/templates/',
          // 'html-minify',
          'php-loader?' + JSON.stringify({ proxy: __dirname + '/tests/router.php' })
        ]
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
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
      inject: false // Inject all scripts into the body
    }),
    new webpack.ProvidePlugin({
      'angular': 'angular'
    }),
    new OfflinePlugin({
      caches: {
        main: [].concat(unmanaged).concat([ ':rest:' ]),
        additionnal: [],
        optonal: []
      },
      scope: '/offline/',
      // relativePaths: true,
      // updateStragegy: 'all', // -> changed
      externals: unmanaged,
      excludes: [ '/api/*' ],
      ServiceWorker: {
        output: 'sw-offline.js'
      },
      AppCache: false
    })
  ]
};

var templates = recursiveReadSync(__dirname + '/www/templates/templates');
// for(var i in templates) {
//   // source: www/templates/templates/fiches/patient.php
//   // target: /api/v1.0/templates/fiches/patient
//   templates[i] = templates[i].replace('www/templates/', '/api/v1.0/');
// }
config.entry = config.entry.concat(templates);
config.entry = config.entry.concat([ './app/status.js' ]);

module.exports = config;
