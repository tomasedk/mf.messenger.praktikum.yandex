import {WebchatPage} from "../../../components/pages/webchat/WebchatPage.js";
import {Block} from "../../../components/common/block/Block.js";
import {PhotoBlock} from "../../../components/common/photo/PhotoBlock.js";
import {ChatBlock} from "../../../components/blocks/aside/chats-container/chat-preview/ChatBlock.js";
import {AsideBlock} from "../../../components/blocks/aside/AsideBlock.js";
import {ChatsContainer} from "../../../components/blocks/aside/chats-container/ChatsContainer.js";
import {MessagesContainer} from "../../../components/blocks/chat-view/messages-container/MessagesContainer.js";
import {Message} from "../../../components/blocks/chat-view/messages-container/message/Message.js";
import {ChatViewBlock} from "../../../components/blocks/chat-view/ChatViewBlock.js";
import {Modal} from "../../../components/common/modal/Modal.js";
import {Button} from "../../../components/common/button/Button.js";
import {Input} from "../../../components/common/input/Input.js";

const UnselectedWebchatPage = new WebchatPage({
    children: [
        new AsideBlock({
            children: [
                new ChatsContainer({
                    children: [
                        new ChatBlock({
                            isSelected: false,
                            newMsgsCount: 21,
                            msgDate: '10:23',
                            msgText: 'Салют! Как дела?',
                            children: [
                                new PhotoBlock({
                                    initials: 'МЛ',
                                    additionalClasses: 'chat__user-photo'
                                })
                            ],
                            fullName: 'Максим Лукьянов',
                        }),
                        new ChatBlock({
                            isSelected: false,
                            newMsgsCount: 1,
                            msgDate: '02:23',
                            msgText: 'Дружище, привет! Сегодня отличная погода. Как насчет прогулки?',
                            children: [
                                new PhotoBlock({
                                    initials: 'ПЛ',
                                    additionalClasses: 'chat__user-photo'
                                })
                            ],
                            fullName: 'Петр Леонтьев',
                        }),
                        new ChatBlock({
                            isSelected: true,
                            isYourLastMsg: true,
                            newMsgsCount: 0,
                            msgDate: '02:17',
                            msgText: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda autem commodi consequatur consequuntur dicta eveniet facilis nihil nulla pariatur voluptas!',
                            children: [
                                new PhotoBlock({
                                    initials: 'ИИ',
                                    additionalClasses: 'chat__user-photo'
                                })
                            ],
                            fullName: 'Иван Иванов',
                        }),
                    ]
                })]
        }),
        new Modal({
            additionalClasses: 'add-user-modal',
            title: 'Добавить пользователя',
            formClass: 'modal__add-user-form',
            children: [
                new Button({className: 'modal__action'}, {
                    value: 'Добавить',
                }),
                new Input({className: 'modal__body'}, {
                    id: 'login',
                    type: 'text',
                    label: 'Логин',
                })
            ]
        }),
        new ChatViewBlock({
            header: {
                username: 'Иван Иванов',
                onlineTimeAgo: '2',
            },
            children: [
                new MessagesContainer({
                    children: [
                        new Message({
                            children: [
                                new PhotoBlock({
                                    initials: 'ИИ',
                                    additionalClasses: 'message__user-photo'
                                })],
                            msgText: 'Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой. \n\nХассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.',
                            isYourMsg: false,
                            msgDate: '02:17',
                            isRead: false,
                        }),
                        new Message({
                            children: [
                                new PhotoBlock({
                                    initials: 'ИИ',
                                    additionalClasses: 'message__user-photo'
                                })],
                            attachedImg: true,
                            msgText: 'Как насчет чашечки кофе?',
                            isYourMsg: false,
                            msgDate: '02:19',
                            isRead: false,
                        }),
                        new Message({
                            children: [
                                new PhotoBlock({
                                    initials: 'ТД',
                                    additionalClasses: 'message__user-photo'
                                })],
                            msgText: 'Круто!',
                            isYourMsg: true,
                            msgDate: '02:23',
                            isRead: true,
                        }),
                        new Message({
                            children: [
                                new PhotoBlock({
                                    initials: 'ТД',
                                    additionalClasses: 'message__user-photo'
                                })],
                            msgText: 'Есть еще котики?',
                            isYourMsg: true,
                            msgDate: '02:24',
                            isRead: false,
                        }),
                    ]
                })
            ]
        })
    ]
});

Block.injectInDOM(".app", UnselectedWebchatPage);