import {Input} from '../../components/common/input/Input';
import {Button} from '../../components/common/button/Button';
import {Link} from '../../components/common/link/Link';
import {validateForm, getValuesForm, isFormValid} from '../../utils/formUtils';
import {FieldsBlock} from '../../components/blocks/fields/FieldsBlock';
import {router, ROUTES} from '../../core/Router';
import {LoginController} from '../../controllers/loginController';
import {logonTypeGuard} from '../../utils/typeguards';

const loginController = new LoginController();

export const logonProps = {
    header: {
        text: 'Регистрация',
        classModificator: 'start-form__header_logon',
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
            if (isFormValid(form) && logonTypeGuard(formData)) {
                loginController.logon(formData);
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
                            additionalClasses: 'login-form__field',
                            id: 'email',
                            type: 'email',
                            label: 'Почта',
                            error: 'Неверная почта',
                        }
                    ),
                    new Input(
                        {},
                        {
                            additionalClasses: 'login-form__field',
                            id: 'login',
                            type: 'text',
                            label: 'Логин',
                            error: 'Неверный логин',
                        }
                    ),
                    new Input(
                        {},
                        {
                            additionalClasses: 'login-form__field',
                            id: 'first_name',
                            type: 'text',
                            label: 'Имя',
                            error: 'Некорректные символы',
                        }
                    ),
                    new Input(
                        {},
                        {
                            additionalClasses: 'login-form__field',
                            id: 'second_name',
                            type: 'text',
                            label: 'Фамилия',
                            error: 'Некорректные символы',
                        }
                    ),
                    new Input(
                        {},
                        {
                            additionalClasses: 'login-form__field',
                            id: 'phone',
                            type: 'tel',
                            label: 'Телефон',
                            error: 'Неверный телефон',
                        }
                    ),
                    new Input(
                        {},
                        {
                            additionalClasses: 'login-form__field',
                            id: 'password',
                            type: 'password',
                            label: 'Пароль',
                            error: 'Неверный пароль',
                        }
                    ),
                    new Input(
                        {},
                        {
                            additionalClasses: 'login-form__field',
                            id: 'newPassword',
                            type: 'password',
                            label: 'Пароль (ещё раз)',
                            error: 'Неверный пароль',
                        }
                    ),
                ],
            }
        ),
        new Button(
            {className: 'start-form__submit-button'},
            {
                value: 'Зарегистрироваться',
            }
        ),
        new Link(
            {},
            {
                additionalClasses: 'start-form__register-link',
                text: {label: 'Войти'},
                events: {
                    click(_e) {
                        router.go(ROUTES.START.LOGIN);
                    },
                },
            }
        ),
    ],
};
