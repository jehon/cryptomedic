'use strict';

var path = require('path');
var webpack = require('webpack');
var glob = require('glob');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var scriptLoader = require('script-loader');

// https://github.com/petehunt/webpack-howto

// Global variables
// https://webpack.github.io/docs/library-and-externals.html
// https://webpack.github.io/docs/shimming-modules.html

module.exports = {
  entry: []
    .concat(glob.sync('./app/static/css/*.css'))
    // .concat(glob.sync('./app/static/js/model_*.js'))
    // .concat(glob.sync('./app/static/js/service_*.js'))
    // .concat(glob.sync('./app/static/js/ctrl_*.js'))
    .concat([
      './app/main.js',
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
    ,
  resolve: {
    extensions: ['', '.js', '.jsx'],
    modulesDirectories: ['node_modules', 'app'],
  },
  output: {
    path: path.join(__dirname, 'app/build/'),
    filename: 'bundle.js',
    // filename: 'bundle-[hash].js',
    // chunkFilename: "[id].[hash].bundle.js"

    // @see https://webpack.github.io/docs/library-and-externals.html
    // export itself to a global var
    libraryTarget: "var",
    // name of the global var: "Foo"
    library: "bundle"

  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loaders: [
          'babel-loader?sourceMaps=inline&optional=runtime',
        ]
      },
      {
        test: /\.css$/,
        loader: 'file-loader?name=css/[name].[ext]'
      },
      // {
      //   test: /node_modules\/.*\.js$/,
      //   include: [
      //       path.resolve(__dirname,'node_modules/bootstrap/dist/js/'),
      //       path.resolve(__dirname,'node_modules/jquery/dist/')
      //   ],
      //   loader: 'file-loader?name=javascripts/[name].[ext]'
      // },
      {
        test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/,
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
