const path = require("path");
const dist = path.resolve(__dirname, "../dist");
const {merge} = require("webpack-merge");
const config = require("./webpack.config");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

module.exports = merge(config,{
    mode: "development",
    devServer:{
        contentBase: dist,
        hot: true
    },
    target: "web",
    plugins: [new ReactRefreshWebpackPlugin()]
})