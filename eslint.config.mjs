import eslint from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import angularEslint from "angular-eslint";

export default tseslint.config(
  { ignores: ["dist/**", "*.config.ts"] },
  {
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommendedTypeChecked,
      ...tseslint.configs.strictTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
      ...angularEslint.configs.tsRecommended,
    ],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    processor: angularEslint.processInlineTemplates,
    rules: {
      semi: "error",
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/array-type": ["error", { default: "array" }],
      "@typescript-eslint/restrict-template-expressions": [
        "error",
        { allowNumber: true },
      ],
      "@angular-eslint/directive-selector": [
        "error",
        {
          type: "attribute",
          prefix: "app",
          style: "camelCase",
        },
      ],
      "@angular-eslint/component-selector": [
        "error",
        {
          type: "element",
          prefix: "app",
          style: "kebab-case",
        },
      ],
    },
  },
  {
    files: ["**/*.js"],
    extends: [eslint.configs.recommended, ...tseslint.configs.recommended],
    rules: {
      semi: "error",
    },
  },
  {
    files: ["**/*.html"],
    extends: [
      ...angularEslint.configs.templateRecommended,
      ...angularEslint.configs.templateAccessibility,
    ],
  },
  eslintPluginPrettierRecommended,
);
