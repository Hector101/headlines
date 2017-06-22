const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');

const hotModuleReplacementPlugin = new webpack.HotModuleReplacementPlugin();
const dotenv = new Dotenv({
  path: './.env',
  safe: false
});

// setup webpack configuration
module.exports = {
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname),
    filename: 'bundle.min.js',
    publicPath: '/',
  },
  devServer: {
    compress: true,
    hot: true,
    port: process.env.PORT || 8080,
    historyApiFallback: true,
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.js$|\.jsx$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.css$|\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.jpg$|\.png$|\.svg$/,
        use: ['file-loder'],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [hotModuleReplacementPlugin, dotenv],
};
