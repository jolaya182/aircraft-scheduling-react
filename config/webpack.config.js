const path = require("path");
const dist = path.resolve(__dirname, "../dist");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: "./src/index.js",
    output:{
        filename: "bundle.js",
        path: dist
    },
    devtool:"source-map",
    plugins: [new HtmlWebpackPlugin({
        template:"./src/index.html"
    })]
}