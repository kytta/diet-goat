import js from "@eslint/js";
import globals from "globals";
import jsdoc from "eslint-plugin-jsdoc";

/** @type {import("eslint").Linter.FlatConfig} */
export default [
  jsdoc.configs["flat/recommended-typescript-flavor"],
  js.configs.recommended,
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
    },
  },
];
