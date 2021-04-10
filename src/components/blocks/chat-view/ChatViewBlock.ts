import {compile} from 'handlebars';
import {Block, IBlockProps} from '../../../core/Block';
import {templateString} from './ChatViewBlock.template';
import {MessagesContainer} from './messages-container/MessagesContainer';
import {WebchatController} from '../../../controllers/webchatController';
import {Store} from '../../../core/Store';
import {IMessage} from './messages-container/message/Message';

interface IHeader {
    username: string;
    onlineTimeAgo: string;
}

interface IProps extends IBlockProps {
    header: IHeader;
    chatId?: number;
    children: [MessagesContainer];
}

interface IContextTemplate {
    header: IHeader;
    messages: string;
}

const webchatController = new WebchatController();
const store = new Store();

const getMessage = (currentUserId: number, {content, time, user_id}: any): IMessage => {
    return {
        isYourMsg: user_id === currentUserId,
        msgText: content,
        msgDate: time,
        isRead: false,
        attachedImg: false,
    };
};

export class ChatViewBlock extends Block<IProps> {
    private socket: WebSocket | null = null;

    constructor(props: IProps) {
        super({tagName: 'div'}, props);
    }

    componentDidMount() {
        const that = this;
        if (this.props.chatId) {
            webchatController.getMessageWS(this.props.chatId).then((socket) => {
                if (socket) {
                    this.socket = socket;
                    socket.addEventListener('message', (event) => {
                        /* content: "Моё первое сообщение миру!", id: 2, time: "2021-04-07T20:10:02+00:00", type: "message", user_id: 5890 */

                        const user = store.getValue('user');
                        const res = JSON.parse(event.data);

                        let messages: IMessage[];
                        if (Array.isArray(res)) {
                            messages = res.map((message) => getMessage(user.id, message));
                        } else {
                            messages = [getMessage(user.id, res)];
                        }
                        const prevMessages = store.getValue('messages');

                        store.setValue('messages', [...prevMessages, ...messages]);
                    });
                    socket.addEventListener('close', (event) => {
                        this.socket = null;
                        if (event.wasClean) {
                            console.log('Соединение закрыто чисто');
                        } else {
                            console.error('Обрыв соединения');
                        }

                        console.log(`Код: ${event.code} | Причина: ${event.reason}`);
                    });
                }
            });
        }
        this.props.events = {
            click(e: Event) {
                const target = e.target as Element;
                const attach = target.closest('.attach-to-message');
                const userActions = target.closest('.user-actions');
                const sendButton = target.closest('.round-button__send');
                const addUserActionButton = target.closest('.user-actions-popup__action_add');

                /**
                 * Обработчик отображения/скрытия попапа "скрепки".
                 */
                if (attach && this.contains(attach)) {
                    const attachPopup = document.querySelector(
                        '.attach-popup'
                    ) as HTMLUListElement | null;
                    if (attachPopup) {
                        const isVisible = getComputedStyle(attachPopup).visibility === 'visible';
                        attachPopup.style.visibility = isVisible ? 'hidden' : 'visible';
                    }
                }

                /**
                 * Обработчик отображения/скрытия попапа с действиями пользователя.
                 */
                if (userActions && this.contains(userActions)) {
                    const userActionsPopup = document.querySelector(
                        '.user-actions-popup'
                    ) as HTMLUListElement | null;
                    if (userActionsPopup) {
                        const isVisible =
                            getComputedStyle(userActionsPopup).visibility === 'visible';
                        userActionsPopup.style.visibility = isVisible ? 'hidden' : 'visible';
                    }
                }

                /**
                 * Обработчик отправки сообщений.
                 */
                if (sendButton && this.contains(sendButton)) {
                    const messageInput = document.querySelector(
                        '.input-message'
                    ) as HTMLInputElement | null;
                    if (messageInput) {
                        if (that.socket) {
                            that.socket.send(
                                JSON.stringify({
                                    content: messageInput?.value,
                                    type: 'message',
                                })
                            );
                        }
                        messageInput.value = '';
                    }
                }

                /**
                 * Обработчик открытия модального окна добавления пользователя.
                 */
                if (addUserActionButton && this.contains(addUserActionButton)) {
                    const userActionsPopup = document.querySelector(
                        '.user-actions-popup'
                    ) as HTMLUListElement | null;
                    const addUserModal = document.querySelector(
                        '.add-user-modal'
                    ) as HTMLDivElement | null;

                    if (userActionsPopup) {
                        userActionsPopup.style.visibility = 'hidden';
                    }
                    if (addUserModal) {
                        addUserModal.style.visibility = 'visible';
                    }
                }
            },
        };
    }

    render() {
        return compile<IContextTemplate>(templateString)({
            header: this.props.header,
            messages: this.props.children?.[0]?.getId(),
        });
    }
}
