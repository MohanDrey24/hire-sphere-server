import tseslint from "typescript-eslint";
import typescriptEslint from "./eslint/typescript-eslint.mjs";

export default tseslint.config(
  {
    files: [
      "*.{js,ts}",
      "*.config.{js,ts}",
      "eslint/**/*.{js,ts}",
    ]
  },
  ...typescriptEslint,
)