import {IOptions, HTTPTransport} from "../utils/ServiceUtils.js";
import {IEditProfileReq, ISearchByLoginReqParams, IChangePasswordReqParams} from "../models.js";


export class UsersApi {
    private service = new HTTPTransport('https://ya-praktikum.tech/api/v2/user');

    searchByLogin(data: ISearchByLoginReqParams) {
        const options: IOptions = {
            data: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json'
            },
        }

        return this.service.post('/search', options);
    }

    changePassword(data: IChangePasswordReqParams) {
        const options: IOptions = {
            data: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json'
            },
        }

        return this.service.put('/password', options);
    }

    editProfile(data: IEditProfileReq) {
        const options: IOptions = {
            data: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json'
            },
        }

        return this.service.put('/profile', options);
    }

    changePhoto(formData: FormData) {
        const options: IOptions = {
            data: formData,
        }

        return this.service.put('/profile/avatar', options);
    }
}