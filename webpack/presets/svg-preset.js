const svgLoader = require('../loaders/svg-loader');

const svgPreset = () => ({
    test: /\.svg$/,
    use: [svgLoader()]
});

module.exports = svgPreset;
