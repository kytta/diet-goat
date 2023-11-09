import { createRequire } from "node:module";

import js from "@eslint/js";
import globals from "globals";
import jsdoc from "eslint-plugin-jsdoc";

const require = createRequire(import.meta.url);
const unicorn = require("eslint-plugin-unicorn");

/** @type {import("eslint").Linter.FlatConfig} */
export default [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2024,
      parserOptions: unicorn.configs.recommended.parserOptions,
    },
    plugins: {
      unicorn,
    },
    rules: unicorn.configs.recommended.rules,
  },
  jsdoc.configs["flat/recommended-typescript-flavor"],
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
