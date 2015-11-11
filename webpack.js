'use strict';

var path = require('path');
var webpack = require('webpack');
var glob = require('glob');

module.exports = {
  entry: [
      './node_modules/angular/angular.min.js',
      './node_modules/angular-route/angular-route.min.js',
      './node_modules/excellentexport/excellentexport.min.js',
      './node_modules/dexie/dist/latest/Dexie.min.js',
      './node_modules/whatwg-fetch/fetch.js',
      './node_modules/bootstrap/dist/css/bootstrap.min.css',
      './node_modules/bootstrap/dist/js/bootstrap.min.js',
      './node_modules/jquery/dist/jquery.min.js',
      './node_modules/jquery-ui/jquery-ui.js',
      './node_modules/jquery-ui/themes/ui-lightness/jquery-ui.min.css',
      './app/static/js/application.js',
      './app/static/js/database.js',
      './app/static/js/myfetch.js',
      './app/static/js/cryptomedic.js',
      './app/static/js/amd_stats_datas.js',
      './app/static/js/exceptions.js',
    ]
    .concat(glob.sync('./app/static/js/model_*.js'))
    .concat(glob.sync('./app/static/js/service_*.js'))
    .concat(glob.sync('./app/static/js/ctrl_*.js'))
    .concat(glob.sync('./app/static/css/*.css'))
    ,
  resolve: {
    extensions: ['', '.js', '.jsx'],
    modulesDirectories: ['node_modules', 'app'],
  },
  output: {
    path: path.join(__dirname, 'app/build'),
    filename: 'bundle.js'
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
      {
        test: /\.js$/,
        include: [path.resolve(__dirname,'node_modules/bootstrap/dist/js/'),
                  path.resolve(__dirname,'node_modules/jquery/dist/')],
        loader: 'file-loader?name=javascripts/[name].[ext]'
      },
      {
        test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/,
        loader: 'file-loader?name=fonts/[name].[ext]'
      }
    ]
  },
  plugins: []
};
