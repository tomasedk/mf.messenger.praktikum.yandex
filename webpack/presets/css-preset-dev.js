const cssLoader = require("../loaders/css-loader");
const styleLoader = require("../loaders/style-loader");

const devCSSPreset = () => ({
        test: /\.css$/,
        use: [styleLoader(), cssLoader()]
});

module.exports = devCSSPreset;
