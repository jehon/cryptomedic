/* eslint-env node */

import browserslist from "browserslist";
import HtmlWebpackPlugin from "html-webpack-plugin";
import child_process from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import url from "node:url";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

const webRoot = path.join(__dirname, "/www/");
const frontendRoot = path.join(webRoot, "/built");
// TODO: flattern this a bit
const webBuildRoot = "/built/frontend";
const builtRoot = path.join(frontendRoot, "frontend");

fs.rmSync(builtRoot, { force: true, recursive: true });
fs.mkdirSync(builtRoot, { recursive: true });
fs.copyFileSync(
  path.join(__dirname, "src/build.htaccess"),
  path.join(frontendRoot, ".htaccess")
);

const browsers = browserslist();
fs.writeFileSync(
  path.join(frontendRoot, "browsers.json"),
  JSON.stringify(browsers)
);

fs.writeFileSync(
  path.join(frontendRoot, "release_version.txt"),
  JSON.stringify(
    {
      date: new Date().toISOString(),
      git: child_process
        .execSync("git rev-parse HEAD", { encoding: "UTF8" })
        .trim()
    },
    null,
    2
  )
);

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
    static: path.join(__dirname, "/src/app-static/main.js")
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
      template: path.join(__dirname, "src/app-static/index.html"),
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
