
const path = require('path');
const webpack = require('webpack');
const uglifyWebpack = require('uglifyjs-webpack-plugin');

/**
 * webpack configuration file used to
 * specify the required setup needed to
 * run webpack in this project
 */
module.exports = {
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname),
    filename: 'bundle.min.js',
    publicPath: '/',
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
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        CLIENT_ID: JSON.stringify(process.env.CLIENT_ID),
        NEWS_API: JSON.stringify(process.env.NEWS_API),
      },
    }),
    new uglifyWebpack(),
  ],
};
