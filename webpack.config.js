var webpack = require('webpack');


module.exports = {
    entry: {
        'question': './front/Question.js',
        'lib': './front/lib/index.js',
    },
    output: {
        path: './dist/js',
        filename: '[name].js',
    },
    module: {
        loaders: [
            {
                test: /Question\.js$/,
                loader: 'expose',
                query: 'Question',
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
            },
            {
                test: /\.json$/,
                loader: 'json',
            },
        ],
    },
}
