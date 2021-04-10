const path = require("path");

module.exports = () => ({
    entry: {
        app: path.resolve('src/index.ts')
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve('dist')
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        alias: {
            'src': path.resolve('src/'),
            'handlebars': 'handlebars/dist/handlebars.js'
        }
    },
});
