module.exports = {
    root: true,
    parserOptions: {
        parser: "@typescript-eslint/parser",
    },
    env: {
        browser: true,
    },
    extends: [
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        "eslint:recommended",
        "plugin:vue/essential",
        "plugin:vue/vue3-essential",
        "@vue/eslint-config-typescript/recommended",
        "@vue/eslint-config-prettier",
    ],

    plugins: ["vue", "@typescript-eslint"],

    rules: {
        "no-console": "off",
        indent: ["error", 4, { SwitchCase: 1 }],
        semi: ["error", "always"],
        "space-before-function-paren": [
            "error",
            { anonymous: "always", named: "never" },
        ],
        "generator-star-spacing": "off",

        "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    },
};
