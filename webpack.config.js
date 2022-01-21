/* eslint-env node */

const path = require('path');
const fs = require('fs');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const fse = require('fs-extra');

const released_version = (new Date()).toISOString();

fse.emptyDirSync(__dirname + '/www/build');
fs.writeFileSync(__dirname + '/www/build/release_version.txt', released_version);
fs.writeFileSync(__dirname + '/www/build/release_version.js', `window.application_version = '${released_version}';`);
fse.copy(__dirname + '/app/build.htaccess', __dirname + '/www/build/.htaccess');

const isDebug = (!process.env.CRYPTOMEDIC_PROD) ?? true;
if (isDebug) {
    console.info('Webpack mode: development');
} else {
    console.info('Webpack mode: production');
}

module.exports = {
    mode: (isDebug ? 'development' : 'production'),
    entry: path.join(__dirname, '/app/main.js'),
    output: {
        path: path.join(__dirname, 'www/build/'),
        filename: '[name]-[fullhash].js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'app/index-template.html'),
            filename: path.join(__dirname, 'www/build/index.html'),
            inject: 'head',
            xhtml: true
        })
    ],
    module: {
        rules: [
            { test: /\.css/, use: ['style-loader', 'css-loader'] },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|svg|jpg|gif)$/,
                type: 'asset'
                // options: {
                //     name: '[name]-[contenthash].[ext]'
                // }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        ['@babel/preset-env']
                    ],
                    plugins: [
                        '@babel/plugin-proposal-optional-chaining',
                        '@babel/plugin-proposal-nullish-coalescing-operator',
                        '@babel/plugin-proposal-class-properties'
                    ]
                }
            }
        ]
    },
    optimization: {
        moduleIds: 'deterministic',
        // splitChunks: {
        //     chunks: 'all',
        // },
    },
};
