import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

import js from "@eslint/js";

const xoBrowserConfig = require("eslint-config-xo/browser");
const unicorn = require("eslint-plugin-unicorn");

const pImport = require("eslint-plugin-import");

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

  // import/recommended
  {
    plugins: {
      import: pImport,
    },
    rules: pImport.configs.recommended.rules,
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
      unicorn,
      import: pImport,
      jsdoc,
    },
  },
];
