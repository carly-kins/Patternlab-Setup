/* eslint-disable no-console, no-undef*/
const { merge } = require("webpack-merge"); // https://webpack.js.org/guides/production/
const common = require("./webpack.common.js"); // See above
const TerserPlugin = require("terser-webpack-plugin"); // https://webpack.js.org/plugins/terser-webpack-plugin/
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin"); // https://www.npmjs.com/package/css-minimizer-webpack-plugin

module.exports = merge(common, {
  mode: "production",
  devtool: "source-map",
  plugins: [
   
  ],
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
  }
});
