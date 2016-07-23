'use strict';

var path = require('path');
var webpack = require('webpack');
var glob = require('glob');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var recursiveReadSync = require('recursive-readdir-sync');
var fse = require('fs-extra');
var OfflinePlugin = require('offline-plugin');

// Always restart from a blank page
fse.emptyDirSync(__dirname + '/www/build/');

// Add files not managed by webpack
var unmanaged = []
        .concat(glob('static/**', { sync: true, cwd: __dirname + '/www/' }))
        ;

// https://github.com/petehunt/webpack-howto

// Global variables
// https://webpack.github.io/docs/library-and-externals.html
// https://webpack.github.io/docs/shimming-modules.html
// https://github.com/webpack/expose-loader

// @see https://github.com/webpack/webpack-with-common-libs/blob/master/webpack.config.js
// @see http://mts.io/2015/04/08/webpack-shims-polyfills/

var config = {
  entry: [ ]
    .concat([
      './node_modules/bootstrap/less/bootstrap.less',
      './node_modules/jquery-ui/themes/base/base.css',
      './node_modules/jquery-ui/themes/base/datepicker.css'
    ])
    .concat(glob.sync('./app/css/*.css'))
    .concat([
      'expose?jQuery!./node_modules/jquery/dist/jquery.js',
      './node_modules/jquery-ui/ui/widgets/datepicker.js',
      './node_modules/angular/angular.js',
      './node_modules/angular-route/angular-route.min.js',
      './node_modules/html2canvas/dist/html2canvas.js',

      'script!./node_modules/excellentexport/excellentexport.min.js',
      './node_modules/bootstrap/dist/js/bootstrap.min.js',

      // 'script!./app/static/js/bugreporting.js',
      './app/mainApp.js'
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
        exclude: /index\.html/,
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
          'php-loader?' + JSON.stringify({
            proxy: __dirname + '/loader.php',
            //args: [ '--httplive=http://localhost:1080/' ],
            dependancies: [
              __dirname + '/www/api/v1.0/app/**/*.php',
              __dirname + '/www/templates/**/*.php'
            ],
            debug: true
          })
        ]
      },
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
      // // relativePaths: true,
      // // updateStragegy: 'all', // -> changed
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

config.entry = config.entry.concat(templates);
config.entry = config.entry.concat([ './app/status.js' ]);

module.exports = config;
