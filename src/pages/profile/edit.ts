import {Link} from '../../components/common/link/Link';
import {Input} from '../../components/common/input/Input';
import {Button} from '../../components/common/button/Button';
import {Modal} from '../../components/common/modal/Modal';
import {ModalBody} from '../../components/blocks/change-photo/modal-body/ModalBody';
import {PhotoHover} from '../../components/blocks/change-photo/photo-hover/PhotoHover';
import {FieldsBlock} from '../../components/blocks/fields/FieldsBlock';
import {PhotoBlock} from '../../components/common/photo/PhotoBlock';
import {isFormValid, validateForm, getValuesForm} from '../../utils/formUtils';
import {Form} from '../../components/common/form/Form';
import {router, ROUTES} from '../../core/Router';
import {UsersController} from '../../controllers/usersController';
import {userUpdateTypeGuard} from '../../utils/typeguards';

const usersController = new UsersController();

export const profileEditProps = {
    isEdit: true,
    events: {
        submit(event: Event) {
            event.preventDefault();
            const editProfileForm = (event.target as Element)?.closest(
                '.profile-page__form'
            ) as HTMLFormElement | null;

            if (!editProfileForm) {
                return;
            }

            const editFormData = getValuesForm(editProfileForm);
            if (userUpdateTypeGuard(editFormData) && isFormValid(editProfileForm)) {
                usersController.editProfile(editFormData);
            }
        },
        focusout(event: Event) {
            event.preventDefault();
            const editProfileForm = (event.target as Element)?.closest(
                '.profile-page__form'
            ) as HTMLFormElement | null;

            if (!editProfileForm) {
                return;
            }
            validateForm(editProfileForm);
        },
        focusin(event: Event) {
            event.preventDefault();
            const editProfileForm = (event.target as Element)?.closest(
                '.profile-page__form'
            ) as HTMLFormElement | null;

            if (!editProfileForm) {
                return;
            }
            validateForm(editProfileForm);
        },
    },
    children: [
        new FieldsBlock(
            {className: 'profile-page__body'},
            {
                children: [
                    new Input(
                        {},
                        {
                            additionalClasses: 'profile-page__editing-field',
                            id: 'email',
                            type: 'email',
                            label: 'Почта',
                            error: 'Неверная почта',
                        }
                    ),
                    new Input(
                        {},
                        {
                            additionalClasses: 'profile-page__editing-field',
                            id: 'login',
                            type: 'text',
                            label: 'Логин',
                            error: 'Неверный логин',
                        }
                    ),
                    new Input(
                        {},
                        {
                            additionalClasses: 'profile-page__editing-field',
                            id: 'first_name',
                            type: 'text',
                            label: 'Имя',
                            error: 'Некорректные символы',
                        }
                    ),
                    new Input(
                        {},
                        {
                            additionalClasses: 'profile-page__editing-field',
                            id: 'second_name',
                            type: 'text',
                            label: 'Фамилия',
                            error: 'Некорректные символы',
                        }
                    ),
                    new Input(
                        {},
                        {
                            additionalClasses: 'profile-page__editing-field',
                            id: 'display_name',
                            type: 'text',
                            label: 'Имя в чате',
                            error: 'Некорректные символы',
                        }
                    ),
                    new Input(
                        {},
                        {
                            additionalClasses: 'profile-page__editing-field',
                            id: 'phone',
                            type: 'tel',
                            label: 'Телефон',
                            error: 'Неверный телефон',
                        }
                    ),
                ],
            }
        ),
        new PhotoHover({
            events: {
                /**
                 * Обработчик открытия модалки изменения фотографии.
                 */
                click(event: Event) {
                    const changePhotoButton = (event.target as Element)?.closest(
                        '.profile-page__change-photo'
                    );
                    const changePhotoModal = document.querySelector(
                        '.change-profile-photo-modal'
                    ) as HTMLDivElement | null;

                    if (changePhotoModal && changePhotoButton && this.contains(changePhotoButton)) {
                        changePhotoModal.style.visibility = 'visible';
                    }
                },
            },
            children: [
                new PhotoBlock({
                    initials: 'ТД',
                    additionalClasses: 'profile-page__photo',
                }),
            ],
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
                children: [new Button({}, {value: 'Сохранить'})],
            }
        ),
        new Modal({
            title: 'Загрузите файл',
            additionalClasses: 'change-profile-photo-modal',
            children: [
                new Form(
                    {className: 'modal__photo-form'},
                    {
                        events: {
                            /**
                             * Обработчик выбора новой фотографии.
                             */
                            change(event: Event) {
                                const selectPhotoButton = (event.target as Element).closest(
                                    '.change-profile-photo-modal__select-photo-button'
                                );
                                const emptyPhotoError = document.querySelector(
                                    '.modal__body-item_empty-file'
                                ) as HTMLSpanElement;
                                const selectPhotoLabel = document.querySelector(
                                    '.change-profile-photo-modal__label'
                                ) as HTMLLabelElement;

                                if (
                                    emptyPhotoError &&
                                    selectPhotoLabel &&
                                    selectPhotoButton &&
                                    this.contains(selectPhotoButton)
                                ) {
                                    const target = event.target as HTMLInputElement;
                                    const filename = target?.files?.[0]?.name;

                                    if (filename) {
                                        emptyPhotoError.style.display = 'none';
                                        selectPhotoLabel.textContent = filename;
                                    } else {
                                        emptyPhotoError.style.display = 'block';
                                    }
                                }
                            },
                            /**
                             * Обработчик "отправки" формы новой фотографии.
                             */
                            submit(event: Event) {
                                event.preventDefault();

                                const changePhotoForm = (event.target as Element).closest(
                                    '.modal__photo-form'
                                ) as HTMLFormElement | null;
                                if (!changePhotoForm) {
                                    return;
                                }

                                const filename = changePhotoForm.avatar?.files?.[0]?.name;
                                const unknownPhotoError = changePhotoForm.querySelector(
                                    '.modal__body-item_unknown'
                                ) as HTMLSpanElement;
                                const emptyPhotoError = changePhotoForm.querySelector(
                                    '.modal__body-item_empty-file'
                                ) as HTMLSpanElement;
                                const changePhotoModal = document.querySelector(
                                    '.change-profile-photo-modal'
                                ) as HTMLDivElement;

                                if (
                                    filename &&
                                    unknownPhotoError &&
                                    emptyPhotoError &&
                                    changePhotoModal
                                ) {
                                    if (filename === '') {
                                        unknownPhotoError.style.display = 'block';
                                    } else {
                                        const form = new FormData(changePhotoForm);
                                        usersController.changePhoto(form);

                                        emptyPhotoError.style.display = 'none';
                                        unknownPhotoError.style.display = 'none';
                                        changePhotoModal.style.visibility = 'hidden';
                                    }
                                } else {
                                    emptyPhotoError.style.display = 'block';
                                }
                            },
                        },
                        children: [
                            new Button(
                                {className: 'modal__action'},
                                {
                                    value: 'Поменять',
                                }
                            ),
                            new ModalBody({}),
                        ],
                    }
                ),
            ],
        }),
    ] as [FieldsBlock, PhotoBlock | PhotoHover, Link, FieldsBlock, Modal],
};
