import {EventBus} from "../../../utils/EventBus.js";
import {getId} from "../../../utils/utils.js";

export interface IMeta {
    tagName?: string;
    className?: string;
}

interface IMetaPrivate extends IMeta {
    tagName: string;
}

enum EVENTS {
    INIT = "init",
    FLOW_CDM = "flow:component-did-mount",
    FLOW_CDU = "flow:component-did-update",
    FLOW_RENDER = "flow:render",
}

/**
 * Типизация данных, передаваемый для соответствующих типов сообщений.
 */
export interface ISystemEventDataTypes<T> {
    [EVENTS.INIT]: never;
    [EVENTS.FLOW_CDM]: never;
    [EVENTS.FLOW_CDU]: {
        oldProps: T,
        newProps: T,
    };
    [EVENTS.FLOW_RENDER]: never;
}

export type EventMap = {
    [key in keyof HTMLElementEventMap]?: (this: HTMLElement, ev: (HTMLElementEventMap[keyof HTMLElementEventMap])) => any;
};

export interface IBlockProps {
    events?: EventMap;
    children?: (Block<any> | undefined)[];
}

type TProps = object & IBlockProps;

export abstract class Block<T extends TProps> {
    public static injectInDOM = (query: string, block: any) => {
        const root = document.querySelector(query);
        if (block && root) {
            root.appendChild(block.element);
        }
    }

    private readonly meta: IMetaPrivate;
    private _element: HTMLElement | null = null;
    private eventBus: EventBus<EVENTS, ISystemEventDataTypes<T>>;

    protected props: T;
    protected readonly _id: string;

    protected constructor(meta: IMeta, props: T) {
        const eventBus = new EventBus<EVENTS, ISystemEventDataTypes<T>>();

        this._id = getId();

        this.meta = {
            tagName: meta.tagName || 'div',
            className: meta.className || '',
        };

        this.props = this.makePropsProxy(props);

        this.eventBus = eventBus;

        this.registerEvents();
        eventBus.emit(EVENTS.INIT);
    }

    protected registerEvents() {
        this.eventBus.on(EVENTS.INIT, this.init.bind(this));
        this.eventBus.on(EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        this.eventBus.on(EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        this.eventBus.on(EVENTS.FLOW_RENDER, this._render.bind(this));
    }

    public setProps = (nextProps: Partial<T>) => {
        if (!nextProps) {
            return;
        }

        this.props = Object.assign(this.props, nextProps);
    };

    protected createResources() {
        const {tagName, className} = this.meta;

        this._element = this.createDocumentElement(tagName, className);
    }

    private init() {
        this.createResources();
        this.eventBus.emit(EVENTS.FLOW_CDM);
    }

    private _componentDidMount() {
        this.componentDidMount(this.props);
        this.eventBus.emit(EVENTS.FLOW_RENDER);
    }

    protected componentDidMount(_oldProps: T) {
    }

    private _componentDidUpdate(oldProps: T, newProps: T) {
        const response = this.componentDidUpdate(oldProps, newProps);
        if (!response) {
            return;
        }
        this._render();
    }

    protected componentDidUpdate(_oldProps: T, _newProps: T) {
        return true;
    }

    get element() {
        return this._element;
    }

    public getId(): string {
        return this._id;
    }

    private _render() {
        const block = this.render();

        this.removerEvents();

        if (this._element) {
            this._element.innerHTML = block;
        }

        if (this.props.children && this.props.children?.length > 0) {
            for (let i = 0; i < this.props.children.length; i++) {
                const queryStr = `[data-set-id="${this.props.children[i]?._id}"]`
                let elemToReplace = this._element?.querySelector(queryStr);
                const newElem = this.props.children[i]?._element;
                if (elemToReplace && newElem) {
                    elemToReplace.replaceWith(newElem);
                }
            }
        }

        this.addEvents();
    }

    protected render(): string {
        return '';
    }

    private removerEvents() {
        const events = (this.props.events || {}) as Required<EventMap>;

        Object.keys(events).forEach((eventName: keyof HTMLElementEventMap) => {
            if (events[eventName] && this._element && events[eventName]) {
                this._element.removeEventListener(eventName, events[eventName]);
            }
        });
    }

    private addEvents() {
        const events = (this.props.events || {}) as Required<EventMap>;

        Object.keys(events).forEach((eventName: keyof HTMLElementEventMap) => {
            if (events[eventName] && this._element && events[eventName]) {
                this._element.addEventListener(eventName, events[eventName]);
            }
        });
    }

    private makePropsProxy(props: T) {
        return new Proxy<T>(props, {
            get: (target, prop: (string | symbol) & keyof T): T => {
                const value = target[prop];
                return typeof value === "function" ? value.bind(target) : value;
            },
            set: (target: T, prop: (string | symbol) & keyof T, value) => {
                target[prop] = value;

                this.eventBus.emit(EVENTS.FLOW_CDU, {
                    oldProps: {...target},
                    newProps: target,
                });
                return true;
            },
            deleteProperty() {
                throw new Error("Нет доступа");
            }
        });
    }

    private createDocumentElement(tagName: string, className: string | undefined) {
        let elem = document.createElement(tagName);

        if (className) {
            elem.className = className;
        }
        return elem;
    }
}