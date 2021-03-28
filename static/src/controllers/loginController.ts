import {LoginApi} from "../api/loginApi.js";
import {router, ROUTES} from "../utils/Router.js";
import {Store} from "../utils/Store.js";
import {userTypeGuard} from "../typeguards.js";
import {ILoginData, ILogonData, ILogonResponse, IUser} from "../models.js";
import {WebchatController} from "./webchatController.js";
import {handleResponse, handleSuccessResponse} from "../utils/ServiceUtils.js";

const store = new Store();

export class LoginController {
    private loginApi = new LoginApi();
    private webchatController = new WebchatController();

    public login = (params: ILoginData) => {
        this.loginApi.login(params).then(res => {
            handleResponse(res, (_response => {
                this.getUserInfo();
                this.webchatController.getChats();
                router.go(ROUTES.WEBCHAT);
            }))
        });
    }

    public logon = (params: ILogonData): void => {
        this.loginApi.logon(params).then(res => {
            handleResponse<ILogonResponse>(res, (_response => {
                this.getUserInfo();
                this.webchatController.getChats();
                router.go(ROUTES.WEBCHAT);
            }))
        });

    }

    public logout = () => {
        this.loginApi.logout().then(res => {
            handleResponse(res, (_response => {
                store.setValue('user', null);
                store.setValue('chats', []);
                router.go(ROUTES.START.LOGIN);
            }))
        });
    }

    public getUserInfo = () => {
        this.loginApi.getUserInfo().then(res => {
            handleSuccessResponse<IUser>(res, (response => {
                if (userTypeGuard(response)) {
                    store.setValue('user', response);
                }
            }))
        });
    }
}