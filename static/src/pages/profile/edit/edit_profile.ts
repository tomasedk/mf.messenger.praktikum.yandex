const emptyPhotoError = document.querySelector('.modal__body-item_empty-file') as HTMLSpanElement;
const unknownPhotoError = document.querySelector('.modal__body-item_unknown') as HTMLSpanElement;
const changePhotoButton = document.querySelector('.profile-page__change-photo');
const changePhotoModal = document.querySelector('.change-profile-photo-modal') as HTMLDivElement;
const selectPhotoLabel = document.querySelector('.change-profile-photo-modal__label') as HTMLLabelElement;
const photoFormNode = document.querySelector('.modal__photo-form');
const selectPhotoButton = document.querySelector('.change-profile-photo-modal__select-photo-button');

emptyPhotoError.style.display = 'none';
unknownPhotoError.style.display = 'none';
changePhotoModal.style.visibility = 'hidden';

/**
 * Инициализация обработчика "отправки" формы новой фотографии.
 */
photoFormNode?.addEventListener('submit', (e) => {
    let target = e.target as any;
    const filename = target?.avatar?.files?.[0]?.name;

    if (filename) {
        if (filename === '') {
            unknownPhotoError.style.display = 'block';
        } else {
            emptyPhotoError.style.display = 'none'
            unknownPhotoError.style.display = 'none';
            changePhotoModal.style.visibility = 'hidden';
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
    let target = e.target as any;
    const filename = target?.files?.[0]?.name;

    if (filename) {
        emptyPhotoError.style.display = 'none';
        selectPhotoLabel.textContent = filename;
    } else {
        emptyPhotoError.style.display = 'block';
    }
});

changePhotoButton?.addEventListener('click', () => {
    changePhotoModal.style.visibility = 'visible';
});
