import {isEqual} from '../utils/mydash';
import {Block} from './Block';

export const ROUTES = {
    START: {
        LOGIN: '/',
        // LOGIN: '/mf.messenger.praktikum.yandex/src/assets/html/index.html',
        LOGON: '/logon',
    },
    WEBCHAT: '/webchat',
    PROFILE: {
        DETAILS: '/profile-details',
        EDIT: '/profile-edit',
        CHANGE_PASSWORD: '/profile-change-password',
    },
    FALLBACK: {
        NOT_FOUND: '/404',
        INTERNAL_SERVER: '/500',
    },
};

interface BlockConstructor {
    new (props: any): Block<any>;
}

class Route {
    private block: Block<any> | null = null;

    constructor(
        private pathname: string,
        private blockClass: BlockConstructor,
        private rootQuery: string,
        private ownProps: any
    ) {}

    /**
     * Обработчик перехода на роут.
     */
    public navigate = (pathname?: string) => {
        if (this.match(pathname)) {
            this.pathname = pathname as string;
            this.render();
        }
    };

    /**
     * Обработчик ухода с роута.
     */
    public leave = () => {
        if (this.block) {
            this.block.hide(this.rootQuery);
        }
    };

    /**
     * Проверка идентичности путей.
     */
    public match = (pathname?: string): boolean => {
        return isEqual(pathname, this.pathname);
    };

    /**
     * Обработчик отрисовки роута.
     */
    public render = () => {
        if (!this.block) {
            this.block = new this.blockClass(this.ownProps);
            Block.injectInDOM(this.rootQuery, this.block);

            return;
        }
        Block.injectInDOM(this.rootQuery, this.block);
    };
}

export class Router {
    static instance: Router;

    private routes: Route[];

    private currentRoute: Route | null;

    private history: History;

    private readonly rootQuery: string;

    constructor(rootQuery: string) {
        if (Router.instance) {
            return Router.instance;
        }

        this.routes = [];
        this.history = window.history;
        this.currentRoute = null;
        this.rootQuery = rootQuery;

        Router.instance = this;
    }

    public use(pathname: string, block: BlockConstructor, ownProps?: any) {
        const route = new Route(pathname, block, this.rootQuery, ownProps || {});
        this.routes.push(route);
        return this;
    }

    public start() {
        window.onpopstate = (_event: PopStateEvent) => {
            this.onRoute(window.location.pathname);
        };

        this.onRoute(window.location.pathname);
    }

    private onRoute(pathname: string) {
        const route = this.getRoute(pathname);

        if (!route) {
            return;
        }

        if (this.currentRoute) {
            this.currentRoute.leave();
        }

        this.currentRoute = route;

        route.navigate();
        route.render();
    }

    public go(pathname: string) {
        this.history.pushState({}, '', pathname);
        this.onRoute(pathname);
    }

    public back() {
        this.history.back();
    }

    public forward() {
        this.history.forward();
    }

    private getRoute(pathname: string): Route | undefined {
        return this.routes.find((route) => route.match(pathname));
    }
}

export const router = new Router('.app');
