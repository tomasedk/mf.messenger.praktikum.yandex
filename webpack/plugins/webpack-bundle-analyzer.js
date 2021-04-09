const WebpackBundleAnalyzer = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const createWebpackBundleAnalyzer = (options) => {
    return new WebpackBundleAnalyzer(options);
}

module.exports = createWebpackBundleAnalyzer;