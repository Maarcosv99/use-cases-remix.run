/** @type {import('eslint').Linter.Config} */

module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es6: true,
    },

    // Base config
    extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended-type-checked"],
    plugins: ['@typescript-eslint'],
    parser: '@typescript-eslint/parser',

    rules: {
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-unused-vars": [
            "warn",
            { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
        ],
        "@typescript-eslint/restrict-template-expressions": "off",
        // restricts so you can't use {} as type. me no likey
        "@typescript-eslint/ban-types": "off",
        // type imports should be imported as types
        "@typescript-eslint/consistent-type-imports": [
            "error",
            {
                prefer: "type-imports",
                fixStyle: "separate-type-imports",
                disallowTypeAnnotations: false,
            },
        ],
        "import/consistent-type-specifier-style": ["error", "prefer-top-level"],
    },

    overrides: [
        // React
        {
            files: ["**/*.{js,jsx,ts,tsx}"],
            plugins: ["react", "jsx-a11y"],
            extends: [
                "plugin:react/recommended",
                "plugin:react/jsx-runtime",
                "plugin:react-hooks/recommended",
                "plugin:jsx-a11y/recommended",
            ],
            settings: {
                react: {
                    version: "detect",
                },
                formComponents: ["Form"],
                linkComponents: [
                    { name: "Link", linkAttribute: "to" },
                    { name: "NavLink", linkAttribute: "to" },
                ],
                "import/resolver": {
                    typescript: {},
                },
            },
        },

        // Typescript
        {
            files: ["**/*.{ts,tsx}"],
            plugins: ["@typescript-eslint", "import"],
            parser: "@typescript-eslint/parser",
            settings: {
                "import/parsers": {
                    "@typescript-eslint/parser": [".ts"]
                },
                "import/internal-regex": "^~/",
                "import/resolvers": {},
                "no-unused-vars": {
                    varsIgnorePattern: "^_",
                }
            },
            extends: [
                "plugin:@typescript-eslint/recommended",
                "plugin:import/recommended",
                "plugin:import/typescript",
            ],
            rules: {
                "@typescript-eslint/no-namespace": "off"
            }
        },

        // Node
        {
            files: [".eslintrc.js"],
            env: {
                node: true,
            }
        },
    ],
};
