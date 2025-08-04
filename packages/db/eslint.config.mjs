// packages/db/eslint.config.mjs
import { config } from "@repo/eslint-config/base";
import drizzle from "eslint-plugin-drizzle";

/** @type {import('eslint').Linter.Config[]} */
export default [
  ...config,
  {
    plugins: {
      drizzle,
    },
    rules: {
      "drizzle/enforce-delete-with-where": "error",
    },
    files: ["**/*.ts"],
  },
];
