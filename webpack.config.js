var webpack = require('webpack');

module.exports = {
    entry: [
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/only-dev-server',
        'bootstrap-loader',
        './src/index.jsx'
    ],
    module: {
        loaders: [
            {test: /\.jsx?$/, exclude: /node_modules/, loader: 'react-hot!babel'},
            {test: /\.css$/, loaders: ['style', 'css', 'postcss']},
            {test: /\.scss$/, loaders: ['style', 'css', 'postcss', 'sass']},
            {test: /\.(woff2?|ttf|eot|svg)$/, loader: 'url-loader?limit=10000'},
            {test: /bootstrap-sass\/assets\/javascripts\//, loader: 'imports?jQuery=jquery'}
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    output: {
        path: __dirname + '/build/site',
        publicPath: '/',
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: './build/site',
        hot: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
};
