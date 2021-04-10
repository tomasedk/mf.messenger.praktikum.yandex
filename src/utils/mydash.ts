export type PlainObject<T = unknown> = {
    [k in string]: T;
};

/**
 * Проверка, является ли значение массивом.
 */
export function isArray(value: unknown): value is [] {
    return Array.isArray(value);
}

/**
 * Проверка, является ли значение объектом.
 */
export function isObject(value: unknown): value is PlainObject {
    return (
        typeof value === 'object' &&
        value !== null &&
        value.constructor === Object &&
        Object.prototype.toString.call(value) === '[object Object]'
    );
}

/**
 * Проверка, является ли значение массивом или объектом.
 */
export function isArrayOrObject(value: unknown): value is [] | PlainObject {
    return isArray(value) || isObject(value);
}

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

    for (const key of Object.keys(a)) {
        if (!isEqual(a[key], b[key])) {
            answer = false;
        }
    }

    return answer;
}

/**
 * Функция-сеттер по ключу, переданному в виде строки.
 *
 * @param object Объект, в который необходимо произвести запись.
 * @param path Путь в объекте, по которому необходимо произвести запись.
 * @param value Значение, которое необходимо установить.
 */
export function set(object: any, path: string, value: unknown): PlainObject | unknown {
    if (path === '') {
        return value;
    }

    if (typeof object !== 'object' || object === null) {
        return object;
    }

    const [key, ...restPath] = path.split('.');

    object[key] = set(
        Object.prototype.hasOwnProperty.call(object, key) ? object[key] : {},
        restPath.join('.'),
        value
    );

    return object;
}

/**
 * Функция-геттер по ключу, переданному в виде строки.
 *
 * @param object Объект, из которого берется значение.
 * @param path Путь в объекте, по которому берется значение.
 * @param [defaultValue] Возвращаемое по-умолчанию значение.
 */
export function get(object: any, path: string, defaultValue?: unknown): PlainObject | unknown {
    const keys = path.split('.');

    let result = object;
    for (const key of keys) {
        result = result[key];

        if (result === undefined) {
            return defaultValue;
        }
    }

    return result || defaultValue;
}
