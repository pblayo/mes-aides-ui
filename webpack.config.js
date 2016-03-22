var webpack = require('webpack');


module.exports = {
    entry: {
        'questions': './front/questions.js',
        'lib': './front/lib/index.js',
    },
    output: {
        path: './dist/js',
        filename: '[name].js',
    },
    module: {
        loaders: [
            {
                test: /questions\.js$/,
                loader: 'expose',
                query: 'questions',
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
