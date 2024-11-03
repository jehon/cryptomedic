// @ts-check

import eslint from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
const config = [
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.node
      }
    },
    rules: {
      "no-unused-vars": "off",
      "no-console": [
        "error",
        {
          allow: ["warn", "error", "info", "assert"]
        }
      ],
      "no-warning-comments": ["error", { terms: ["xxx", "no-commit"] }],
      "quote-props": ["warn", "as-needed"],
      "require-await": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          args: "all",
          argsIgnorePattern: "^_",
          caughtErrors: "all",
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          ignoreRestSiblings: true
        }
      ],
      "@typescript-eslint/no-explicit-any": "off"
    }
  },
  {
    files: ["tests/cypress/**"],
    // https://github.com/cypress-io/eslint-plugin-cypress/issues/155
    // See plugin:cypress/recommended
    languageOptions: {
      globals: {
        ...globals.browser,
        cy: true,
        context: true,
        Cypress: true,
        it: true,
        before: true,
        beforeEach: true
      }
    }
  },
  {
    files: ["legacy/**"],
    languageOptions: {
      globals: {
        ...globals.browser
      }
    },
    rules: {
      "@typescript-eslint/no-unused-vars": "off"
    }
  },
  {
    files: ["src/**"],
    languageOptions: {
      globals: {
        ...globals.browser
      }
    },
    rules: {
      "@typescript-eslint/no-unused-vars": "off"
    }
  },
  // https://github.com/eslint/eslint/issues/17400#issuecomment-1646873272
  // https://eslint.org/docs/latest/use/configure/configuration-files#globally-ignoring-files-with-ignores
  {
    ignores: [
      "**/built/**",
      "**/data/**/*",
      "**/documentation/**",
      "**/tmp/**",
      "vendor/**",
      "**/unused/**",
      "tests/cypress.config.cjs",
      "www/api"
    ]
  }
];

export default config;
