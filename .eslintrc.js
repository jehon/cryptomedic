module.exports = {
  "extends": "eslint:recommended",
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": {
      "impliedStrict": true
    }
  },
  "env": {
    "browser": true,
    "es6":     true,
    "worker":  true,
    "jasmine": true
  },
  "rules": {
    "indent": [
        2,
        2,
        { "SwitchCase": 1 }
    ],
    // "linebreak-style": [
    //     2,
    //     "unix"
    // ],
    // "semi": [
    //     2,
    //     "always"
    // ],
    "no-console": [ "warn" ],
    "no-undef": [ "warn" ],
    "no-unused-vars": [ "warn" ],
    // "comma-dangle": [ "off" ]
  // },
  // "globals": {
  //   // "console": true,
    // "jQuery": true,
  //   "describe": true,
  //   "it": true,
  //   "expect": true
  }
}
