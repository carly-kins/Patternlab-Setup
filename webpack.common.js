/* eslint-disable no-console, no-undef*/
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // https://www.npmjs.com/package/mini-css-extract-plugin
const BrowserSyncPlugin = require("browser-sync-webpack-plugin"); // https://www.npmjs.com/package/browser-sync-webpack-plugin
const StylelintPlugin = require("stylelint-webpack-plugin"); // https://webpack.js.org/plugins/stylelint-webpack-plugin/
const ESLintPlugin = require("eslint-webpack-plugin"); // https://webpack.js.org/plugins/eslint-webpack-plugin/
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin'); // https://github.com/Richienb/node-polyfill-webpack-plugin#readme
const RemovePlugin = require('remove-files-webpack-plugin'); // https://github.com/Amaimersion/remove-files-webpack-plugin

module.exports = {
  entry: {
    main: { import: "./source/js/index.js", filename: "js/main.js" },
    react: { import: "./source/js/react.js", filename: "js/react.js" },
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
    new RemovePlugin({
      after: {
        test: [
          {
            folder: './public',
            method: (absoluteItemPath) => {
              return new RegExp(/\.js$/, 'm').test(absoluteItemPath);
            }
          },
          {
            folder: './public',
            method: (absoluteItemPath) => {
              return new RegExp(/\.js\.LICENSE\.txt$/, 'm').test(absoluteItemPath);
            }
          },
          {
            folder: './public',
            method: (absoluteItemPath) => {
              return new RegExp(/\.js\.map$/, 'm').test(absoluteItemPath);
            }
          },
          {
            folder: './public',
            method: (absoluteItemPath) => {
              return new RegExp(/\.json$/, 'm').test(absoluteItemPath);
            }
          },
        ]
      }
    }),
  ],
  output: {
    path: path.resolve(__dirname, "./public"),
    publicPath: "/public",
    sourceMapFilename: "[file].map",
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
        include: path.resolve(__dirname, 'source'),
        use: ["babel-loader"],
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
