const path = require('path');

module.exports = [
    {
        name: 'dev',
        mode: "development",
        watch: true,
        watchOptions: {
            ignored: [
                './.git',
                './.vscode',
                './assets',
                './dev',
                './node_modules/',
                './release',
                './src/',
                './templates',
                './tests',
                './vendor'
            ]
        },
        entry: './dev/JS & TS/JS output/index.js',
        output: {
            filename: 'script.js',
            path: path.resolve(__dirname, './public/js'),
            clean: true
        }
    },
    {
        name: 'prod',
        mode: "production",
        watch: false,
        entry: './dev/JS & TS/JS output/index.js',
        output: {
            filename: 'script.js',
            path: path.resolve(__dirname, './public/js'),
            clean: true
        }
    }
];