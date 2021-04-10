/**
 * Тип мапы обработчиков сообщений.
 */
type TListeners<T extends keyof K, K> = {[key in T]: Array<(args: any) => void>};

export class EventBus<T extends keyof K, K> {
    listeners: TListeners<T, K>;

    constructor() {
        this.listeners = {} as TListeners<T, K>;
    }

    public on = <N extends T>(event: N, callback: (args: K[N]) => void): void => {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }

        this.listeners[event].push(callback);
    };

    public off = <N extends T>(event: N, callback: (args: K[N]) => void) => {
        if (!this.listeners[event]) {
            throw new Error(`Нет события: ${event}`);
        }

        this.listeners[event] = this.listeners[event].filter((listener) => listener !== callback);
    };

    public emit = <N extends T>(event: N, args?: K[N]) => {
        if (!this.listeners[event]) {
            throw new Error(`Нет события: ${event}`);
        }

        this.listeners[event].forEach(function (listener) {
            listener(args);
        });
    };
}
