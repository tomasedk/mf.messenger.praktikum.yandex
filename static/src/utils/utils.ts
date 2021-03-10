type TLog = {
    [key: string]: string | number | boolean;
}

export function logFields(form: HTMLFormElement) {
    const data = Array.from(form?.elements)?.reduce((acc, {name, value}: HTMLInputElement) => {
        if (name) {
            acc[name] = value;
        }
        return acc;
    }, {} as TLog)
    console.log(data);
}

function validateField(elem: HTMLInputElement) {
    let validationRegExp: RegExp;
    switch (elem.id) {
        case 'email':
            validationRegExp = /^\S+@\S+\.\S+$/g;
            break;
        case 'login':
        case 'display_name':
            validationRegExp = /^(?=.{3,16}$)[a-zA-Z0-9]+$/;
            break;
        case 'first_name':
        case 'second_name':
            validationRegExp = /^[a-z ,.-]+$/i;
            break;
        case 'old_password':
        case 'password':
        case 'password_repeat':
            validationRegExp = /^(?=.{8,30}$)[a-zA-Z0-9]+$/g;
            break;
        case 'tel':
            validationRegExp = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/g;
            break;
        default:
            validationRegExp = /^(?=.{3,16}$)[a-zA-Z0-9]+$/;
            break;
    }

    return validationRegExp.test(elem.value)
}

export function isFormValid(form: HTMLFormElement): boolean {
    return Array.from(form.elements)
        .filter((elem: HTMLInputElement) => elem.tagName === 'INPUT' && elem.type !== 'submit')
        .every((elem: HTMLInputElement) => {
            return validateField(elem);
        });
}

export function validateForm(form: HTMLFormElement) {
    Array.from(form.querySelectorAll('input'))
        .filter((elem) => elem.type !== 'submit')
        .forEach((elem) => {
            if (validateField(elem)) {
                elem.setAttribute("invalid", "false");
            } else {
                elem.setAttribute("invalid", "true");
            }
        })
}

/**
 * Примитивная генерация id, основанная на Web Crypto API.
 */
export function getId(): string {
    return window.crypto.getRandomValues(new Uint32Array(1))[0].toString(16);
}