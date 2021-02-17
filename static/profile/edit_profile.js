import {logForm} from '../log.js';

const formNode = document.querySelector('.profile-page__form');
const emptyPhotoError = document.querySelector('.modal__body-item_empty-file');
const unknownPhotoError = document.querySelector('.modal__body-item_unknown');
const changePhotoButton = document.querySelector('.profile-page__change-photo');
const changePhotoModal = document.querySelector('.change-profile-photo-modal');
const selectPhotoLabel = document.querySelector('.change-profile-photo-modal__label');
const photoFormNode = document.querySelector('.modal__photo-form');
const selectPhotoButton = document.querySelector('.change-profile-photo-modal__select-photo-button');

emptyPhotoError.style.display = 'none';
unknownPhotoError.style.display = 'none';
changePhotoModal.style.visibility = 'hidden';

formNode?.addEventListener('submit', (e) => {
    logForm(e.target);

    window.location.href = "details.html";
    e.preventDefault();
});

/**
 * Инициализация обработчика "отправки" формы новой фотографии.
 */
photoFormNode?.addEventListener('submit', (e) => {
    const filename = e.target.avatar?.files?.[0]?.name;

    if (filename) {
        if (filename === '') {
            unknownPhotoError.style.display = 'block';
        } else {
            console.log(filename);
            emptyPhotoError.style.display = 'none'
            unknownPhotoError.style.display = 'none';
            window.location.href = "edit.html";
        }
    } else {
        emptyPhotoError.style.display = 'block';
    }

    e.preventDefault();
});

/**
 * Инициализация обработчика выбора файла.
 */
selectPhotoButton?.addEventListener('change', (e) => {
    const filename = e.target?.files?.[0]?.name;

    if (filename) {
        console.log(filename);
        emptyPhotoError.style.display = 'none';
        selectPhotoLabel.textContent = filename;
    } else {
        emptyPhotoError.style.display = 'block';
    }
});

changePhotoButton?.addEventListener('click', () => {
    changePhotoModal.style.visibility = 'visible';
});
