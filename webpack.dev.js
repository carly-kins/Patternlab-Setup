/* eslint-disable no-console, no-undef*/
const webpack = require("webpack"); // https://webpack.js.org/concepts/hot-module-replacement/
const { merge } = require("webpack-merge"); // https://webpack.js.org/guides/production/
const common = require("./webpack.common.js"); // See above


module.exports = merge(common, {
  mode: "development",
  devtool: "cheap-source-map",
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
});
