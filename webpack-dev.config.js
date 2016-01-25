var _ = require("lodash");
var baseConfig = require("./webpack.config");
var webpack = require('webpack');

module.exports = _.assign({}, baseConfig, {
    entry: [
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/only-dev-server',
        'bootstrap-loader',
        './src/index.jsx'
    ],
    devServer: {
        contentBase: './build/site',
        historyApiFallback: true,
        hot: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
});
