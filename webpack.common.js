// webpack.config.js
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");
const StylelintPlugin = require("stylelint-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");

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
    new ESLintPlugin(),
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
