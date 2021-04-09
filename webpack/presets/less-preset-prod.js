const cssLoader = require("../loaders/css-loader");
const miniCssExtractLoader = require("../loaders/mini-css-extract-plugin-loader");
const lessLoader = require("../loaders/less-loader");

const prodLessPreset = () => ({
        test: /\.less$/,
        use: [miniCssExtractLoader(), cssLoader(), lessLoader()]
});

module.exports = prodLessPreset;
