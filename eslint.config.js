import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

import js from "@eslint/js";

const xoBrowserConfig = require("eslint-config-xo/browser");
const unicorn = require("eslint-plugin-unicorn");

import jsdoc from "eslint-plugin-jsdoc";
import globals from "globals";

/** @type {import("eslint").Linter.FlatConfig} */
export default [
  // eslint/recommended
  {
    ...js.configs.recommended,
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
  },

  // xo/browser
  {
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
    rules: xoBrowserConfig.rules,
  },

  // unicorn/recommended
  {
    plugins: {
      unicorn,
    },
    rules: unicorn.configs.recommended.rules,
  },

  // jsdoc/recommended
  jsdoc.configs["flat/recommended-typescript-flavor"],

  // my overrides
  {
    files: ["index.js"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
      },
    },
    plugins: {
      jsdoc,
      unicorn,
    },
  },
];
