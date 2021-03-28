import {isArrayOrObject, isObject, PlainObject} from './isArrayOrObject.js';
import {router, ROUTES} from "./Router.js";

/**
 * Получение ключа параметра.
 */
function getKey(key: string, parentKey?: string) {
    return parentKey ? `${parentKey}[${key}]` : key;
}

/**
 * Получение массива параметров.
 */
function getParams(data: PlainObject | [], parentKey?: string) {
    const result: [string, string][] = [];

    for (const [key, value] of Object.entries(data)) {
        if (isArrayOrObject(value)) {
            result.push(...getParams(value, getKey(key, parentKey)));
        } else {
            result.push([getKey(key, parentKey), encodeURIComponent(String(value))]);
        }
    }

    return result;
}

/**
 * Преобразование объекта в строку с query-параметрами.
 */
function queryString(data: PlainObject): string {
    if (!isObject(data)) {
        throw new Error('input must be an object');
    }

    return getParams(data).map(arr => arr.join('=')).join('&');
}

/**
 * @param timeout Время на запрос.
 * @param data Возможность работы с информацией: GET-параметры и JSON;
 * @param headers Объект, для описания заголовков, у которого ключ и значение всегда string.
 */
export interface IOptions {
    timeout?: number;
    data?: any;
    headers?: any;
}

/**
 * @param method Метод запроса.
 * @param data Возможность работы с информацией: GET-параметры и JSON;
 * @param headers Объект, для описания заголовков, у которого ключ и значение всегда string.
 */
interface IExtendedOptions {
    method?: EMethod
    data?: any;
    headers?: any;
}

enum EMethod {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
}

export class HTTPTransport {
    constructor(private baseUrl: string = '') {
    }

    get = (url: string, options: IOptions = {}) => this.request(url, {
        ...options,
        method: EMethod.GET
    }, options.timeout);
    post = (url: string, options: IOptions = {}) => this.request(url, {
        ...options,
        method: EMethod.POST
    }, options.timeout);
    put = (url: string, options: IOptions = {}) => this.request(url, {
        ...options,
        method: EMethod.PUT
    }, options.timeout);
    delete = (url: string, options: IOptions = {}) => this.request(url, {
        ...options,
        method: EMethod.DELETE
    }, options.timeout);
    request = (url: string, options: IExtendedOptions = {}, timeout = 5000): Promise<XMLHttpRequest> => {
        const {headers = {}, method, data} = options;
        const that = this;

        return new Promise(function (resolve, reject) {
            if (!method) {
                reject('No method');
                return;
            }

            const xhr = new XMLHttpRequest();
            const isGet = method === EMethod.GET;

            xhr.open(
                method,
                isGet && !!data
                    ? `${that.baseUrl}${url}${queryString(data)}`
                    : `${that.baseUrl}${url}`,
            );

            xhr.withCredentials = true;

            Object.keys(headers).forEach(key => {
                xhr.setRequestHeader(key, headers[key]);
            });

            xhr.onload = function () {
                resolve(xhr);
            };

            xhr.onabort = reject;
            xhr.onerror = reject;

            xhr.timeout = timeout;
            xhr.ontimeout = reject;

            if (isGet || !data) {
                xhr.send();
            } else {
                xhr.send(data);
            }
        });
    };
}

/**
 * Обработчик успешного ответа от сервера.
 */
export const handleSuccessResponse = <T>(response: XMLHttpRequest, callback?: (response?: T) => void) => {
    try {
        callback?.(JSON.parse(response.response) as T);
    } catch (e) {
        callback?.();
    }
}

/**
 * Обработчик ответа от сервера.
 */
export const handleResponse = <T = unknown>(response: XMLHttpRequest, callback?: (response?: T) => void) => {
    if (response.status >= 200 && response.status < 300) {
        handleSuccessResponse(response, callback);
    } else if (response.status >= 400 && response.status < 500) {
        router.go(ROUTES.FALLBACK.NOT_FOUND);
    } else if (response.status >= 500) {
        router.go(ROUTES.FALLBACK.NOT_FOUND);
    } else {
        console.log(JSON.parse(response.response) as T);
    }
}