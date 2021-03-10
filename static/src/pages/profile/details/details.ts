import {Block} from "../../../components/common/block/Block.js";
import {PhotoBlock} from "../../../components/common/photo/PhotoBlock.js";
import {ProfilePage} from "../../../components/pages/profile/ProfilePage.js";
import {Link} from "../../../components/common/link/Link.js";
import {Field} from "../../../components/common/field/Field.js";
import {FieldsBlock} from "../../../components/blocks/fields/FieldsBlock.js";

const ProfileDetailsPage = new ProfilePage({
    isEdit: false,
    username: 'Тимур Д',
    children: [
        new FieldsBlock({className: "profile-page__body"}, {
            children: [
                new Field({name: 'Почта', value: 'timur@yandex.ru'}),
                new Field({name: 'Логин', value: 'timur'}),
                new Field({name: 'Имя', value: 'Тимур'}),
                new Field({name: 'Фамилия', value: 'Д'}),
                new Field({name: 'Имя в чате', value: 'super_t'}),
                new Field({name: 'Телефон', value: '+7 (999) 999 99 99'}),
            ]
        }),
        new PhotoBlock({
            initials: 'ТД',
            additionalClasses: 'profile-page__photo'
        }),
        new Link({}, {
            additionalClasses: 'backlink',
            href: '../../webchat/unselected/unselected.html',
            text: ''
        }),
        new FieldsBlock({className: "profile-page__actions"}, {
            children: [
                new Link({className: 'profile-page__action'}, {
                    additionalClasses: 'profile-page__action',
                    href: '../edit/edit.html',
                    text: 'Изменить данные'
                }),
                new Link({className: 'profile-page__action'}, {
                    additionalClasses: 'profile-page__action',
                    href: '../change-password/password_page.html',
                    text: 'Изменить пароль'
                }),
                new Link({className: 'profile-page__action'}, {
                    additionalClasses: 'link_error',
                    href: '../../start/login/login.html',
                    text: 'Выйти'
                })
            ]
        }),
    ]
});

Block.injectInDOM(".app", ProfileDetailsPage);