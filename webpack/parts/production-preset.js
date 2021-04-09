const prodLessPreset = require("../presets/less-preset-prod");
const createMiniCssExtractPlugin = require("../plugins/mini-css-extract-plugin");

module.exports = () => ({
    mode: 'production',
    module: {
        rules: [prodLessPreset()]
    },
    plugins: [createMiniCssExtractPlugin()],
});
