const path = require("path");
const dist = path.resolve(__dirname, "../dist");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: "./src/index.js",
    output:{
        filename: "bundle.js",
        path: dist
    },
    devtool:"source-map",
    plugins: [new HtmlWebpackPlugin({
        template:"./src/index.html"
    }), new MiniCssExtractPlugin()],
    module:{
        rules:[
            {
                test: /\.js?/,
                exclude: /node_modules/,
                use: "babel-loader"
            },
            {
                test:/\.(s[ac]|c)ss/i,
                use:[
                    {loader: MiniCssExtractPlugin.loader,
                    options: { publicPath: ""}
                    },
                    "css-loader",
                    "postcss-loader",
                    "sass-loader"
                ]
            }
        ]
    }

}