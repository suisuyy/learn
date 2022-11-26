const webpack = require('webpack');
const path = require("path")
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',

    plugins: [

        // Re-generate index.html with injected script tag.
        // The injected script tag contains a src value of the
        // filename output defined above.
        new HtmlWebpackPlugin({
            inject: true,
            template: path.join(__dirname, 'src/indextemplete.html'),
        }),
        new webpack.optimize.LimitChunkCountPlugin({
            maxChunks: 1,
        }),

    ],
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        hot: true,
        port: 3000,
        allowedHosts: 'all',

    },
};