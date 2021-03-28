import {
    WebchatApi,
} from "../api/webchatApi.js";
import {Store} from "../utils/Store.js";
import {UsersApi} from "../api/usersApi.js";
import {
    IAddUserData,
    IChat,
    ICreateChatReqParams,
    IGetChatsParams,
    IGetChatsRes,
    IGetUnreadMsgsRes,
    IUser
} from "../models.js";
import {handleResponse} from "../utils/ServiceUtils.js";

let store = new Store();

export class WebchatController {
    private webchatApi = new WebchatApi();
    private usersApi = new UsersApi();

    public createChat(params: ICreateChatReqParams) {
        this.webchatApi.createChat(params).then(res => {
            handleResponse(res, (_response) => {
                this.getChats();
            });
        });
    }

    public getChats(params: IGetChatsParams = {}): void {
        this.webchatApi.getChats(params).then(res => {
            console.log(res);

            handleResponse<IGetChatsRes[]>(res, (chats) => {
                if (!chats) {
                    return;
                }

                const chatsPromises = chats.map(chat => {
                    return this.webchatApi.getUnreadMessagesCount(chat?.id)
                })

                Promise.all(chatsPromises).then(res => {
                    const unreadMsgsCountArr = res.map(resp => (JSON.parse(resp.response) as IGetUnreadMsgsRes).unread_count);
                    // TODO: В последствии могут понадобиться и другие данные из IGetChatsRes
                    const chatsPatched: IChat[] = chats.map((chat, idx) => {
                        return {
                            isSelected: false,
                            newMsgsCount: unreadMsgsCountArr[idx],
                            fullName: chat.title,
                            id: chat?.id
                        }
                    })
                    store.setValue('chats', chatsPatched);
                })
            });
        });
    }

    public addUserToChat({login}: IAddUserData): void {
        let selectedChat = (store.getValue('chats') as IChat[]).find(chat => chat.isSelected);
        this.usersApi.searchByLogin({login}).then(userResponse => {
            handleResponse<IUser[]>(userResponse, (users) => {
                if (selectedChat?.id && users) {
                    void this.webchatApi.addUsersToChat({
                        users: [users[0].id],
                        chatId: selectedChat?.id,
                    })
                }
            })
        })
    }

    public deleteUserFromChat({login}: { login: string }) {
        let selectedChat = (store.getValue('chats') as IChat[]).find(chat => chat.isSelected);
        this.usersApi.searchByLogin({login}).then(userResponse => {
            handleResponse<IUser[]>(userResponse, (users) => {
                if (selectedChat?.id && users) {
                    void this.webchatApi.deleteUsersFromChat({
                        users: [users[0].id],
                        chatId: selectedChat?.id,
                    })
                }
            })
        })
    }
}