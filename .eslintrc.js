module.exports = {
  parser: "@typescript-eslint/parser",
  extends: ["prettier"],
  plugins: ["@typescript-eslint", "prettier", "unused-imports"],
  rules: {
    "prettier/prettier": ["error"],
    "no-console": ["off"],
    "@typescript-eslint/no-useless-constructor": ["error"],
    "@typescript-eslint/no-unused-vars": "off", // Turn off the base rule
    "unused-imports/no-unused-imports": "error", // Auto-fixable unused imports
    "unused-imports/no-unused-vars": [
      "error",
      {
        vars: "all",
        varsIgnorePattern: "^_",
        args: "after-used",
        argsIgnorePattern: "^_",
      },
    ],
    "@typescript-eslint/no-empty-function": ["error", {}],
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
    ecmaFeatures: {
      modules: true,
    },
  },
};
