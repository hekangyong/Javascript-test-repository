const path = require('path');
// ExtracTexPlugin 在后面是将css从js当中分离出来
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack');
const PUBLIC_PATH = process.env.PUBLIC_PATH || '/';

module.exports = {
    // entry: './index.js',
    entry: {
        index: __dirname + '/js/index.js',
        array: __dirname + '/js/arrary.js',
        scss: __dirname + '/scss/scss.js'
    },
    output: {
        path: path.resolve(__dirname + '/dist'),
        filename: '[name].bunble.js',
        publicPath: PUBLIC_PATH,
    },
    module: {
        rules: [
            {
                test: /\.js$/, //处理以.js结尾的文件
                exclude: /node_modules/, //处理除了nodde_modules里的js文件
                use: {
                    loader: 'babel-loader'  // 使用babel-loader转义
                }
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].min.css'
        }),
        new CleanWebpackPlugin(),   //清空dist中的所有文件
        new HtmlWebpackPlugin({
            title: 'Robert',
            hash: true,
            template: __dirname + '/index.html',
            filename: 'index.html',     //在生产模式下生成的文件名
        }),
        new webpack.HotModuleReplacementPlugin()  //开启热跟新的模式
    ],
    devServer: {
        host: 'localhost',    //服务器的ip地址
        port: 1573,    //端口
        open: true,    //自动打开页面
        hot: true    //热跟新
    }
}