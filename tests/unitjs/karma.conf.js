/* eslint-env node */
/* eslint no-console: off */

const path = require("path");
const fse = require("fs-extra");
const root = path.dirname(path.dirname(__dirname));
fse.emptyDirSync(path.join(root, "/tmp/frontend"));

// https://blog.cepharum.de/en/post/natively-unit-testing-es6-modules-in-browser-including-coverage.html

module.exports = function (config) {
  const configuration = {
    basePath: root,

    frameworks: ["jasmine", "jasmine-html"],

    /**
     * import bare - begin
     * @see https://www.npmjs.com/package/@adobe/es-modules-middleware
     */
    plugins: ["karma-*", require("@adobe/es-modules-middleware")],

    middleware: ["es-modules"],

    esModulesMiddleware: {
      baseDir: "node_modules",
      paths: {
        "/": path.join(__dirname, "../../node_modules")
      }
    },
    /** import bare - end */

    files: [
      "node_modules/karma-read-json/karma-read-json.js",
      "node_modules/bootstrap4/dist/css/bootstrap.min.css",
      { pattern: "tests/unitjs/**/*-test.js", type: "module" },
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
