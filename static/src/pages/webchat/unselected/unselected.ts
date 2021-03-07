import {WebchatPage} from "../../../components/pages/webchat/WebchatPage.js";
import {Block} from "../../../components/common/element/Block.js";
import {PhotoBlock} from "../../../components/common/photo/PhotoBlock.js";
import {ChatBlock} from "../../../components/blocks/aside/chats-container/chat-preview/ChatBlock.js";
import {AsideBlock} from "../../../components/blocks/aside/AsideBlock.js";
import {ChatsContainer} from "../../../components/blocks/aside/chats-container/ChatsContainer.js";

const UnselectedWebchatPage = new WebchatPage({
    children: [
        new AsideBlock({
            children: [
                new ChatsContainer({
                    events: {
                        click: function () {
                            window.location.href = "../selected/selected.html";
                        }
                    },
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
    ],
});

Block.injectInDOM(".app", UnselectedWebchatPage);