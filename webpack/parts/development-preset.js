const path = require("path");
const devLessPreset = require("../presets/less-preset-dev");
const webpackBundleAnalyzer = require("../plugins/webpack-bundle-analyzer");

module.exports = () => ({
    mode: "development",
    devtool: "eval-cheap-module-source-map",
    module: {
        rules: [devLessPreset()]
    },
    plugins: [
        webpackBundleAnalyzer({
            analyzerMode: 'disabled',
            generateStatsFile: true,
            statsOptions: { source: false }
        })
    ],
    devServer: {
        contentBase: path.resolve('dist'),
        compress: true,
        port: 3000
    },
});
