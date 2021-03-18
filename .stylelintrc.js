module.exports = {
  "extends": "stylelint-config-standard",
  "ignoreFiles": ["www/api/**/*"],
  "rules": {
    "indentation": "tab",
    "selector-type-no-unknown": [true, { "ignore": "custom-elements" }],
    "no-descending-specificity": null,
    "declaration-empty-line-before": null
  }
}
