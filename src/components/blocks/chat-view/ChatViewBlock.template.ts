export const templateString = `<main class="chat-view">
    <div class="chat-view__header">
        <div class="user-info">
            <div class="username user-info__username">{{header.username}}</div>
            <div class="last-online-date">был(а) в сети {{header.onlineTimeAgo}} часа назад</div>
        </div>
        <div class="user-actions">
            <img alt="Three dots" src="../../../assets/images/more.svg">
        </div>
        <ul class="user-actions-popup">
            <li class="user-actions-popup__action user-actions-popup__action_add">Добавить пользователя</li>
            <li class="user-actions-popup__action user-actions-popup__action_delete">Удалить пользователя</li>
        </ul>
    </div>
    <div data-set-id="{{messages}}"></div>
    <div class="chat-view__footer">
        <ul class="attach-popup">
            <li class="attach-popup__item">Фото или видео</li>
            <li class="attach-popup__item">Файл</li>
            <li class="attach-popup__item">Геопозиция</li>
        </ul>
        <button class="attach-to-message"></button>
        <input class="input-message" placeholder="Сообщение" type="text">
        <button class="round-button round-button__send"></button>
    </div>
</main>`;
