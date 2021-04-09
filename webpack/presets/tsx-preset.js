const babelLoader = require("../loaders/babel-loader");
const tsLoader = require("../loaders/ts-loader");

const tsxPreset = () => ({
    test: /\.tsx?$/,
    exclude: /(node_modules)/,
    use: [babelLoader(), tsLoader()]
});

module.exports = tsxPreset;