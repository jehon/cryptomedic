module.exports = {
  extends: "stylelint-config-standard",
  ignoreFiles: ["www/api/**/*"],
  plugins: ["stylelint-no-unsupported-browser-features"],
  rules: {
    "selector-type-no-unknown": [true, { ignore: "custom-elements" }],
    "no-descending-specificity": null,
    "declaration-empty-line-before": null,
    "plugin/no-unsupported-browser-features": true,
    "media-feature-range-notation": [ "prefix" ]
  }
};
