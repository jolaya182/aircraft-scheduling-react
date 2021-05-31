const { merge } = require('webpack-merge');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const path = require('path');
const config = require('./webpack.config');

const dist = path.resolve(__dirname, '../dist');

module.exports = merge(config, {
  mode: 'development',
  devServer: {
    contentBase: dist,
    hot: true
  },
  target: 'web',
  plugins: [new ReactRefreshWebpackPlugin()]
});
