const webpack = require("webpack");

const createWebpackProgressPlugin = (options) => {
    return new webpack.ProgressPlugin(options);
};

module.exports = createWebpackProgressPlugin;