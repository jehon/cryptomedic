/* eslint-env node */

import path from "node:path";
import url from "node:url";

import fse from "fs-extra";
import HtmlWebpackPlugin from "html-webpack-plugin";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

const webRoot = path.join(__dirname, "/www/");
const webBuildRoot = "/built/frontend";
const builtRoot = path.join(webRoot, webBuildRoot);

fse.emptyDirSync(builtRoot);

const isDebug = process.env.CRYPTOMEDIC_DEV ?? false;
if (isDebug) {
  console.info("Webpack mode: development");
} else {
  console.info("Webpack mode: production");
}

export default {
  // https://webpack.js.org/guides/development/
  mode: isDebug ? "development" : "production",
  entry: {
    ng1x: path.join(__dirname, "/legacy/app-old/main.js"),
    static: path.join(__dirname, "/legacy/app-static/main.js")
  },
  output: {
    path: builtRoot,
    filename: "[name]-[fullhash].js",
    // https://stackoverflow.com/a/36308143/1954789
    publicPath: webBuildRoot
  },
  resolve: {
    extensions: [".ts", ".js", ".tsx"]
  },
  devServer: {
    // static: "./www/",
    proxy: {
      // TODO: use ${CRYPTOMEDIC_DEPLOY_WEB_PORT}
      "/": "http://localhost:8085"
    },
    hot: true
  },
  devtool: isDebug ? "eval" : false,
  optimization: {
    // https://webpack.js.org/configuration/optimization/#optimizationmoduleids
    moduleIds: "deterministic"
    // runtimeChunks: "single"
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "legacy/app-old/index.html"),
      filename: path.join(builtRoot, "ng1x.html"),
      inject: "head",
      xhtml: true,
      chunks: ["ng1x"]
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "legacy/app-static/index.html"),
      filename: path.join(webRoot, "index.html"),
      inject: "head",
      xhtml: true,
      chunks: ["static"]
    })
  ],
  module: {
    rules: [
      // {
      //   test: /\.css$/,
      //   type: "asset/inline"
      // },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          }
        ]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|svg|jpg|gif)$/,
        type: "asset"
      },
      {
        test: /\.tsx?/,
        use: [{ loader: "ts-loader" }]
      }
    ]
  }
};
