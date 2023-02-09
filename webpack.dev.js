/* eslint-disable no-console, no-undef*/
const webpack = require("webpack"); // https://webpack.js.org/concepts/hot-module-replacement/
const { merge } = require("webpack-merge"); // https://webpack.js.org/guides/production/
const common = require("./webpack.common.js"); // See above
const RemovePlugin = require('remove-files-webpack-plugin'); // https://github.com/Amaimersion/remove-files-webpack-plugin/blob/master/README.md

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new RemovePlugin({
      before: {
        include: [
          './public' //clean entire public folder before build
      ]
      },
      watch: {
        //parameters for "before watch compilation" stage.
      },
      after: {
        // parameters for "after normal and watch compilation" stage.
      }
    })
  ],
});
