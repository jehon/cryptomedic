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

    /** import bare - begin */
    plugins: [require("@adobe/es-modules-middleware"), "karma-*"],

    middleware: ["es-modules"],

    esModulesMiddleware: {
      baseDir: "node_modules",
      paths: {
        "/": path.join(__dirname, "../../node_modules")
      }
    },
    /** import bare - end */

    reporters: [
      "progress",
      "coverage",
      "html",
      "junit",
      "kjhtml" // allow output in debug.html page
    ],

    files: [
      { pattern: "node_modules/bluebird/js/browser/bluebird.min.js" },
      "tests/unitjs/_global.js",
      "node_modules/karma-read-json/karma-read-json.js",
      "node_modules/bootstrap4/dist/css/bootstrap.min.css",
      { pattern: "tests/unitjs/*-test.js", type: "module" },
      { pattern: "tests/unitjs/**", included: false },
      { pattern: "app/**/*", included: false },
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

    preprocessors: {
      "app/*.js": ["coverage"],
      "app/!(cjs2esm)/**/*.js": ["coverage"],
      "src/*.js": ["coverage"],
      "src/!(cjs2esm)/**/*.js": ["coverage"]
    },

    coverageReporter: {
      dir: path.join(root, "tmp"),
      includeAllSources: true,
      reporters: [
        {
          type: "lcov",
          subdir: "js/"
        }
        /* { type: 'text-summary' } */
      ]
    },

    htmlReporter: {
      outputDir: path.join(root, "/tmp/js/html/")
    },

    junitReporter: {
      outputDir: "tmp/js/junit",
      useBrowserName: false,
      xmlVersion: 1
    },

    proxies: {
      "/static/": "/base/www/static/",
      "/resources/": "/base/resources/"
    }
  };

  if (process.env.NOCOV) {
    console.info("*** NOCOV: disable coverage ***");
    for (const i in configuration.preprocessors) {
      configuration.preprocessors[i] = configuration.preprocessors[i].filter(
        (v) => v != "coverage"
      );
    }
  } else {
    console.info("*** Coverage enabled - disable it with NOCOV");
  }

  config.set(configuration);
};
