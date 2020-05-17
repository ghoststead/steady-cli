module.exports = {
    env: {
        es6: true,
        browser: false,
        node: true,
        commonjs: true
    },
    plugins: ['ghost'],
    extends: [
        'plugin:ghost/node',
    ],
    rules: {
        'no-console': 'off'
    },
    globals: {
        process: true
    }
};
