/* eslint-env node */

const path = require("path");
const fs = require("fs");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const fse = require("fs-extra");

const released_version = new Date().toISOString();

const builtRoot = path.join(__dirname, "/www/built");

fse.emptyDirSync(builtRoot);
fs.writeFileSync(path.join(builtRoot, "release_version.txt"), released_version);
fse.copy(
  path.join(__dirname, "app/build.htaccess"),
  path.join(builtRoot, ".htaccess")
);

const isDebug = !process.env.CRYPTOMEDIC_PROD ?? true;
if (isDebug) {
  console.info("Webpack mode: development");
} else {
  console.info("Webpack mode: production");
}

module.exports = {
  mode: isDebug ? "development" : "production",
  entry: path.join(__dirname, "/app/main.js"),
  output: {
    path: builtRoot,
    filename: "[name]-[fullhash].js"
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "app/index-template.html"),
      filename: path.join(builtRoot, "index.html"),
      inject: "head",
      xhtml: true
    })
  ],
  module: {
    rules: [
      { test: /\.css/, use: ["style-loader", "css-loader"] },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|svg|jpg|gif)$/,
        type: "asset"
      }
    ]
  },
  optimization: {
    // https://webpack.js.org/configuration/optimization/#optimizationmoduleids
    moduleIds: "deterministic"
  }
};
