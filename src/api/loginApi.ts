import {IOptions, HTTPTransport} from "../core/HTTPTransport";
import {ILoginData, ILogonData} from "../models";

export class LoginApi {
    private service = new HTTPTransport('https://ya-praktikum.tech/api/v2/auth');

    login(data: ILoginData) {
        const options: IOptions = {
            data: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json'
            },
        }

        return this.service.post('/signin', options);
    }

    logon(data: ILogonData) {
        const options: IOptions = {
            data: JSON.stringify(data),
            headers: {'Content-Type': 'application/json'},
        }

        return this.service.post('/signup', options);
    }

    logout() {
        const options: IOptions = {
            headers: {'Content-Type': 'application/json'},
        }

        return this.service.post('/logout', options);
    }

    getUserInfo() {
        const options: IOptions = {
            headers: {'Content-Type': 'application/json'},
        }

        return this.service.get('/user', options);
    }
}
