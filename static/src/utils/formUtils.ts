export type TLog = Record<string, string | number | boolean>

export function getValuesForm(form: HTMLFormElement): TLog {
    return Array.from(form?.elements)?.reduce((acc, {name, value}: HTMLInputElement) => {
        if (name) {
            acc[name] = value;
        }
        return acc;
    }, {} as TLog);
}

function validateField(elem: HTMLInputElement) {
    let validationRegExp: RegExp;
    switch (elem.id) {
        case 'email':
            validationRegExp = /^\S+@\S+$/g;
            break;
        case 'login':
        case 'display_name':
            validationRegExp = /^(?=.{3,16}$)[a-zA-Z0-9]+$/;
            break;
        case 'first_name':
        case 'second_name':
            validationRegExp = /^[a-z ,.-]+$/i;
            break;
        case 'oldPassword':
        case 'password':
        case 'newPassword':
            validationRegExp = /^(?=.{8,30}$)[a-zA-Z0-9]+$/g;
            break;
        case 'tel':
            // validationRegExp = /^((8|+7)[- ]?)?((?\d{3})?[- ]?)?[\d- ]{7,10}$/g; // TODO
            // break;
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
