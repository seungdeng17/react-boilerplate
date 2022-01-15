const { merge } = require('webpack-merge');
const common = require('./common.js');
const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = merge(common, {
  mode: 'production',

  plugins: [
    new Dotenv({
      path: path.resolve(__dirname, '../.env.production'),
    }),
  ],
});
