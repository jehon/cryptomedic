module.exports = {
  "extends": "stylelint-config-standard",
  "ignoreFiles": ["www/api/**/*"],
  "plugins": [
    "stylelint-no-unsupported-browser-features"
  ],
  "rules": {
    "indentation": "tab",
    "selector-type-no-unknown": [true, { "ignore": "custom-elements" }],
    "no-descending-specificity": null,
    "declaration-empty-line-before": null,
    "plugin/no-unsupported-browser-features": true
  }
}
