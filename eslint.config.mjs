import globals from "globals";
import parser from "@typescript-eslint/parser";
import eslintPlugin from "@typescript-eslint/eslint-plugin";

export default [
  {
    files: ['**/*.{ts,tsx}'],
    ignores: ["src/**/*.test.ts", "src/frontend/generated/*", "*.config.js"],
    rules: {
      "@typescript-eslint/no-var-requires": "off",
      "@typescript-eslint/strict-boolean-expressions": "off",
      "@typescript-eslint/no-empty-interface": 0
    },
    plugins:{
      "@typescript-eslint": eslintPlugin
    },
    languageOptions: {
        globals: globals.browser,
        parser: parser,
        parserOptions: {
          project: "./tsconfig.json",
        },
      },
    },
];