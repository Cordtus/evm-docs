// eslint.config.mjs

import { dirname } from "path";
import { fileURLToPath } from "url";

import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  
  // Add custom rule configurations
  {
    rules: {
      // TypeScript-specific rules
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_", "varsIgnorePattern": "^_" }],
      "@typescript-eslint/ban-ts-comment": ["warn", { "ts-ignore": "allow-with-description" }],
      "@typescript-eslint/no-non-null-assertion": "warn",
      "@typescript-eslint/no-empty-interface": "warn",
      
      // React-specific rules
      "react/no-unescaped-entities": "off",
      "react/display-name": "off",
      "react/prop-types": "off", // Not needed with TypeScript
      "react/react-in-jsx-scope": "off", // Not needed in Next.js
      
      // Next.js specific
      "@next/next/no-img-element": "warn", // Prefer next/image but don't error
      
      // Import rules
      "import/order": ["warn", {
        "groups": ["builtin", "external", "internal", "parent", "sibling", "index"],
        "newlines-between": "always",
        "alphabetize": { "order": "asc", "caseInsensitive": true }
      }],
      "import/no-anonymous-default-export": "warn",
      
      // General code quality
      "no-console": ["warn", { "allow": ["warn", "error", "info"] }],
      "prefer-const": "warn",
      "no-empty-function": ["warn", { "allow": ["arrowFunctions"] }],
      
      // Accessibility
      "jsx-a11y/alt-text": "warn",
      "jsx-a11y/anchor-is-valid": ["warn", { "aspects": ["invalidHref"] }]
    }
  }
];

export default eslintConfig;