/** @type {import("eslint").Linter.Config} */

module.exports = {
  root: true,
  extends: ["@workspace"], // uses the config in `packages/config/eslint`
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    tsconfigRootDir: __dirname,
    project: ["./cases/*/tsconfig.json", "./packages/**/*/tsconfig.json"],
  }
}