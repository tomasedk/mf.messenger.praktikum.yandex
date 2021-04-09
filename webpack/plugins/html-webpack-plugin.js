const HtmlWebpackPlugin = require("html-webpack-plugin");

/** 
 * Подробный JSdoc
 *
 * @param {Object} options 
 * @see ссылка на доки 
 */
const createHTMLWebpackPlugin = (options) => { 
    return new HtmlWebpackPlugin(options);
};

module.exports = createHTMLWebpackPlugin;