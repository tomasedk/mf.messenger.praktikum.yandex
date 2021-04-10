import {compile} from 'handlebars';
import {Block} from '../../../core/Block';
import {templateString} from './WebchatPage.template';
import {AsideBlock} from '../../blocks/aside/AsideBlock';
import {Modal} from '../../common/modal/Modal';
import {ChatViewBlock} from '../../blocks/chat-view/ChatViewBlock';
import {WebchatController} from '../../../controllers/webchatController';
import {Store} from '../../../core/Store';
import {MessagesContainer} from '../../blocks/chat-view/messages-container/MessagesContainer';
import {Form} from '../../common/form/Form';
import {getValuesForm} from '../../../utils/formUtils';
import {Button} from '../../common/button/Button';
import {Input} from '../../common/input/Input';
import {Link} from '../../common/link/Link';
import {router, ROUTES} from '../../../core/Router';
import {ChatsContainer} from '../../blocks/aside/chats-container/ChatsContainer';
import {addUserTypeGuard} from '../../../utils/typeguards';
import {IChat} from '../../../models';

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
                    new Link(
                        {},
                        {
                            additionalClasses: 'profile-link',
                            text: {label: 'Профиль', className: 'profile-link__text'},
                            img: {
                                alt: 'Blue arrow',
                                className: 'profile-link__arrow',
                                src: '../../../../assets/images/arrow.svg',
                            },
                            events: {
                                click(_e) {
                                    router.go(ROUTES.PROFILE.DETAILS);
                                },
                            },
                        }
                    ),
                    new ChatsContainer({
                        children: [],
                    }),
                ],
            }),
            new Modal({
                additionalClasses: 'add-user-modal',
                title: 'Добавить пользователя',
                children: [
                    new Form(
                        {className: 'modal__add-user-form'},
                        {
                            events: {
                                submit(event: Event) {
                                    event.preventDefault();
                                    /**
                                     * Обработчик добавления нового пользователя.
                                     */
                                    const addUserForm = (event.target as Element)?.closest(
                                        '.modal__add-user-form'
                                    ) as HTMLFormElement | null;
                                    const addUserModalInput = document.querySelector(
                                        '#login'
                                    ) as HTMLInputElement | null;
                                    const addUserModal = document.querySelector(
                                        '.add-user-modal'
                                    ) as HTMLDivElement | null;

                                    if (!addUserForm || !addUserModalInput || !addUserModal) {
                                        return;
                                    }

                                    const addUserFormData = getValuesForm(addUserForm);

                                    if (addUserTypeGuard(addUserFormData)) {
                                        webchatController.addUserToChat(addUserFormData);
                                    }

                                    addUserModalInput.value = '';
                                    addUserModal.style.visibility = 'hidden';
                                },
                            },
                            children: [
                                new Button(
                                    {className: 'modal__action'},
                                    {
                                        value: 'Добавить',
                                    }
                                ),
                                new Input(
                                    {className: 'modal__body'},
                                    {
                                        id: 'login',
                                        type: 'text',
                                        label: 'Логин',
                                    }
                                ),
                            ],
                        }
                    ),
                ],
            }),
        ];

        super({tagName: 'div', className: 'messenger'}, props);
    }

    componentDidMount() {
        const chats: IChat[] = store.getValue('chats');

        if (chats?.length < 1) {
            webchatController.getChats();
        }

        store.subscribe((chats: IChat[]) => {
            const selectedChat = chats.find((chat) => chat.isSelected);

            if (selectedChat) {
                const children = [...this.props.children] as [AsideBlock, Modal?, ChatViewBlock?];
                children[2] = new ChatViewBlock({
                    chatId: selectedChat.id,
                    header: {
                        username: selectedChat.fullName,
                        onlineTimeAgo: '2',
                    },
                    children: [
                        new MessagesContainer({
                            chatId: selectedChat.id,
                        }),
                    ],
                });

                // TODO: Такой хак сделан, так как Block отслеживает прямое изменение пропов, а не вложенные объекты
                this.props.children = children;
            }
        }, 'chats');
    }

    render() {
        return compile<IContextTemplate>(templateString)({
            aside: this.props.children[0]?.getId(),
            modal: this.props.children[1]?.getId(),
            selectedChat: this.props.children[2]?.getId(),
        });
    }
}
