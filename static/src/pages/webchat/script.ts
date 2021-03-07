import {logFields} from "../../utils/utils.js";

const attachButton = document.querySelector('.attach-to-message');
const attachPopup = document.querySelector('.attach-popup') as HTMLUListElement;
attachPopup.style.visibility = 'hidden';

const sendButton = document.querySelector('.send-message');
const messageInput = document.querySelector('.input-message') as HTMLInputElement;

const userActionsButton = document.querySelector('.user-actions');
const userActionsPopup = document.querySelector('.user-actions-popup') as HTMLUListElement;
userActionsPopup.style.visibility = 'hidden';

const addUserActionButton = document.querySelector('.user-actions-popup__action_add');

const addUserForm = document.querySelector('.modal__add-user-form') as HTMLFormElement;

const addUserModalInput = document.querySelector('#login') as HTMLInputElement;
const addUserModal = document.querySelector('.add-user-modal') as HTMLDivElement;
addUserModal.style.visibility = 'hidden';

/**
 * Инициализация обработчика отображения попапа "скрепки".
 */
attachButton?.addEventListener('click', () => {
    attachPopup.style.visibility = attachPopup?.style.visibility === 'hidden' ? 'visible' : 'hidden';
});

/**
 * Инициализация обработчика отображения попапа с действиями пользователя.
 */
userActionsButton?.addEventListener('click', () => {
    userActionsPopup.style.visibility = userActionsPopup?.style.visibility === 'hidden' ? 'visible' : 'hidden';
});

/**
 * Инициализация обработчика отправки сообщений.
 */
sendButton?.addEventListener('click', () => {
    console.log(messageInput?.value);
    messageInput.value = '';
});

/**
 * Инициализация обработчика открытия модального окна добавления пользователя.
 */
addUserActionButton?.addEventListener('click', () => {
    userActionsPopup.style.visibility = 'hidden';
    addUserModal.style.visibility = 'visible';
});

/**
 * Инициализация обработчика "отправки" формы новой фотографии.
 */
addUserForm.addEventListener('submit', (e) => {
    logFields(e.target as HTMLFormElement);

    addUserModalInput.value = '';
    addUserModal.style.visibility = 'hidden';

    e.preventDefault();
});