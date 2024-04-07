export default [
    {
        ignores: ["src/**/*.test.ts", "src/frontend/generated/*"],
        plugins: [
            "@typescript-eslint"
        ],
        rules: {
            "@typescript-eslint/strict-boolean-expressions": "warn",
            "@typescript-eslint/no-empty-interface": 0
        },    
        rules: {
            semi: "error",
            "prefer-const": "error"
        }
    }
];