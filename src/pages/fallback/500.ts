import {Link} from '../../components/common/link/Link';
import {router} from '../../core/Router';

export const internalServerProps = {
    statusCode: '5XX',
    desc: 'Мы уже фиксим',
    children: [
        new Link(
            {},
            {
                additionalClasses: 'start-form__register-link',
                text: {label: 'Назад', className: 'profile-link__text'},
                events: {
                    click(_e) {
                        router.back();
                    },
                },
            }
        ),
    ] as [Link],
};
