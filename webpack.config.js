var webpack = require('webpack');

module.exports = {
    entry: [
        'bootstrap-loader',
        './src/index.js'
    ],
    module: {
        loaders: [
            {test: /\.js$/, exclude: /node_modules/, loader: 'babel'},
            {test: /\.css$/, loaders: ['style', 'css', 'postcss']},
            {test: /\.scss$/, loaders: ['style', 'css', 'postcss', 'sass']},
            {test: /\.(woff2?|ttf|eot|svg)$/, loader: 'url-loader?limit=10000'},
            {test: /bootstrap-sass\/assets\/javascripts\//, loader: 'imports?jQuery=jquery'}
        ]
    },
    output: {
        path: __dirname + '/build/site',
        publicPath: '/',
        filename: 'bundle.js'
    },
    plugins: [
        new webpack.DefinePlugin({
            GA_TRACKING_CODE: JSON.stringify('UA-2221544-15'),
            CDN_PREFIX: JSON.stringify('https://d1fw0azbwe58up.cloudfront.net'),
            DATA_URL: JSON.stringify('https://d1fw0azbwe58up.cloudfront.net/data.json'),
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
};
