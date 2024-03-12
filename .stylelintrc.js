export default {
  extends: "stylelint-config-standard",
  ignoreFiles: ["www/api/**/*"],
  plugins: ["stylelint-no-unsupported-browser-features"],
  rules: {
    "declaration-block-no-redundant-longhand-properties": null,
    "declaration-empty-line-before": null,
    "media-feature-range-notation": [ "prefix" ],
    "no-descending-specificity": null,
    "selector-type-no-unknown": [true, { ignore: "custom-elements" }],
    "plugin/no-unsupported-browser-features": [true, {
      // TODO: remove this
      "ignore": [ "css-nesting" ]
    }],
    "no-empty-source": null
  }
};
