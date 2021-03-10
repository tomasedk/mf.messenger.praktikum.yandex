import {StartPage} from '../../../components/pages/start/StartPage.js'
import {Input} from "../../../components/common/input/Input.js";
import {Button} from "../../../components/common/button/Button.js";
import {Link} from "../../../components/common/link/Link.js";
import {Block} from "../../../components/common/block/Block.js";
import {isFormValid, validateForm, logFields} from "../../../utils/utils.js";
import {FieldsBlock} from "../../../components/blocks/fields/FieldsBlock.js";

const LogonPage = new StartPage({
    header: {
        text: 'Регистрация',
        classModificator: 'start-form__header_logon'
    },
    events: {
        submit: function (e) {
            const form = this.querySelector('form');
            if (!form) {
                return;
            }

            logFields(form);
            if (isFormValid(form)) {
                window.location.href = "../../webchat/unselected/unselected.html";
            }
            e.preventDefault();
        },
        focusout: function (_event: FocusEvent) {
            const form = this.querySelector('form');
            if (form) {
                validateForm(form);
            }
        },
        focusin: function (_event: FocusEvent) {
            const form = this.querySelector('form');
            if (form) {
                validateForm(form);
            }
        }
    },
    children: [
        new FieldsBlock({className: "start-form__fields"}, {
            children: [
                new Input({}, {
                    additionalClasses: 'login-form__field',
                    id: 'email',
                    type: 'email',
                    label: 'Почта',
                    error: 'Неверная почта'
                }),
                new Input({}, {
                    additionalClasses: 'login-form__field',
                    id: 'login',
                    type: 'text',
                    label: 'Логин',
                    error: 'Неверный логин'
                }),
                new Input({}, {
                    additionalClasses: 'login-form__field',
                    id: 'first_name',
                    type: 'text',
                    label: 'Имя',
                    error: 'Некорректные символы'
                }),
                new Input({}, {
                    additionalClasses: 'login-form__field',
                    id: 'second_name',
                    type: 'text',
                    label: 'Фамилия',
                    error: 'Некорректные символы'
                }),
                new Input({}, {
                    additionalClasses: 'login-form__field',
                    id: 'phone',
                    type: 'tel',
                    label: 'Телефон',
                    error: 'Неверный телефон'
                }),
                new Input({}, {
                    additionalClasses: 'login-form__field',
                    id: 'password',
                    type: 'password',
                    label: 'Пароль',
                    error: 'Неверный пароль'
                }),
                new Input({}, {
                    additionalClasses: 'login-form__field',
                    id: 'password_repeat',
                    type: 'password',
                    label: 'Пароль (ещё раз)',
                    error: 'Неверный пароль'
                }),
            ]
        }),
        new Button({className: 'start-form__submit-button'}, {
            value: 'Зарегистрироваться',
        }),
        new Link({}, {
            additionalClasses: 'start-form__register-link',
            href: '../login/login.html',
            text: 'Войти'
        })
    ],
});

Block.injectInDOM(".app", LogonPage);