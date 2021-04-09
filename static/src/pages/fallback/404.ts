import {Link} from "../../components/common/link/Link";
import {router} from "../../utils/Router";

export const notFoundProps = {
    statusCode: '4XX',
    desc: 'Не туда попали',
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
