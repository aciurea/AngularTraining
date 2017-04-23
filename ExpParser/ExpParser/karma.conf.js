﻿module.exports = function (config) {
    config.set({
        plugins: ['karma-babel-preprocessor', 'karma-phantomjs-launcher', 'karma-jasmine'],
        // base path, that will be used to resolve files and exclude
        basePath: '../ExpParser/Scripts/',

        // frameworks to use
        frameworks: ['jasmine'],

        // list of files / patterns to load in the browser
        files: [
            'libraries/jquery-3.1.1.min.js',
            'libraries/bootstrap.min.js',
            'libraries/query-builder.standalone.min.js',
            'app/test/dist/test.js'
        ],

        // list of files to exclude
        exclude: [
        ],

        // test results reporter to use
        reporters: ['progress'],

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        // Start these browsers
        browsers: ['PhantomJS'],

        // If browser does not capture in given timeout [ms], kill it
        captureTimeout: 60000,

        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: false
        //,
        //preprocessors: {
        //    'app/test/segmentationBuilder.test.js': ['babel']
        //}
    });
};