/*eslint-env node */

module.exports = {
  root: true,
  extends: ["eslint:recommended", "plugin:jsdoc/recommended"],
  env: {
    es6: true,
    browser: true
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    requireConfigFile: false
  },
  plugins: ["jsdoc", "@typescript-eslint"],
  settings: {
    jsdoc: {
      mode: "typescript"
    }
  },
  rules: {
    "no-unused-vars": [
      "error",
      {
        vars: "local",
        varsIgnorePattern: "^_",
        argsIgnorePattern: "^_"
      }
    ],
    "no-console": [
      "error",
      {
        allow: ["warn", "error", "info", "assert"]
      }
    ],
    "no-warning-comments": "off",
    "quote-props": ["warn", "as-needed"],
    "jsdoc/tag-lines": "off"
  }
};
