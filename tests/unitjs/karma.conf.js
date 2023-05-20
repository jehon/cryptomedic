/* eslint-env node */
/* eslint no-console: off */

const path = require("path");
const fse = require("fs-extra");
const root = path.dirname(path.dirname(__dirname));
fse.emptyDirSync(path.join(root, "/tmp/js"));

// https://blog.cepharum.de/en/post/natively-unit-testing-es6-modules-in-browser-including-coverage.html

module.exports = function (config) {
  const configuration = {
    basePath: root,

    frameworks: ["jasmine", "jasmine-html"],

    plugins: ["karma-*"],

    files: [
      "node_modules/karma-read-json/karma-read-json.js",
      "node_modules/bootstrap4/dist/css/bootstrap.min.css",
      { pattern: "tests/unitjs/*-test.js", type: "module" },
      { pattern: "tests/unitjs/**", included: false },
      { pattern: "**/*", included: false, watched: false }
    ],

    autoWatch: true,

    browsers: [
      // 'FirefoxHeadless'
      "ChromeHeadlessNoSandbox"
    ],

    // https://github.com/karma-runner/karma-firefox-launcher/issues/76
    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: "ChromeHeadless",
        flags: ["--no-sandbox"]
      },
      FirefoxHeadless: {
        base: "Firefox",
        flags: ["-headless"]
      }
    },

    preprocessors: {},

    proxies: {
      "/static/": "/base/www/static/",
      "/resources/": "/base/resources/"
    }
  };

  config.set(configuration);
};
