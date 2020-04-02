module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
    },
    parserOptions: {
        parser: "babel-eslint",
    },
    extends: ["plugin:vue/essential", "eslint-config-prettier"],
    plugins: ["prettier"],
    rules: {
        "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
        indent: ["off"],
        "linebreak-style": ["error", "unix"],
        quotes: ["error", "double"],
        semi: ["error", "always"],
        "comma-dangle": [
            "error",
            {
                arrays: "ignore",
                objects: "ignore",
                imports: "ignore",
                exports: "never",
                functions: "ignore",
            },
        ],
        "space-before-function-paren": 0,
        "no-unused-vars": 0,
        "no-console": 0,
        "vue/no-unused-components": "ignore",
    },
};
