import {PhotoBlock} from "../../components/common/photo/PhotoBlock.js";
import {Link} from "../../components/common/link/Link.js";
import {FieldsBlock} from "../../components/blocks/fields/FieldsBlock.js";
import {router, ROUTES} from "../../utils/Router.js";
import {DetailsBlock} from "./Details/details_block.js";
import {LoginController} from "../../controllers/loginController.js";

const loginController = new LoginController();

export const profileDetailsProps = {
    isEdit: false,
    children: [
        new DetailsBlock({}),
        new PhotoBlock({
            additionalClasses: 'profile-page__photo'
        }),
        new Link({}, {
            additionalClasses: 'backlink',
            events: {
                click: function (_e) {
                    router.go(ROUTES.WEBCHAT);
                }
            }
        }),
        new FieldsBlock({className: "profile-page__actions"}, {
            children: [
                new Link({className: 'profile-page__action'}, {
                    additionalClasses: 'profile-page__action',
                    text: {label: 'Изменить данные'},
                    events: {
                        click: function (_e) {
                            router.go(ROUTES.PROFILE.EDIT);
                        }
                    }
                }),
                new Link({className: 'profile-page__action'}, {
                    additionalClasses: 'profile-page__action',
                    text: {label: 'Изменить пароль'},
                    events: {
                        click: function (_e) {
                            router.go(ROUTES.PROFILE.CHANGE_PASSWORD);
                        }
                    }
                }),
                new Link({className: 'profile-page__action'}, {
                    additionalClasses: 'link__error',
                    text: {label: 'Выйти'},
                    events: {
                        click: function (_e) {
                            loginController.logout();
                        }
                    }
                })
            ]
        }),
    ] as [FieldsBlock, PhotoBlock, Link, FieldsBlock]
};