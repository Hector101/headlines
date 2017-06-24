const path = require('path');
const webpack = require('webpack');

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
      PRODUCTION: JSON.stringify(true),
    }),
  ],
};
