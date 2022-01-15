const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: ['@babel/polyfill', './src/index.tsx'],

  output: {
    filename: './static/js/[chunkhash].js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-typescript',
              [
                '@babel/preset-react',
                {
                  runtime: 'automatic',
                },
              ],
              '@babel/preset-env',
            ],
          },
        },
      },
      {
        test: /\.s[ac]ss|css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(ico|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader',
        options: {
          name: './static/[hash].[ext]',
          limit: 10000,
        },
      },
      {
        test: /\.(ico|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: ['file-loader?name=/static/[name].[ext]'],
      },
    ],
  },

  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      '@': path.resolve(__dirname, '../', 'src/'),
      '@assets': path.resolve(__dirname, '../', 'src/assets/'),
      '@components': path.resolve(__dirname, '../', 'src/components/'),
      '@constants': path.resolve(__dirname, '../', 'src/constants/'),
      '@hooks': path.resolve(__dirname, '../', 'src/hooks/'),
      '@pages': path.resolve(__dirname, '../', 'src/pages/'),
      '@state': path.resolve(__dirname, '../', 'src/state/'),
      '@styles': path.resolve(__dirname, '../', 'src/styles/'),
      '@utils': path.resolve(__dirname, '../', 'src/utils/'),
    },
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: './index.html',
      template: './public/index.html',
      favicon: './public/favicon.ico',
    }),
    new MiniCssExtractPlugin({ filename: './static/css/[chunkhash].css' }),
  ],
};
