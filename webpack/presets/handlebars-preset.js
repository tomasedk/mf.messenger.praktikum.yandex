const handlebarsLoader = require("../loaders/handlebars-loader");

const handlebarsPreset = () => ({
    test: /\.handlebars$/,
    use: [handlebarsLoader()]
});

module.exports = handlebarsPreset;
