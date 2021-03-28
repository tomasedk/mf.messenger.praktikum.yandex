import {Block, IBlockProps} from "../../common/block/Block.js";
import {templateString} from './ChatViewBlock.template.js'
import {MessagesContainer} from "./messages-container/MessagesContainer.js";

interface IHeader {
    username: string;
    onlineTimeAgo: string;
}

interface IProps extends IBlockProps {
    header: IHeader;
    children: MessagesContainer[];
}

interface IContextTemplate {
    header: IHeader;
    messages: string;
}

export class ChatViewBlock extends Block<IProps> {
    constructor(props: IProps) {
        super({tagName: "div"}, props);
    }

    componentDidMount() {
        this.props.events = {
            click: function (e: Event) {
                const target = e.target as Element;
                const attach = target.closest('.attach-to-message');
                const userActions = target.closest('.user-actions');
                const sendButton = target.closest('.round-button__send');
                const addUserActionButton = target.closest('.user-actions-popup__action_add');

                /**
                 * Обработчик отображения/скрытия попапа "скрепки".
                 */
                if (attach && this.contains(attach)) {
                    const attachPopup = document.querySelector('.attach-popup') as HTMLUListElement | null;
                    if (attachPopup) {
                        const isVisible = getComputedStyle(attachPopup).visibility === 'visible';
                        attachPopup.style.visibility = isVisible ? 'hidden' : 'visible';
                    }
                }

                /**
                 * Обработчик отображения/скрытия попапа с действиями пользователя.
                 */
                if (userActions && this.contains(userActions)) {
                    const userActionsPopup = document.querySelector('.user-actions-popup') as HTMLUListElement | null;
                    if (userActionsPopup) {
                        const isVisible = getComputedStyle(userActionsPopup).visibility === 'visible';
                        userActionsPopup.style.visibility = isVisible ? 'hidden' : 'visible';
                    }
                }

                /**
                 * Обработчик отправки сообщений.
                 */
                if (sendButton && this.contains(sendButton)) {
                    const messageInput = document.querySelector('.input-message') as HTMLInputElement | null;
                    if (messageInput) {
                        console.log(messageInput?.value);
                        messageInput.value = ''
                    }
                }

                /**
                 * Обработчик открытия модального окна добавления пользователя.
                 */
                if (addUserActionButton && this.contains(addUserActionButton)) {
                    const userActionsPopup = document.querySelector('.user-actions-popup') as HTMLUListElement | null;
                    const addUserModal = document.querySelector('.add-user-modal') as HTMLDivElement | null;

                    if (userActionsPopup) {
                        userActionsPopup.style.visibility = 'hidden';
                    }
                    if (addUserModal) {
                        addUserModal.style.visibility = 'visible';
                    }
                }
            }
        }
    }

    render() {
        const template = window.Handlebars.compile<IContextTemplate>(templateString);

        const context = {
            header: this.props.header,
            messages: this.props.children?.[0]?.getId(),
        }
        return template(context);
    }
}