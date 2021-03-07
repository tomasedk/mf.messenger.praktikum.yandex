import {StartPage} from '../../../components/pages/start/StartPage.js'
import {Input} from "../../../components/common/input/Input.js";
import {Button} from "../../../components/common/button/Button.js";
import {Link} from "../../../components/common/link/Link.js";
import {Block} from "../../../components/common/element/Block.js";
import {isFormValid, validateForm, logFields} from "../../../utils/utils.js";
import {FieldsBlock} from "../../../components/blocks/fields/FieldsBlock.js";

const LoginPage = new StartPage({
    header: {
        text: 'Вход',
        classModificator: 'start-form__header_login'
    },
    events: {
        submit: function (e) {
            const form = this.querySelector('form');
            if (form) {
                logFields(form);
                if (isFormValid(form)) {
                    window.location.href = "../../webchat/unselected/unselected.html";
                }
                e.preventDefault();
            }
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
                    id: 'login',
                    type: 'text',
                    label: 'Логин',
                    error: 'Неверный логин',
                }),
                new Input({}, {
                    id: 'password',
                    type: 'password',
                    label: 'Пароль',
                    error: 'Неверный пароль'
                }),
            ]
        }),
        new Button({className: 'start-form__submit-button'}, {
            value: 'Войти',
        }),
        new Link({}, {
            additionalClasses: 'start-form__register-link',
            href: '../logon/logon.html',
            text: 'Регистрация'
        }),
    ],
});

Block.injectInDOM(".app", LoginPage);