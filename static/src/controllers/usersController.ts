import {router, ROUTES} from "../utils/Router";
import {UsersApi} from "../api/usersApi";
import {Store} from "../utils/Store";
import {IEditProfileReq, IEditProfileRes, IChangePasswordReqParams} from "../models";
import {handleResponse} from "../utils/ServiceUtils";

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
