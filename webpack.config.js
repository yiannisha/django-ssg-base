const path = require('path');

module.exports = (env) => ({
    mode: env.mode,
    entry: {
        home: './dist/static/js/home.js',
        aboutus: './dist/static/js/aboutus.js',
        transitions: './dist/static/js/transitions.js',
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist/static/js'),
        // doesn't work for some reason
        // clean: true
    },
});