const path = require("path");
const dist = path.resolve(__dirname, "../dist");
const {merge} = require("webpack-merge");
const config = require("./webpack.config");

module.exports = merge(config,{
    mode: "production",
    target:"browserslist",
    performance:{
        hints:false
    }

})