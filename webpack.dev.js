"use strict";

var path = require("path");
var webpack = require("webpack");
var base_config = require("./webpack.js");

// base_config.entry.push('webpack-dev-server/client?/');
// base_config.entry.push('webpack/hot/only-dev-server');
// base_config.module.loaders[0].loaders.push('react-hot');
base_config.plugins.push(new webpack.HotModuleReplacementPlugin());

module.exports = base_config;
