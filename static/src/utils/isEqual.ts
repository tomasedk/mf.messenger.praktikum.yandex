import {isObject} from './isArrayOrObject';

/**
 * Функция, выполняющая глубокое сравнение между двумя значениями и определяющая — являются ли они эквивалентными.
 */
export function isEqual(a: any, b: any): boolean {
    if (!isObject(a) && !isObject(b)) {
        return a === b;
    }

    if (Object.keys(a).length !== Object.keys(b).length) {
        return false;
    }

    let answer = true;

    for (let key of Object.keys(a)) {
        if (!isEqual(a[key], b[key])) {
            answer = false;
        }
    }

    return answer
}
