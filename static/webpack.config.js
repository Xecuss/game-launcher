const path = require('path');
const CSSExtract = require('mini-css-extract-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const webpack = require('webpack');

module.exports = {
    entry: path.resolve(__dirname, './src/index.ts'),

    output: {
        path: path.resolve(__dirname, '../dist/static/scripts/'),
        filename: '[name]_[chunkhash].js'
    },

    devtool: 'inline-source-map',
    mode: 'development',

    resolve: {
        extensions: [".js", ".ts", ".tsx"]
    },

    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "ts-loader",
                        options: {
                            appendTsSuffixTo: [/\.vue$/],
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    CSSExtract.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.(jpg|png)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: '8192'
                        }
                    }
                ]
            },
            {
                test: /\.vue$/,
                use: 'vue-loader'
            }
        ]
    },
    plugins: [
        new webpack.HashedModuleIdsPlugin(),
        new VueLoaderPlugin(),
        new CSSExtract({
            filename: '[name]_[hash].css',
            chunkFilename: '[id]_[chunkhash].css'
        }),
        new HtmlPlugin({
            filename: path.resolve(__dirname, '../dist/views/index.html'),
            template: './src/view/index.ejs'
        })
    ],
    target: "electron-renderer"
};