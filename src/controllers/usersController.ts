import {router, ROUTES} from '../core/Router';
import {UsersApi} from '../api/usersApi';
import {Store} from '../core/Store';
import {IEditProfileReq, IEditProfileRes, IChangePasswordReqParams} from '../models';
import {handleResponse} from '../core/HTTPTransport';

const store = new Store();

export class UsersController {
    private usersApi = new UsersApi();

    public changePassword = (params: IChangePasswordReqParams) => {
        void this.usersApi.changePassword(params).then((res) => {
            handleResponse(res);
            router.go(ROUTES.PROFILE.DETAILS);
        });
    };

    public editProfile = (params: IEditProfileReq) => {
        void this.usersApi.editProfile(params).then((res) => {
            handleResponse<IEditProfileRes>(res, (response) => {
                store.setValue('user', response);
            });
            router.go(ROUTES.PROFILE.DETAILS);
        });
    };

    public changePhoto = (formData: FormData) => {
        void this.usersApi.changePhoto(formData).then((res) => {
            handleResponse(res);
        });
    };
}
