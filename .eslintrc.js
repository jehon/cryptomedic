module.exports = {
    "env": {
        "node": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "rules": {
        "indent":          [ "error", "tab", { "SwitchCase": 1 } ],
        "linebreak-style": [ "error", "unix" ],
        "quotes":          [ "error", "single" ],
        "semi":            [ "error", "always" ],
        "no-unused-vars":  [ "error", { "vars": "local", "argsIgnorePattern": "^_" }],
		"no-console":      [ "error", { "allow": [ "info", "warn", "error" ]}],
		"no-warning-comments": "warn"
    }
}
