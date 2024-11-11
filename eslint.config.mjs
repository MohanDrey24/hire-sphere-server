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
  // { 
  //   languageOptions: {
  //     parserOptions: {
  //       projectService: true,
  //       tsconfigRootDir: import.meta.dirname,
  //     },
  //   },
  // },
  ...typescriptEslint,
)

// import tseslint from "typescript-eslint";

// export default tseslint.config(
//   ...tseslint.configs.recommended
// )