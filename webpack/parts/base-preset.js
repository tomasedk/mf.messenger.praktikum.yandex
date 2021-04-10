// Presets
const imgPreset = require("../presets/pic-preset-dev");
const jsxPreset = require("../presets/jsx-preset");
const tsxPreset = require("../presets/tsx-preset");
const fontPreset = require("../presets/font-preset");
const svgPreset = require("../presets/svg-preset");
const handlebarsPreset = require("../presets/handlebars-preset");

// Plugins
const createHTMLWebpackPlugin = require("../plugins/html-webpack-plugin");
const createCleanWebpackPlugin = require("../plugins/clean-webpack-plugin");
const createWebpackProgressPlugin = require("../plugins/progress-webpack-plugin");

module.exports = () => ({
    module: {
        rules: [imgPreset(), fontPreset(), jsxPreset(), tsxPreset(), svgPreset(), handlebarsPreset()],
    },
    plugins: [
        createHTMLWebpackPlugin({
            title: "React boilerplate",
            template: "src/assets/html/index.html"
        }),
        createCleanWebpackPlugin(),
        createWebpackProgressPlugin()
    ]
})
