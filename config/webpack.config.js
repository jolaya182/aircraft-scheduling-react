const path = require("path");
const dist = path.resolve(__dirname, "../dist");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: "./frontEnd/src/index.js",
  output: {
    filename: "bundle.js",
    path: dist,
  },
  devtool: "source-map",
  plugins: [
    new HtmlWebpackPlugin({
      template: "./frontEnd/src/index.html",
    }),
    new MiniCssExtractPlugin(),
    new CleanWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.(s[ac]|c)ss/i,
        use: [
          { loader: MiniCssExtractPlugin.loader, options: { publicPath: "" } },
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
    ],
  },
  resolve:{extensions:[".js", ".jsx"]}
};
