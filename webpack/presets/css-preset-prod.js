const cssLoader = require("../loaders/css-loader");
const miniCssExtractLoader = require("../loaders/mini-css-extract-plugin-loader");

const prodCSSPreset = () => ({
        test: /\.css$/,
        use: [miniCssExtractLoader(), cssLoader()]
});

module.exports = prodCSSPreset;