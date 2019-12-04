
module.exports = {
    "extends": "eslint:recommended",
    "env": {
        "node": true,
        "es6": true
	},
    "rules": {
        "indent":          [ "error", "tab", { "SwitchCase": 1 } ],
        "linebreak-style": [ "error", "unix" ],
        "quotes":          [ "error", "single" ],
        "semi":            [ "error", "always" ],
        "no-unused-vars":  [ "error", { "vars": "local", "argsIgnorePattern": "^_" }],
		"no-console":      [ "error", { "allow": [ "info", "warn", "error", "assert" ]}],
		// "no-warning-comments": "warn"
		"no-warning-comments": "off"
    }
}
