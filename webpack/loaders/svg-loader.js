/**
 * Таким образом подгружаются svg в стилях вида:
 *      background: @color url("*.svg") no-repeat center;
 *
 * outputPath указывает, чтобы все файлы, подходящие под этот лоадер, клались в папку с названием расширения.
 * Например, svg/*
 */
const svgLoader = () => ({
    loader: "file-loader",
    options: {
        outputPath: 'svg/'
    }
});

module.exports = svgLoader;
