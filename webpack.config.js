// webpack.config.js
const webpack = require("webpack");
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { getIfUtils, removeEmpty } = require("webpack-config-utils");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = (env) => {
  const { ifProduction, ifDevelopment } = getIfUtils(env);

  const config = {
    entry: {
      main: path.resolve(__dirname, "./source/js/index.js"),
    },
    devtool: ifDevelopment("inline-source-map"),
    devtool: ifProduction("source-map"),
    //devServer: {
      //historyApiFallback: true,
      //open: true,
      //compress: true,
      //hot: true,
      //port: 8080,
    //},
    plugins: removeEmpty([
      new CleanWebpackPlugin({
        root: "./public",
        verbose: true,
        dry: false,
        cleanOnceBeforeBuildPatterns: [
          "main.**.js",
          "*.json",
          "!annotations/**/*",
          "!css/**/*",
          "!fonts/**/*",
          "!images/**/*",
          "!patterns/**/*",
          "!styleguide/**/*",
          "!*.ico",
          "!*.html",
        ],
      }),
      //ifDevelopment(new webpack.HotModuleReplacementPlugin()),
    ]),
    output: {
      path: path.resolve(__dirname, "./public"),
      filename: "js/[name].bundle.js"
    },
    optimization: removeEmpty({
      minimize: ifProduction(true),
      minimizer: ifProduction([new TerserPlugin()]),
    }),
    module: {
      rules: [
        // JavaScript
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: ["babel-loader"],
        },
        // Images
        {
          test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
          type: "asset/resource",
        },
        // Fonts and SVGs
        {
          test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
          type: "asset/inline",
        },
      ],
    },
  };
  return config;
};
