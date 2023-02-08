// webpack.config.js
const webpack = require("webpack");
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { getIfUtils, removeEmpty } = require("webpack-config-utils");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
//const PattenlabWebpackPlugin = require("./.ideas/patternlab-webpack-plugin");
//TODO: 
// -- Add StyleLint
// -- Add CSS Min
// -- Add esLint
// -- Add imageMin

// -- Investigate Dev vs Prod Config Files
// -- Investigate PL plugin 
// -- Integration build

module.exports = (env) => {
  const { ifProduction, ifDevelopment } = getIfUtils(env);

  const config = {
    entry: {
      main: { import: "./source/js/index.js", filename: "js/main.js" },
      small: "./source/sass/small.scss",
    },
    devtool: ifDevelopment("inline-source-map"),
    devtool: ifProduction("source-map"),
    plugins: removeEmpty([
     // new PattenlabWebpackPlugin ({
     //  command: "build",
     // }),
      new BrowserSyncPlugin({
        // browse to http://localhost:3000/ during development,
        // ./public directory is being served
        host: 'localhost',
        port: 3000,
        server: { baseDir: ['public'] },
      }),
      new MiniCssExtractPlugin({
        filename: "css/[name].css",
        chunkFilename: "[id].css",
      }),
      new CleanWebpackPlugin({
        root: "./public",
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
      ifDevelopment(new webpack.HotModuleReplacementPlugin()),
    ]),
    output: {
      path: path.resolve(__dirname, "./public"),
      publicPath: "/public",
      sourceMapFilename: "[file].map",
    },
    optimization: removeEmpty({
      minimize: ifProduction(true),
      minimizer: [new TerserPlugin()],
    }),
    resolve: {
      extensions: [
        ".scss",
        ".js",
        ".json",
        ".jsx",
        ".gif",
        ".ico",
        ".png",
        ".jpg",
        ".jpeg",
        ".svg",
      ],
    },
    module: {
      rules: [
        // JavaScript
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: ["babel-loader"],
        },
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            "css-loader",
            {
              loader: "sass-loader",
              options: {
                // Prefer `dart-sass`
                implementation: require("sass"),
              },
            },
          ],
        },
        {
          test: /\.(png|woff|woff2|eot|otf|ttf|svg)$/, // is there a way to use this as the font generator instead of PL?
          type: "asset/resource",
          generator: {
            filename: "assets/fonts/[hash][ext]",
          },
        },
      ],
    },
  };
  return config;
};
