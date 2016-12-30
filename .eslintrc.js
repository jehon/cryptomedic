module.exports = {
  "extends": "eslint:recommended",
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "browser",
    "ecmaFeatures": {
      "impliedStrict": true
    }
  },
  "env": {
    "browser": true,
    "es6":     true,
    "jasmine": true
  },
  "rules": {
    "indent": [
        2,
        2,
        { "SwitchCase": 1 }
    ],
    "no-console": [ "off" ],
    "no-undef": [ "warn" ],
    "no-unused-vars": [ "warn" ],
  },
  "globals": {
    "Polymer": true,
    "cryptomedic": true,
    "getDataService": true
  }
}
