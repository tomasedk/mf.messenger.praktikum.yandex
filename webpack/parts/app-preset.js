const path = require("path");

module.exports = () => ({
    entry: {
        app: path.resolve('static/index.ts')
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve('dist')
    },
    resolve: {
        // alias: { TODO: потом поправить импорты на алиасы
        //     Components: path.resolve('static/src')
        // },
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        alias: {
            'handlebars': 'handlebars/dist/handlebars.js'
        }
    }
});
