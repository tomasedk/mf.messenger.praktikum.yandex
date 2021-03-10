import {Block} from "../../../components/common/block/Block.js";
import {ProfilePage} from "../../../components/pages/profile/ProfilePage.js";
import {Link} from "../../../components/common/link/Link.js";
import {Input} from "../../../components/common/input/Input.js";
import {Button} from "../../../components/common/button/Button.js";
import {PhotoBlock} from "../../../components/common/photo/PhotoBlock.js";
import {FieldsBlock} from "../../../components/blocks/fields/FieldsBlock.js";
import {isFormValid, validateForm, logFields} from "../../../utils/utils.js";

const ProfileDetailsPage = new ProfilePage({
    isEdit: true,
    username: 'Тимур Д',
    events: {
        submit: function (e) {
            const form = Array.from(this.querySelectorAll('form'))
                ?.filter(form => form.classList
                ?.contains('profile-page__form'))[0];
            if (!form) {
                return;
            }

            logFields(form);
            if (isFormValid(form)) {
                window.location.href = "../details/details.html";
            }
            e.preventDefault();
        },
        focusout: function (_event: FocusEvent) {
            const form = Array.from(this.querySelectorAll('form'))
                ?.filter(form => form.classList
                ?.contains('profile-page__form'))[0];

            if (form) {
                validateForm(form);
            }
        },
        focusin: function (_event: FocusEvent) {
            const form = Array.from(this.querySelectorAll('form'))
                ?.filter(form => form.classList
                ?.contains('profile-page__form'))[0];

            if (form) {
                validateForm(form);
            }
        }
    },
    children: [
        new FieldsBlock({className: "profile-page__body"}, {
            children: [
                new Input({}, {
                    additionalClasses: 'profile-page__editing-field',
                    id: 'old_password',
                    type: 'password',
                    label: 'Старый пароль',
                    error: 'Неверный пароль'
                }),
                new Input({}, {
                    additionalClasses: 'profile-page__editing-field',
                    id: 'password',
                    type: 'password',
                    label: 'Новый пароль',
                    error: 'Неверный пароль'
                }),
                new Input({}, {
                    additionalClasses: 'profile-page__editing-field',
                    id: 'password_repeat',
                    type: 'password',
                    label: 'Повторите новый пароль',
                    error: 'Неверный пароль'
                }),
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
                new Button({}, {value: 'Сохранить'})
            ]
        }),
    ]
});

Block.injectInDOM(".app", ProfileDetailsPage);