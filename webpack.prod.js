/* eslint-disable no-console, no-undef*/
const { merge } = require("webpack-merge"); // https://webpack.js.org/guides/production/
const common = require("./webpack.common.js"); // See above

module.exports = merge(common, {
  mode: "production",
  devtool: "source-map",
  plugins: [
   
  ],
});
