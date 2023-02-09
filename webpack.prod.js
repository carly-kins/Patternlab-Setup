/* eslint-disable no-console, no-undef*/
const { merge } = require("webpack-merge"); // https://webpack.js.org/guides/production/
const common = require("./webpack.common.js"); // See above
const RemovePlugin = require('remove-files-webpack-plugin'); // https://github.com/Amaimersion/remove-files-webpack-plugin/blob/master/README.md
//const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin"); // https://webpack.js.org/plugins/image-minimizer-webpack-plugin/

module.exports = merge(common, {
  mode: "production",
  devtool: "source-map",
  plugins: [
    new RemovePlugin({
      before: {
        include: [
          './public', //clean entire public folder before builf
          './integrated',
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
