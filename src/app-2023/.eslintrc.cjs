/*eslint-env node */

module.exports = {
    extends: "react-app",
    settings: {
      jsdoc: {
        mode: "typescript"
      }
    },
    rules: {
      "jsdoc/require-jsdoc": "off",
      "jsdoc/require-param": "off",
      "jsdoc/require-param-description": "off",
      "jsdoc/require-param-name": "off",
      "jsdoc/require-param-type": "off",
      "jsdoc/require-param-type-description": "off",
      "jsdoc/require-returns": "off",
    }
}
