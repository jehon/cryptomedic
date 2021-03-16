
var vsconfig = require('./jsconfig.json');

module.exports = {
    root: true,
    extends: [
        'eslint:recommended',
        'plugin:jsdoc/recommended'
    ],
    env: {
        node: true,
        es6: true,
        browser: true
    },
    parser: 'babel-eslint',
    parserOptions: {
        ecmaVersion: vsconfig.compilerOptions.target.replace('es', ''),
        sourceType: 'module'
    },
    plugins: [
        'jsdoc'
    ],
    settings: {
        jsdoc: {
            mode: 'typescript'
        }
    },
    rules: {
        indent: [
            'error',
            4,
            {
                SwitchCase: 1
            }
        ],
        'linebreak-style': [
            'error',
            'unix'
        ],
        quotes: [
            'error',
            'single'
        ],
        semi: [
            'error',
            'always'
        ],
        'no-unused-vars': [
            'error',
            {
                vars: 'local',
                varsIgnorePattern: '^_',
                argsIgnorePattern: '^_'
            }
        ],
        'no-console': [
            'error',
            {
                allow: [
                    'warn',
                    'error',
                    'info',
                    'assert'
                ]
            }
        ],
        'no-trailing-spaces': [
            'error'
        ],
        'no-warning-comments': 'off',
        'quote-props': [
            'warn',
            'as-needed'
        ]
    }
};