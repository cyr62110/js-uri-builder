const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: {
        "js-uri-builder": ['./src/uri/uri.js'],
    },
    module: {
        rules: [
            {
                test: /\.(js)$/,
                use: ['babel-loader'],
                exclude: /(\/node_modules\/|test\.js|\.spec\.js$)/
            }
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "js-uri-builder.min.js"
    },
    devtool: 'source-map'
};
