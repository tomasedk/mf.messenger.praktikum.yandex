const urlLoader = require("../loaders/url-loader");

const imgPreset = () => ({
    test: /\.(png|jpg|jpeg|gif)$/,
    use: [
        urlLoader(
            {
                limit: 5000,
                name: 'images/[hash].[ext]'
            }
        )
    ]
});

module.exports = imgPreset;
