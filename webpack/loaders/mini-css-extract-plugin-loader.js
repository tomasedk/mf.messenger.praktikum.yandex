const MiniCssExtractPlugin = require("mini-css-extract-plugin"); 

const miniCssExtractLoader = () => ({ 
    loader: MiniCssExtractPlugin.loader, 
    options: {} 
});

module.exports = miniCssExtractLoader;