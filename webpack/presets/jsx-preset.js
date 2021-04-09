const babelLoader = require("../loaders/babel-loader");

const jsxPreset = () => ({
    test: /\.jsx?$/,
    exclude: /(node_modules)/,
    use: [babelLoader()]
});

module.exports = jsxPreset;