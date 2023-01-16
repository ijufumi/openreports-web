const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/index.tsx",
  output: {
    filename: "main.js",
    path: `${__dirname}/public`,
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".png"],
    alias: {
      "~": path.resolve(__dirname, "/*"),
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        generator: {
          filename: "images/[name][ext][query]",
        },
        type: "asset",
      },
    ],
  },
  devServer: {
    static: {
      directory: "public",
    },
    open: true,
    historyApiFallback: true,
    port: 3000,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "public/index.html",
      hash: true,
      publicPath: "/"
    }),
    new Dotenv({
      systemvars: true,})
  ]
};
