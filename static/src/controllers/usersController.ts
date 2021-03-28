import {router, ROUTES} from "../utils/Router.js";
import {UsersApi} from "../api/usersApi.js";
import {Store} from "../utils/Store.js";
import {IEditProfileReq, IEditProfileRes, IChangePasswordReqParams} from "../models.js";
import {handleResponse} from "../utils/ServiceUtils.js";

let store = new Store();

export class UsersController {
    private usersApi = new UsersApi();

    public changePassword = (params: IChangePasswordReqParams) =>{
        void this.usersApi.changePassword(params).then(res => {
            handleResponse(res);
            router.go(ROUTES.PROFILE.DETAILS);
        });
    }

    public editProfile = (params: IEditProfileReq) =>{
        void this.usersApi.editProfile(params).then(res => {
            handleResponse<IEditProfileRes>(res, response => {
                store.setValue('user', response);
            });
            router.go(ROUTES.PROFILE.DETAILS);
        });
    }

    public changePhoto = (formData: FormData) =>{
        void this.usersApi.changePhoto(formData).then(res => {
            handleResponse(res);
        });
    }
}