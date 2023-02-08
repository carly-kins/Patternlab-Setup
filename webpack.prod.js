const { merge } = require("webpack-merge");
const path = require("path");
const common = require("./webpack.common.js");
//const RemovePlugin = require('remove-files-webpack-plugin'); //https://www.npmjs.com/package/remove-files-webpack-plugin
//const PattenlabWebpackPlugin = require("./.ideas/patternlab-webpack-plugin"); // -- Investigate PL plugin
//TODO:
// -- Investigate Dev vs Prod Config Files //https://webpack.js.org/guides/production/. minimize images on production build https://github.com/gruntjs/grunt-contrib-imagemin

module.exports = merge(common, {
  mode: "production",
  //plugins: [
    //new PattenlabWebpackPlugin ({command: "build",}),
    //new RemovePlugin({
    //before: {
    // parameters for "before normal compilation" stage.
    //},
    //watch: {
    // parameters for "before watch compilation" stage.
    //},
    //after: {
    // parameters for "after normal and watch compilation" stage.
    //}
    //})
  //],
});
