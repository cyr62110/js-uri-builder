const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: {
        "js-uri-builder": ['./src/index.js'],
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: "js-uri-builder.js"
    },
    module: {
        rules: [
            {
                test: /\.(js)$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015']
                    }
                }
            }
        ]
    }
};
