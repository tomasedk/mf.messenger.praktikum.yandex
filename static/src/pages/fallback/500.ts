import {Link} from "../../components/common/link/Link.js";
import {router} from "../../utils/Router.js";

export const internalServerProps = {
    statusCode: '5XX',
    desc: 'Мы уже фиксим',
    children: [
        new Link({}, {
            additionalClasses: 'start-form__register-link',
            text: {label: 'Назад', className: 'profile-link__text'},
            events: {
                click: function (_e) {
                    router.back();
                }
            }
        }),
    ] as [Link]
}