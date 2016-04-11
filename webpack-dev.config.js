var _ = require("lodash");
var baseConfig = require("./webpack.config");
var webpack = require('webpack');

module.exports = _.assign({}, baseConfig, {
    entry: [
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/only-dev-server',
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
    devServer: {
        contentBase: './build/site',
        historyApiFallback: true,
        hot: true,
        inline: true,
        color: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
});
