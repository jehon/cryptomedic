/*eslint-env node */

module.exports = {
    env: {
        node: false,
        es6: true,
        browser: true
      },
      plugins: ["@typescript-eslint"],
      settings: {
        jsdoc: {
          mode: "typescript"
        }
      }    
}
