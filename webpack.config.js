var webpack = require('webpack');


module.exports = {
    entry: {
        'questions': './front/questions/index.js',
        'lib': './front/lib/index.js',
    },
    output: {
        path: './dist/js',
        filename: '[name].js',
    },
    module: {
        loaders: [
            {
                test: /front\/questions\//,
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
