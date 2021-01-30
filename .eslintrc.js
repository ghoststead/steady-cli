module.exports = {
    env: {
        es6: true,
        browser: false,
        node: true,
        commonjs: true
    },
    plugins: ['ghost', 'jest'],
    extends: [
        'plugin:ghost/node',
        'plugin:jest/all'
    ],
    rules: {
        'no-console': 'off',
        'prefer-template': 'error'
    },
    globals: {
        process: true,
        'jest/globals': true
    }
};
