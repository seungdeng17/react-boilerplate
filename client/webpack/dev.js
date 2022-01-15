const { merge } = require('webpack-merge');
const common = require('./common.js');
const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = merge(common, {
  mode: 'development',

  devServer: {
    host: 'localhost',
    port: 3000,
    open: true,
    historyApiFallback: true,
    publicPath: '',
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:3001/',
    //     changeOrigin: true,
    //     secure: false,
    //   },
    // },
  },

  plugins: [
    new Dotenv({
      path: path.resolve(__dirname, '../.env.development'),
    }),
  ],

  devtool: 'eval-cheap-module-source-map',
});
