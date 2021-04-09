const { CleanWebpackPlugin } = require("clean-webpack-plugin");

/**
 * Подробный JSdoc
 *
 * @param {Object} options 
 * @see ссылка на доки 
 */
const createCleanWebpackPlugin = (options) => {
    return new CleanWebpackPlugin(options);
};

module.exports = createCleanWebpackPlugin;