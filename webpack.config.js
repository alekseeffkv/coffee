const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const prodMode = true;

module.exports = {
  entry: './src',
  module: {
    rules: [
      { test: /\.svg$/i, use: 'svg-inline-loader' },
      {
        test: /\.css$/i,
        use: [
          prodMode ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: ['autoprefixer'],
              },
            },
          },
        ],
      },
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
    extensions: ['', '.js'],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({ filename: 'index.css', chunkFilename: '[id].css' }),
    new HtmlWebpackPlugin({ template: 'src/index.html' }),
    new CopyPlugin({
      patterns: [
        {
          from: 'src/**/*',
          to: '[path][name][ext]',
          globOptions: {
            ignore: ['**/*.js', '**/*.html', '**/*.css', '**/*.ico'],
          },
        },
        {
          from: 'src/favicon.ico',
          to: 'favicon.ico',
        },
        {
          from: 'src/404.html',
          to: '404.html',
        },
        {
          from: 'src/robots.txt',
          to: 'robots.txt',
        },
      ],
    }),
  ],
  devServer: {
    hot: true,
    open: true,
  },
  mode: prodMode ? 'production' : 'development',
};
