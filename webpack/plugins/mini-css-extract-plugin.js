const MiniCssExtractPlugin = require("mini-css-extract-plugin"); 

const createMiniCssExtractPlugin = (options) => {
    return new MiniCssExtractPlugin(options);
};

module.exports = createMiniCssExtractPlugin;