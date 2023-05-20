module.exports = {
  root: true,
  extends: ["eslint:recommended", "plugin:jsdoc/recommended"],
  env: {
    node: true,
    es6: true,
    browser: true
  },
  // parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    requireConfigFile: false
  },
  plugins: ["jsdoc"],
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
