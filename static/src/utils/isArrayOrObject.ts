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
    return typeof value === 'object'
        && value !== null
        && value.constructor === Object
        && Object.prototype.toString.call(value) === '[object Object]';
}

/**
 * Проверка, является ли значение массивом или объектом.
 */
export function isArrayOrObject(value: unknown): value is [] | PlainObject {
    return isArray(value) || isObject(value);
}