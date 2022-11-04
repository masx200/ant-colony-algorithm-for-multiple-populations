// https://eslint.org/docs/user-guide/configuring

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
        // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
        // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
        "plugin:vue/essential",
        // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    ],
    // required to lint *.vue files
    plugins: ["vue", "@typescript-eslint"],
    // add your custom rules here
    rules: {
        // allow async-await
        "no-console": "off",
        indent: ["error", 4, { SwitchCase: 1 }],
        semi: ["error", "always"],
        "space-before-function-paren": [
            "error",
            { anonymous: "always", named: "never" },
        ],
        "generator-star-spacing": "off",
        // allow debugger during development
        "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    },
};
