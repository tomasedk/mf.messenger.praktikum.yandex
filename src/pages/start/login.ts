import {Input} from '../../components/common/input/Input';
import {Button} from '../../components/common/button/Button';
import {Link} from '../../components/common/link/Link';
import {isFormValid, getValuesForm, validateForm} from '../../utils/formUtils';
import {FieldsBlock} from '../../components/blocks/fields/FieldsBlock';
import {router, ROUTES} from '../../core/Router';
import {LoginController} from '../../controllers/loginController';
import {loginTypeGuard} from '../../utils/typeguards';

const loginController = new LoginController();

export const loginProps = {
    header: {
        text: 'Вход',
        classModificator: 'start-form__header_login',
    },
    events: {
        submit(event: Event) {
            event.preventDefault();
            const form = (event.target as Element)?.closest(
                '.start-form'
            ) as HTMLFormElement | null;
            if (!form) {
                return;
            }

            const formData = getValuesForm(form);
            if (isFormValid(form) && loginTypeGuard(formData)) {
                loginController.login(formData);
            }
        },
        focusout(event: FocusEvent) {
            const form = (event.target as Element)?.closest(
                '.start-form'
            ) as HTMLFormElement | null;

            if (form) {
                validateForm(form);
            }
        },
        focusin(event: FocusEvent) {
            const form = (event.target as Element)?.closest(
                '.start-form'
            ) as HTMLFormElement | null;

            if (form) {
                validateForm(form);
            }
        },
    },
    children: [
        new FieldsBlock(
            {className: 'start-form__fields'},
            {
                children: [
                    new Input(
                        {},
                        {
                            id: 'login',
                            type: 'text',
                            label: 'Логин',
                            error: 'Неверный логин',
                        }
                    ),
                    new Input(
                        {},
                        {
                            id: 'password',
                            type: 'password',
                            label: 'Пароль',
                            error: 'Неверный пароль',
                        }
                    ),
                ],
            }
        ),
        new Button(
            {className: 'start-form__submit-button'},
            {
                value: 'Войти',
            }
        ),
        new Link(
            {},
            {
                additionalClasses: 'start-form__register-link',
                text: {label: 'Регистрация'},
                events: {
                    click(_e) {
                        router.go(ROUTES.START.LOGON);
                    },
                },
            }
        ),
    ] as [FieldsBlock, Button, Link],
};
