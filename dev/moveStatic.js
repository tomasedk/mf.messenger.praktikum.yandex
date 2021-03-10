const fs = require('fs');
const path = require("path");

/**
 * TODO: удалить после ревью. Комментарии к работе:
 *
 * К сожалению, не удалось разбить проект на static, src, build, так как неясно становится, как корректно указывать
 * относительные пути между файлами (например, в css указать путь на *.svg, в js редирект на нужный html,
 * в html подгрузить корректный js и т.д.). Всё, что удалось - написать скрипт (этот файл) переноса статики в нужную директорию.
 *
 * --max-old-space-size=8192 использовал на предыдущем проекте ввиду его монолитности. Убрал.
 *
 * Нашел, как делаются редиреты в netlify:
 * [[redirects]]
 *      from = "/old-path"
 *      to = "/new-path"
 *
 * С Вашего одобрения все же хотелось бы оставить такой временный костыль, потому что иначе придется еще и для server.js
 * обрабатывать редирект, если я верно понимаю.
 *
 * Добавил простенькую реализацию id на основе Web Crypto API.
 *
 * Насчет подгрузки Handlebars с cdn, а не как npm-пакета. Проблема в том, что без полноценной сборки,
 * обычные модули не допускаются: https://learn.javascript.ru/modules-intro#ne-dopuskayutsya-golye-moduli
 * Поэтому пришлось идти на такие ухищрения с as any и cdn.
 *
 * На netlify не было валидации, потому что там была неактульная ветка deploy. Поправил.
 *
 * Все остальные замечания постарался по-максимуму исправить.
 * Спасибо за ревью и за ссылки!
 */

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