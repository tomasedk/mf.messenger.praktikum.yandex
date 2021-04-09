const {merge} = require('webpack-merge');
const appPreset = require('./webpack/parts/app-preset.js');
const basePreset = require('./webpack/parts/base-preset.js');

const webpackMode = mode => require(`./webpack/parts/${mode}-preset.js`)(mode);

module.exports = (_env, {mode}) => {
    console.log(mode);
    return merge(
        appPreset(),
        basePreset(),
        webpackMode(mode)
    );
}
