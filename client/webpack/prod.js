const { merge } = require('webpack-merge');
const common = require('./common.js');
const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = merge(common, {
  mode: 'production',

  entry: ['@babel/polyfill', './src/index.tsx'],

  output: {
    filename: './static/js/[chunkhash].js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
  },

  plugins: [
    new Dotenv({
      path: path.resolve(__dirname, '../.env.production'),
    }),
  ],
});
