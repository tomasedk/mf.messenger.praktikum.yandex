/**
 * Функция логирования полей формы.
 *
 * @param form Форма.
 */
export function logForm(form) {
    const data = Array.from(form?.elements)?.reduce((acc, {name, value}) => {
        if (name) {
            acc[name] = value;
        }
        return acc;
    }, {})
    console.log(data);
}
