type Indexed<T = unknown> = {
    [key in string]: T;
};

export function set(object: any, path: string, value: unknown): Indexed | unknown {
    if (typeof path !== 'string') {
        throw new Error('path must be string');
    }

    if (path === '') {
        return value;
    }

    if (typeof object !== 'object' || object === null) {
        return object;
    }

    let [key, ...restPath] = path.split('.');

    object[key] = set(object.hasOwnProperty(key) ? object[key] : {}, restPath.join('.'), value);

    return object;
}
