import {Block} from "../../../components/common/element/Block.js";
import {ProfilePage} from "../../../components/pages/profile/ProfilePage.js";
import {Link} from "../../../components/common/link/Link.js";
import {Input} from "../../../components/common/input/Input.js";
import {Button} from "../../../components/common/button/Button.js";
import {Modal} from "../../../components/common/modal/Modal.js";
import {ModalBody} from "./change-photo/modal-body/ModalBody.js";
import {PhotoHover} from "./change-photo/photo-hover/PhotoHover.js";
import {FieldsBlock} from "../../../components/blocks/fields/FieldsBlock.js";
import {PhotoBlock} from "../../../components/common/photo/PhotoBlock.js";
import {isFormValid, validateForm, logFields} from "../../../utils/utils.js";

const ProfileDetailsPage = new ProfilePage({
    isEdit: true,
    username: 'Тимур Д',
    events: {
        submit: function (e) {
            const form = Array.from(this.querySelectorAll('form'))?.filter(form => form.classList?.contains('profile-page__form'))[0];
            if (form) {
                logFields(form);
                if (isFormValid(form)) {
                    window.location.href = "../details/details.html";
                }
                e.preventDefault();
            }
        },
        focusout: function (_event: FocusEvent) {
            const form = Array.from(this.querySelectorAll('form'))?.filter(form => form.classList?.contains('profile-page__form'))[0];
            if (form) {
                validateForm(form);
            }
        },
        focusin: function (_event: FocusEvent) {
            const form = Array.from(this.querySelectorAll('form'))?.filter(form => form.classList?.contains('profile-page__form'))[0];
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
                    id: 'email',
                    type: 'email',
                    label: 'Почта',
                    error: 'Неверная почта'
                }),
                new Input({}, {
                    additionalClasses: 'profile-page__editing-field',
                    id: 'login',
                    type: 'text',
                    label: 'Логин',
                    error: 'Неверный логин'
                }),
                new Input({}, {
                    additionalClasses: 'profile-page__editing-field',
                    id: 'first_name',
                    type: 'text',
                    label: 'Имя',
                    error: 'Некорректные символы',
                }),
                new Input({}, {
                    additionalClasses: 'profile-page__editing-field',
                    id: 'second_name',
                    type: 'text',
                    label: 'Фамилия',
                    error: 'Некорректные символы',
                }),
                new Input({}, {
                    additionalClasses: 'profile-page__editing-field',
                    id: 'display_name',
                    type: 'text',
                    label: 'Имя в чате',
                    error: 'Некорректные символы'
                }),
                new Input({}, {
                    additionalClasses: 'profile-page__editing-field',
                    id: 'phone',
                    type: 'tel',
                    label: 'Телефон',
                    error: 'Неверный телефон'
                }),
            ]
        }),
        new PhotoHover({
            children: [
                new PhotoBlock({
                    initials: 'ТД',
                    additionalClasses: 'profile-page__photo'
                })
            ]
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
        new Modal({
            additionalClasses: 'change-profile-photo-modal',
            title: 'Загрузите файл',
            formClass: 'modal__photo-form',
            children: [
                new Button({className: 'modal__action'}, {
                    name: 'submit',
                    value: 'Поменять',
                }),
                new ModalBody({})
            ],
        }),
    ]
});

Block.injectInDOM(".app", ProfileDetailsPage);