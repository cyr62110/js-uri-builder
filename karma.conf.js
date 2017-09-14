module.exports = function(config) {
    config.set({
        basePath: '',
        frameworks: ['mocha', 'chai', 'sinon'],
        files: [
            './test/**/*.spec.js'
        ],
        exclude: [
        ],
        preprocessors: {
            './src/**/*.js': ['webpack', 'sourcemap'],
            './test/**/*.spec.js': ['webpack', 'sourcemap']
        },
        webpack: require('./webpack.config.js'),
        webpackMiddleware: {
            stats: 'errors-only'
        },
        reporters: ['progress'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['Chrome'],
        singleRun: false,
        concurrency: Infinity
    });
};
