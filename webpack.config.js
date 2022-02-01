const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const prodMode = false; //process.env.NODE_ENV === 'production';

module.exports = {
  entry: './src',
  module: {
    rules: [
      { test: /\.svg$/i, use: 'svg-inline-loader' },
      { test: /\.css$/i, use: [
        prodMode ? MiniCssExtractPlugin.loader : 'style-loader',
        'css-loader',
      ]},
      { test: /\.(png|jpg|jpeg|gif)$/i, type: 'asset/resource' },
      { test: /\.js$/i, use: 'babel-loader' },
    ],
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'index.js',
    clean: true,
    assetModuleFilename: '[path][name][ext]',
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['', '.js', '.json'],
  },
  resolveLoader: {
    modules: ['node_modules'],
    extensions: ['', '.js',],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({ filename: "index.css", chunkFilename: "[id].css" }),
    new HtmlWebpackPlugin({ template: 'src/index.html' })
  ],
  devServer: {
    hot: true,
    open: true,
  },
  devtool: 'source-map',
  mode: prodMode ? 'production' : 'development',
}
