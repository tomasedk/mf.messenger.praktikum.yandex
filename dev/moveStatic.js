const fs = require('fs');
const path = require("path");

const getDestDir = (currentPath, sourcePath, targetPath) => {
    /** Разность путей текущей директории и статики. */
    let diff = path.relative(sourcePath, currentPath);
    /** Путь к целевой директории. */
    return path.join(targetPath, diff);
}

const copyStatic = (dirPath, sourcePath, targetPath) => {
    let y1 = fs.readdirSync(dirPath);
    for (let x of y1) {
        try {
            let stat = fs.statSync(dirPath + x);
            if (!stat.isFile()) {
                let childDirPath = dirPath + x + '/';

                let destination = getDestDir(childDirPath, sourcePath, targetPath);
                fs.mkdirSync(destination, {recursive: true});
                console.log(`Создана директория: ${destination}`);

                copyStatic(childDirPath, sourcePath, targetPath);
            } else {
                let filePath = dirPath + x;
                let destination = getDestDir(filePath, sourcePath, targetPath);

                fs.copyFile(filePath, destination, (_err) => {
                    console.log(`${filePath} скопирован по следующему пути: ${destination}`);
                });
            }
        } catch (e) {
            console.error('ERROR', e)
        }

    }
}

const targetPath = path.join(__dirname, '..', 'build');
const sourcePath = path.join(__dirname, '..', 'static', '/');

fs.mkdirSync(targetPath, {recursive: true});
copyStatic(sourcePath, sourcePath, targetPath);