import {Link} from "../../components/common/link/Link.js";
import {Button} from "../../components/common/button/Button.js";
import {PhotoBlock} from "../../components/common/photo/PhotoBlock.js";
import {FieldsBlock} from "../../components/blocks/fields/FieldsBlock.js";
import {isFormValid, validateForm, getValuesFromForm} from "../../utils/formUtils.js";
import {router, ROUTES} from "../../utils/Router.js";
import {PhotoHover} from "../../components/blocks/change-photo/photo-hover/PhotoHover.js";
import {EditPassword} from "./ChangePassword/change_password_block.js";
import {UsersController} from "../../controllers/usersController.js";
import {changeLoginTypeGuard} from "../../typeguards.js";

const usersController = new UsersController();

export const profileChangePasswordProps = {
    isEdit: true,
    events: {
        submit: function (event: Event) {
            event.preventDefault();
            const changePasswordForm = (event.target as Element).closest('.profile-page__form') as HTMLFormElement | null;

            if (!changePasswordForm) {
                return;
            }

            const formData = getValuesFromForm(changePasswordForm);
            if (isFormValid(changePasswordForm) && changeLoginTypeGuard(formData) && formData?.password === formData?.newPassword) {
                usersController.changePassword(formData);
            }

        },
        focusout: function (event: FocusEvent) {
            event.preventDefault();
            const changePasswordForm = (event.target as Element)?.closest('.profile-page__form') as HTMLFormElement | null;

            if (changePasswordForm) {
                validateForm(changePasswordForm);
            }
        },
        focusin: function (event: FocusEvent) {
            event.preventDefault();
            const changePasswordForm = (event.target as Element)?.closest('.profile-page__form') as HTMLFormElement | null;

            if (changePasswordForm) {
                validateForm(changePasswordForm);
            }
        }
    },
    children: [
        new EditPassword({children: []}),
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
                new Button({}, {value: 'Сохранить'})
            ]
        }),
    ] as [FieldsBlock, PhotoBlock | PhotoHover, Link, FieldsBlock]
};
