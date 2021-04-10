/**
 * Примитивная генерация id, основанная на Web Crypto API.
 */
export function uuid(): string {
    return window.crypto.getRandomValues(new Uint32Array(1))[0].toString(16);
}
