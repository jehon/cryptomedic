/* eslint-env node */

const path = require('path');
const fs = require('fs');
var child_process = require('child_process');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fse = require('fs-extra');

const released_version = (new Date()).toISOString();

fse.emptyDirSync(__dirname + '/www/build');
fs.writeFileSync(__dirname + '/www/build/release_version.txt', released_version);
fs.writeFileSync(__dirname + '/www/build/release_version.js', `window.application_version = '${released_version}';`);
fse.copy(__dirname + '/app/build.htaccess', __dirname + '/www/build/.htaccess');

const isDebug = child_process.execSync('php config.php debug').toString() > 0;
if (isDebug) {
    console.info('Enabling debug/development mode in webpack');
}

module.exports = {
    mode: (isDebug ? 'development' : 'production'),
    entry: {
        app: path.join(__dirname, '/app/main.js'),
    },
    output: {
        path: path.join(__dirname, 'www/build/'),
        filename: '[name]-[chunkhash].js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'app/index-original.html'),
            filename: path.join(__dirname, 'www/build/index.html'),
            inject: false
        }),
        new webpack.HashedModuleIdsPlugin()
    ],
    module: {
        rules: [
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                loader: 'file-loader?name=[name]-[hash].[ext]'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    plugins: [
                        ['@babel/plugin-proposal-decorators', { decoratorsBeforeExport: true }],
                        '@babel/plugin-proposal-optional-chaining',
                        '@babel/plugin-proposal-nullish-coalescing-operator',
                        '@babel/plugin-proposal-class-properties'
                    ]
                }
            }
        ]
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },
};
