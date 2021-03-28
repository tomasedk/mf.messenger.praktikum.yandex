import {Input} from "../../components/common/input/Input.js";
import {Button} from "../../components/common/button/Button.js";
import {Link} from "../../components/common/link/Link.js";
import {isFormValid, getValuesFromForm, validateForm} from "../../utils/formUtils.js";
import {FieldsBlock} from "../../components/blocks/fields/FieldsBlock.js";
import {router, ROUTES} from "../../utils/Router.js";
import {LoginController} from "../../controllers/loginController.js";
import {loginTypeGuard} from "../../typeguards.js";

const loginController = new LoginController();

export const loginProps = {
    header: {
        text: 'Вход',
        classModificator: 'start-form__header_login'
    },
    events: {
        submit: function (event: Event) {
            event.preventDefault();
            const form = (event.target as Element)?.closest('.start-form') as HTMLFormElement | null;
            if (!form) {
                return;
            }

            const formData = getValuesFromForm(form);
            if (isFormValid(form) && loginTypeGuard(formData)) {
                loginController.login(formData);
            }
        },
        focusout: function (event: FocusEvent) {
            const form = (event.target as Element)?.closest('.start-form') as HTMLFormElement | null;

            if (form) {
                validateForm(form);
            }
        },
        focusin: function (event: FocusEvent) {
            const form = (event.target as Element)?.closest('.start-form') as HTMLFormElement | null;

            if (form) {
                validateForm(form);
            }
        },
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
            text: {label: 'Регистрация'},
            events: {
                click: function (_e) {
                    router.go(ROUTES.START.LOGON);
                }
            }
        }),
    ] as [FieldsBlock, Button, Link],
};
