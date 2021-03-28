import {IOptions, HTTPTransport} from "../utils/ServiceUtils.js";
import {IAddToChatParams, ICreateChatReqParams, IGetChatsParams} from "../models";

export class WebchatApi {
    private service = new HTTPTransport('https://ya-praktikum.tech/api/v2/chats');

    getChats(data: IGetChatsParams) {
        const options: IOptions = {
            data,
            headers: {
                'Content-Type': 'application/json',
                'Set-Cookie': 'HttpOnly'
            },
        }

        return this.service.get('', options);
    }

    getUnreadMessagesCount(id: number) {
        const options: IOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Set-Cookie': 'HttpOnly'
            },
        }

        return this.service.get(`/new/${id}`, options);
    }


    createChat(data: ICreateChatReqParams) {
        const options: IOptions = {
            data: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Set-Cookie': 'HttpOnly'
            },
        }

        return this.service.post('', options);
    }

    addUsersToChat(data: IAddToChatParams): Promise<XMLHttpRequest> {
        const options: IOptions = {
            data: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Set-Cookie': 'HttpOnly'
            },
        }

        return this.service.put('/users', options);
    }

    deleteUsersFromChat(data: IAddToChatParams): Promise<XMLHttpRequest> {
        const options: IOptions = {
            data: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Set-Cookie': 'HttpOnly'
            },
        }

        return this.service.delete('/users', options);
    }
}