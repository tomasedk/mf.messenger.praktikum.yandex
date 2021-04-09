const cssLoader = require("../loaders/css-loader");
const styleLoader = require("../loaders/style-loader");
const lessLoader = require("../loaders/less-loader");

const devLessPreset = () => ({
        test: /\.less$/,
        use: [styleLoader(), cssLoader(), lessLoader()]
});

module.exports = devLessPreset;
