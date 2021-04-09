import {
    WebchatApi,
} from "../api/webchatApi";
import {Store} from "../utils/Store";
import {UsersApi} from "../api/usersApi";
import {
    IAddUserData,
    IChat,
    ICreateChatReqParams,
    IGetChatsParams,
    IGetChatsRes,
    IGetUnreadMsgsRes,
    IUser
} from "../models";
import {handleResponse} from "../utils/ServiceUtils";

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

    public getMessageWS(chatId: number): Promise<WebSocket | undefined> {
        return this.webchatApi.getChatToken(chatId).then(userResponse => {
            return handleResponse<{ token: string }, WebSocket | undefined>(userResponse, (res) => {
                const user = store.getValue('user');
                console.log(res);
                debugger
                if (user?.id && res?.token && chatId) {
                    const socket = this.webchatApi.getMessagesWS(user.id, chatId, res.token);

                    socket.addEventListener('open', () => {
                        console.log('Соединение установлено');
                        socket.send(JSON.stringify({
                            content: '0',
                            type: 'get old',
                        }));
                    });
                    socket.addEventListener('error', event => {
                        console.log('Ошибка', (event as any).message);
                    });

                    return socket;
                }
            })
        })
    }

    public addUserToChat({login}: IAddUserData):
        void {
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
