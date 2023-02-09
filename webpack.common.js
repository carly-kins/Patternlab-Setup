/* eslint-disable no-console, no-undef*/
const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");
const StylelintPlugin = require("stylelint-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
//const RemovePlugin = require('remove-files-webpack-plugin'); // https://github.com/Amaimersion/remove-files-webpack-plugin/blob/master/README.md

module.exports = {
  entry: {
    main: { import: "./source/js/index.js", filename: "js/main.js" },
    small: "./source/sass/small.scss",
  },
  plugins: [
    new BrowserSyncPlugin({
      host: "localhost",
      port: 3000,
      server: { baseDir: ["public"] },
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
      chunkFilename: "[id].css",
    }),
    new StylelintPlugin({
      configFile: ".stylelintrc.yml",
      fix: true,
    }),
    new ESLintPlugin({
      failOnError: false,
    }),
    new NodePolyfillPlugin(),
    //new RemovePlugin({
     // after: {
        // parameters for "after normal and watch compilation" stage.
     // }
   // }),
  ],
  output: {
    path: path.resolve(__dirname, "./public"),
    publicPath: "/public",
    sourceMapFilename: "[file].map",
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
  },
  resolve: {
    extensions: [
      ".scss",
      ".js",
      ".json",
      ".jsx",
      ".hbs",
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
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.hbs$/,
        exclude: /node_modules/,
        loader: "handlebars-loader"
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
              url: false,
            },
          },
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
