import {Block} from "../../common/block/Block.js";
import {templateString} from './WebchatPage.template.js'
import {AsideBlock} from "../../blocks/aside/AsideBlock.js";
import {Modal} from "../../common/modal/Modal.js";
import {ChatViewBlock} from "../../blocks/chat-view/ChatViewBlock.js";
import {WebchatController} from "../../../controllers/webchatController.js";
import {Store} from "../../../utils/Store.js";
import {MessagesContainer} from "../../blocks/chat-view/messages-container/MessagesContainer.js";
import {Form} from "../../common/form/Form.js";
import {getValuesFromForm} from "../../../utils/formUtils.js";
import {Button} from "../../common/button/Button.js";
import {Input} from "../../common/input/Input.js";
import {Link} from "../../common/link/Link.js";
import {router, ROUTES} from "../../../utils/Router.js";
import {ChatsContainer} from "../../blocks/aside/chats-container/ChatsContainer.js";
import {addUserTypeGuard} from "../../../typeguards.js";
import {IChat} from "../../../models.js";

export interface IProps {
    children: [AsideBlock, Modal?, ChatViewBlock?];
}

interface IContextTemplate {
    aside: string;
    modal?: string;
    selectedChat?: string;
}

const webchatController = new WebchatController();
const store = new Store();

export class WebchatPage extends Block<IProps> {
    constructor(props: IProps) {
        props.children = [
            new AsideBlock({
                children: [
                    new Link({}, {
                        additionalClasses: 'profile-link',
                        text: {label: 'Профиль', className: 'profile-link__text'},
                        img: {
                            alt: 'Blue arrow',
                            className: 'profile-link__arrow',
                            src: '../../../../sources/arrow.svg'
                        },
                        events: {
                            click: function (_e) {
                                router.go(ROUTES.PROFILE.DETAILS);
                            }
                        }
                    }),
                    new ChatsContainer({
                        children: []
                    })]
            }),
            new Modal({
                additionalClasses: 'add-user-modal',
                title: 'Добавить пользователя',
                children: [
                    new Form({className: 'modal__add-user-form'}, {
                        events: {
                            submit: function (event: Event) {
                                event.preventDefault();
                                /**
                                 * Обработчик добавления нового пользователя.
                                 */
                                const addUserForm = (event.target as Element)?.closest('.modal__add-user-form') as HTMLFormElement | null;
                                const addUserModalInput = document.querySelector('#login') as HTMLInputElement | null;
                                const addUserModal = document.querySelector('.add-user-modal') as HTMLDivElement | null;

                                if (!addUserForm || !addUserModalInput || !addUserModal) {
                                    return;
                                }

                                const addUserFormData = getValuesFromForm(addUserForm);

                                if (addUserTypeGuard(addUserFormData)) {
                                    webchatController.addUserToChat(addUserFormData);
                                }

                                addUserModalInput.value = '';
                                addUserModal.style.visibility = 'hidden';
                            },
                        },
                        children: [
                            new Button({className: 'modal__action'}, {
                                value: 'Добавить',
                            }),
                            new Input({className: 'modal__body'}, {
                                id: 'login',
                                type: 'text',
                                label: 'Логин',
                            }),
                        ]
                    })
                ]
            })
        ];

        super({tagName: "div", className: "messenger"}, props);
    }

    componentDidMount() {
        let chats: IChat[] = store.getValue('chats');

        if (chats?.length < 1) {
            webchatController.getChats();
        }

        store.subscribe((chats: IChat[]) => {
            let selectedChat = chats.find(chat => chat.isSelected);

            if (selectedChat) {
                let children = [...this.props.children] as [AsideBlock, Modal?, ChatViewBlock?];
                children[2] = new ChatViewBlock({
                    header: {
                        username: selectedChat.fullName,
                        onlineTimeAgo: '2',
                    },
                    children: [
                        new MessagesContainer({
                            chatId: selectedChat.id,
                        })
                    ]
                });

                // TODO: Такой хак сделан, так как Block отслеживает прямое изменение пропов, а не вложенные объекты
                this.props.children = children;
            }
        }, 'chats');
    }

    render() {
        const template = window.Handlebars.compile<IContextTemplate>(templateString);

        const context = {
            aside: this.props.children[0]?.getId(),
            modal: this.props.children[1]?.getId(),
            selectedChat: this.props.children[2]?.getId(),
        }
        return template(context);
    }
}
