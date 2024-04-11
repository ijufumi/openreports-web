import globals from "globals";
import parser from "@typescript-eslint/parser";

export default [
  {
    files: ['**/*.{ts,tsx}'],
    ignores: ["*.config.js", "**/*.config.js"],
    rules: {
      "@typescript-eslint/no-var-requires": "off",
    },
    languageOptions: {
        globals: globals.browser,
        parser: parser,
      },
    },
];