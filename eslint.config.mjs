import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // From hest:
    "dist/*",
    ".agent/*",
    ".netlify/*",
    "scripts/**/*",
  ]),
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    rules: {
      "@typescript-eslint/no-explicit-any": "warn",
      "no-console": "error",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "no-implicit-coercion": [
        "warn",
        {
          boolean: true,
          number: true,
          string: true,
          disallowTemplateShorthand: true,
        },
      ],
      "no-restricted-syntax": [
        "warn",
        {
          selector: "Literal[value=/^#([A-Fa-f0-9]{3,4}|[A-Fa-f0-9]{6}|[A-Fa-f0-9]{8})$/]",
          message: "Avoid hardcoded hex colors. Use CSS variables instead.",
        },
        {
          selector: "Literal[value=/^rgba?\\(/]",
          message: "Avoid hardcoded RGB(A) colors. Use CSS variables instead.",
        },
        {
          selector: "JSXAttribute[name.name=/^(label|title|placeholder|description|headerTitle)$/] Literal[value=/\\b[A-Z][a-z]*\\s+[A-Z][a-z]/]",
          message: 'Use sentence casing (e.g., "Review day") instead of title casing (e.g., "Review Day") for app copy.',
        },
        {
          selector: "VariableDeclarator[id.type='ObjectPattern']:matches([init.callee.name='render'], [init.type='AwaitExpression'][init.argument.callee.name='render'])",
          message: "Use `screen` from `@testing-library/react` instead of destructuring queries from `render`. See https://testing-library.com/docs/queries/about#screen",
        },
      ],
    },
  },
  {
    files: ["lib/logger.ts", "functions/**/*.{ts,tsx,js,jsx}", "netlify/functions/**/*.{ts,tsx,js,jsx}"],
    rules: {
      "no-console": "off",
    },
  },
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    rules: {
      "import/no-unresolved": "off",
    },
  },
  {
    files: ["**/*.test.{ts,tsx,js,jsx}", "**/__tests__/**/*.{ts,tsx,js,jsx}", "scripts/**/*.*"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
]);

export default eslintConfig;
