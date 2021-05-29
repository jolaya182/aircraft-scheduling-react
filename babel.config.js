const plugin  = []

if(process.env.NODE_ENV === "development")plugin.push("react-refresh/babel");
module.exports = {
    presets: ["@babel/preset-env", ["@babel/preset-react",{runtime:"automatic"}]],
    plugins: plugin
}
