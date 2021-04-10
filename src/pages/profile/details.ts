import {PhotoBlock} from '../../components/common/photo/PhotoBlock';
import {Link} from '../../components/common/link/Link';
import {FieldsBlock} from '../../components/blocks/fields/FieldsBlock';
import {router, ROUTES} from '../../core/Router';
import {DetailsBlock} from './Details/details_block';
import {LoginController} from '../../controllers/loginController';

const loginController = new LoginController();

export const profileDetailsProps = {
    isEdit: false,
    children: [
        new DetailsBlock({}),
        new PhotoBlock({
            additionalClasses: 'profile-page__photo',
        }),
        new Link(
            {},
            {
                additionalClasses: 'backlink',
                events: {
                    click(_e) {
                        router.go(ROUTES.WEBCHAT);
                    },
                },
            }
        ),
        new FieldsBlock(
            {className: 'profile-page__actions'},
            {
                children: [
                    new Link(
                        {className: 'profile-page__action'},
                        {
                            additionalClasses: 'profile-page__action',
                            text: {label: 'Изменить данные'},
                            events: {
                                click(_e) {
                                    router.go(ROUTES.PROFILE.EDIT);
                                },
                            },
                        }
                    ),
                    new Link(
                        {className: 'profile-page__action'},
                        {
                            additionalClasses: 'profile-page__action',
                            text: {label: 'Изменить пароль'},
                            events: {
                                click(_e) {
                                    router.go(ROUTES.PROFILE.CHANGE_PASSWORD);
                                },
                            },
                        }
                    ),
                    new Link(
                        {className: 'profile-page__action'},
                        {
                            additionalClasses: 'link__error',
                            text: {label: 'Выйти'},
                            events: {
                                click(_e) {
                                    loginController.logout();
                                },
                            },
                        }
                    ),
                ],
            }
        ),
    ] as [FieldsBlock, PhotoBlock, Link, FieldsBlock],
};
