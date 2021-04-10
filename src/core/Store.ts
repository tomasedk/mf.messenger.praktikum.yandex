import {EventBus} from './EventBus';
import {set, get} from '../utils/mydash';
import {IChat, IUser} from '../models';

enum EVENTS {
    VALUE_CHANGED = 'VALUE_CHANGED',
}

/**
 * Типизация данных, передаваемый для соответствующих типов сообщений.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface ISystemEventDataTypes<_T> {
    [EVENTS.VALUE_CHANGED]: {
        getter: string;
        value: any;
    };
}

interface IStore {
    chats: IChat[];
    user?: IUser;
    messages: any;
}

export class Store {
    static instance: Store;

    private store: IStore;

    private eventBus: EventBus<EVENTS, ISystemEventDataTypes<any>>;

    constructor() {
        if (Store.instance) {
            return Store.instance;
        }

        this.eventBus = new EventBus<EVENTS, ISystemEventDataTypes<any>>();
        this.store = {
            chats: [],
            messages: [],
        };

        Store.instance = this;
    }

    public setValue(getter: string, value: any) {
        try {
            set(this.store, getter, value);
            this.eventBus.emit(EVENTS.VALUE_CHANGED, {getter, value});
        } catch (e) {
            console.error(e);
        }
    }

    private notify = (callback: (value: any) => void, getter: string) => {
        return (params: {getter: string; value: any}) => {
            if (getter === params.getter) {
                callback(params.value);
            }
        };
    };

    public getValue(getter: string): IChat[] | any {
        switch (getter) {
            case 'chats':
                return this.store.chats as IChat[];
            default:
                return get(this.store, getter);
        }
    }

    public subscribe(callback: (value: any) => void, getter: string) {
        this.eventBus.on(EVENTS.VALUE_CHANGED, this.notify(callback, getter));
    }
}
