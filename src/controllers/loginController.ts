import {LoginApi} from '../api/loginApi';
import {router, ROUTES} from '../core/Router';
import {Store} from '../core/Store';
import {userTypeGuard} from '../utils/typeguards';
import {ILoginData, ILogonData, ILogonResponse, IUser} from '../models';
import {WebchatController} from './webchatController';
import {handleResponse, handleSuccessResponse} from '../core/HTTPTransport';

const store = new Store();

export class LoginController {
    private loginApi = new LoginApi();

    private webchatController = new WebchatController();

    public login = (params: ILoginData) => {
        this.loginApi.login(params).then((res) => {
            handleResponse(res, (_response) => {
                this.getUserInfo();
                this.webchatController.getChats();
                router.go(ROUTES.WEBCHAT);
            });
        });
    };

    public logon = (params: ILogonData): void => {
        this.loginApi.logon(params).then((res) => {
            handleResponse<ILogonResponse>(res, (_response) => {
                this.getUserInfo();
                this.webchatController.getChats();
                router.go(ROUTES.WEBCHAT);
            });
        });
    };

    public logout = () => {
        this.loginApi.logout().then((res) => {
            handleResponse(res, (_response) => {
                store.setValue('user', null);
                store.setValue('chats', []);
                router.go(ROUTES.START.LOGIN);
            });
        });
    };

    public getUserInfo = () => {
        this.loginApi.getUserInfo().then((res) => {
            handleSuccessResponse<IUser>(res, (response) => {
                if (userTypeGuard(response)) {
                    store.setValue('user', response);
                }
            });
        });
    };
}
